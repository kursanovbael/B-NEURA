import {
  BoxGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  LatheGeometry,
  Quaternion,
  SphereGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type BufferGeometry,
} from "three";

/**
 * Procedural, dependency-free geometry for the conceptual NeuroHelmet.
 *
 * Coordinate convention: the helmet origin is the center of the head volume,
 * +y is up and the face looks toward +z. Every layer is modeled around this
 * single origin so layers can later be moved independently.
 *
 * All measurements are illustrative scene units, not hardware specifications.
 */

/** Abstract head volume (ellipsoid radii). */
export const HEAD = { rx: 0.5, ry: 0.62, rz: 0.6 } as const;

/** Outer shell: elliptical dome profile revolved around the y axis. */
export const SHELL = {
  a: 0.86, // horizontal radius of the profile
  b: 0.95, // vertical radius of the profile
  thickness: 0.06,
  scaleX: 0.94, // narrows the dome side to side
  scaleZ: 1.12, // elongates the dome front to back
  rim: -0.48, // profile angle where the open lower edge sits (radians)
} as const;

/** Ellipsoid on which the sensor pads sit, just outside the head volume. */
export const SENSOR_SURFACE = { rx: 0.66, ry: 0.78, rz: 0.76 } as const;

const TAU = Math.PI * 2;
const deg = (d: number) => (d * Math.PI) / 180;

function tube(points: Vector3[], radius: number, closed = false): TubeGeometry {
  const curve = new CatmullRomCurve3(points, closed, "centripetal");
  return new TubeGeometry(curve, points.length * 2, radius, 6, closed);
}

/** Points on a horizontal ellipse at height y, between azimuths (radians). */
function azimuthArc(
  rx: number,
  rz: number,
  y: number,
  from: number,
  to: number,
  steps = 64,
): Vector3[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const az = from + ((to - from) * i) / steps;
    return new Vector3(rx * Math.sin(az), y, rz * Math.cos(az));
  });
}

/** Points on a vertical elliptical arch. plane "x" = ear to ear, "z" = front to back. */
function archPoints(
  plane: "x" | "z",
  radiusH: number,
  radiusV: number,
  from: number,
  to: number,
  steps = 64,
): Vector3[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const u = from + ((to - from) * i) / steps;
    const h = radiusH * Math.cos(u);
    const y = radiusV * Math.sin(u);
    return plane === "x" ? new Vector3(h, y, 0) : new Vector3(0, y, h);
  });
}

/**
 * Gives the dome a helmet silhouette: below the equator the shell extends down
 * and slightly back toward the nape, so the rear covers the back of the head
 * and the profile no longer reads as a ball. Applied to the shell surface and
 * to every line that follows it, so trim and seams stay on the surface.
 */
const SKIRT = { drop: 0.34, push: 0.08, reach: 0.5 } as const;

function deformShell(point: Vector3): Vector3 {
  const depth = SHELL.a * SHELL.scaleZ;
  const back = Math.min(1, Math.max(0, -point.z / depth));
  const below = Math.min(1, Math.max(0, -point.y / SKIRT.reach));
  const weight = below * below * (3 - 2 * below) * Math.pow(back, 1.3);
  return new Vector3(
    point.x,
    point.y - SKIRT.drop * weight,
    point.z - SKIRT.push * weight,
  );
}

function shellGeometry(): BufferGeometry {
  const { a, b, thickness, scaleX, scaleZ, rim } = SHELL;
  const steps = 32;
  const profile: Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = rim + ((Math.PI / 2 - rim) * i) / steps;
    profile.push(new Vector2(a * Math.cos(t), b * Math.sin(t)));
  }
  for (let i = steps; i >= 0; i--) {
    const t = rim + ((Math.PI / 2 - rim) * i) / steps;
    profile.push(
      new Vector2((a - thickness) * Math.cos(t), (b - thickness) * Math.sin(t)),
    );
  }
  profile.push(profile[0].clone()); // close the rim edge
  const geometry = new LatheGeometry(profile, 72);
  geometry.scale(scaleX, 1, scaleZ);

  const positions = geometry.getAttribute("position");
  const vertex = new Vector3();
  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    const moved = deformShell(vertex);
    positions.setXYZ(i, moved.x, moved.y, moved.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

const VISOR = { span: deg(120), height: 0.14, y: 0.02, gap: 0.008 } as const;

function visorGeometry(): BufferGeometry {
  const r = SHELL.a + VISOR.gap;
  const geometry = new CylinderGeometry(
    r,
    r,
    VISOR.height,
    48,
    1,
    true,
    -VISOR.span / 2,
    VISOR.span,
  );
  geometry.scale(SHELL.scaleX, 1, SHELL.scaleZ);
  return geometry;
}

/** Thin frame (top/bottom arcs and two end posts) that gives the band thickness. */
function visorFrameGeometry(): BufferGeometry[] {
  const r = SHELL.a + VISOR.gap + 0.002;
  const rx = r * SHELL.scaleX;
  const rz = r * SHELL.scaleZ;
  const half = VISOR.span / 2;
  const top = VISOR.y + VISOR.height / 2;
  const bottom = VISOR.y - VISOR.height / 2;
  const edge = (y: number) =>
    tube(azimuthArc(rx, rz, y, -half, half, 48), 0.005);
  const post = (az: number) =>
    tube(
      [
        new Vector3(rx * Math.sin(az), bottom, rz * Math.cos(az)),
        new Vector3(rx * Math.sin(az), top, rz * Math.cos(az)),
      ],
      0.005,
    );
  return [edge(top), edge(bottom), post(-half), post(half)];
}

/** Thin dark seams that suggest panel segmentation on the outer shell. */
function shellSeams(): BufferGeometry[] {
  const { a, b, scaleX, scaleZ, rim } = SHELL;
  const lift = 1.006;
  const over = (plane: "x" | "z") => {
    const sx = plane === "x" ? scaleX : scaleZ;
    return archPoints(plane, a * lift * sx, b * lift, rim, Math.PI - rim, 72);
  };
  const equator = azimuthArc(
    a * lift * scaleX,
    a * lift * scaleZ,
    0,
    0,
    TAU,
    96,
  ).slice(0, -1);
  return [
    tube(over("x").map(deformShell), 0.0045),
    tube(over("z").map(deformShell), 0.0045),
    tube(equator, 0.0045, true),
  ];
}

function rimTrimGeometry(): BufferGeometry {
  const { a, b, scaleX, scaleZ, rim } = SHELL;
  const y = b * Math.sin(rim);
  const r = a * Math.cos(rim);
  const pts = azimuthArc(r * scaleX, r * scaleZ, y, 0, TAU, 96)
    .slice(0, -1)
    .map(deformShell);
  return tube(pts, 0.014, true);
}

export type SensorPlacement = {
  position: Vector3;
  quaternion: Quaternion;
};

const SENSOR_RINGS = [
  { elevation: deg(15), count: 6, azimuth0: deg(30) },
  { elevation: deg(40), count: 6, azimuth0: 0 },
  { elevation: deg(65), count: 3, azimuth0: deg(60) },
] as const;

export function placementAt(
  elevation: number,
  azimuth: number,
): SensorPlacement {
  const { rx, ry, rz } = SENSOR_SURFACE;
  const position = new Vector3(
    rx * Math.cos(elevation) * Math.sin(azimuth),
    ry * Math.sin(elevation),
    rz * Math.cos(elevation) * Math.cos(azimuth),
  );
  const normal = new Vector3(
    position.x / (rx * rx),
    position.y / (ry * ry),
    position.z / (rz * rz),
  ).normalize();
  const quaternion = new Quaternion().setFromUnitVectors(
    new Vector3(0, 1, 0),
    normal,
  );
  return { position, quaternion };
}

/** 16 sensor positions organized in rings over the head's curvature. */
function sensorPlacements(): SensorPlacement[] {
  const placements: SensorPlacement[] = [];
  for (const ring of SENSOR_RINGS) {
    for (let i = 0; i < ring.count; i++) {
      placements.push(
        placementAt(ring.elevation, ring.azimuth0 + (i / ring.count) * TAU),
      );
    }
  }
  placements.push(placementAt(Math.PI / 2, 0)); // crown
  return placements;
}

/** Thin mounting rings that tie the sensor rings together. */
function sensorMountRings(): BufferGeometry[] {
  const { rx, ry, rz } = SENSOR_SURFACE;
  return SENSOR_RINGS.map(({ elevation }) =>
    tube(
      azimuthArc(
        rx * Math.cos(elevation) * 0.985,
        rz * Math.cos(elevation) * 0.985,
        ry * Math.sin(elevation),
        0,
        TAU,
        72,
      ).slice(0, -1),
      0.0065,
      true,
    ),
  );
}

/** Where the conceptual processing module sits (rear of the head). */
export const PROCESSING_ORIGIN = new Vector3(0, 0.18, -0.7);

/** Thin connectors from the processing module toward nearby sensor pads. */
function processingConnectors(): BufferGeometry[] {
  const start = PROCESSING_ORIGIN.clone().add(new Vector3(0, 0.02, 0.06));
  const targets = [
    placementAt(deg(15), deg(150)).position,
    placementAt(deg(15), deg(210)).position,
    placementAt(deg(40), deg(180)).position,
  ];
  return targets.map((target, i) => {
    const from = start.clone().add(new Vector3((i - 1) * 0.07, 0, 0));
    const mid = from
      .clone()
      .lerp(target, 0.5)
      .add(new Vector3(0, 0, 0.05));
    return tube([from, mid, target], 0.007);
  });
}

/** Lower structural ring plus two crown arches. */
function supportGeometry() {
  const ringY = -0.12;
  const ring = tube(
    azimuthArc(0.62, 0.72, ringY, 0, TAU, 96).slice(0, -1),
    0.016,
    true,
  );
  const lowest = Math.asin(ringY / 0.82);
  const archX = tube(
    archPoints("x", 0.7, 0.82, lowest, Math.PI - lowest, 72),
    0.011,
  );
  const archZ = tube(
    archPoints("z", 0.8, 0.82, lowest, Math.PI - lowest, 72),
    0.011,
  );
  return { ring, archX, archZ };
}

export type SupportPost = {
  position: Vector3;
  quaternion: Quaternion;
  length: number;
};

/** Four standoff posts between the structural ring and the shell wall. */
function supportPosts(): SupportPost[] {
  const y = -0.12;
  return [45, 135, 225, 315].map((azDeg) => {
    const az = deg(azDeg);
    const from = new Vector3(0.62 * Math.sin(az), y, 0.72 * Math.cos(az));
    const to = new Vector3(0.74 * Math.sin(az), y, 0.88 * Math.cos(az));
    const dir = to.clone().sub(from);
    return {
      position: from.clone().add(to).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        dir.clone().normalize(),
      ),
      length: dir.length(),
    };
  });
}

export type FeedbackPad = { position: Vector3; rotationY: number };

export const FEEDBACK = { y: -0.3, rx: 0.57, rz: 0.67 } as const;

/** Four abstract pads along the feedback band. */
function feedbackPads(): FeedbackPad[] {
  return [55, 125, 235, 305].map((azDeg) => {
    const az = deg(azDeg);
    return {
      position: new Vector3(
        FEEDBACK.rx * Math.sin(az),
        FEEDBACK.y,
        FEEDBACK.rz * Math.cos(az),
      ),
      rotationY: az,
    };
  });
}

function headGeometry(): BufferGeometry {
  const g = new SphereGeometry(1, 40, 28);
  g.scale(HEAD.rx, HEAD.ry, HEAD.rz);
  return g;
}

const support = supportGeometry();

/** Created once, shared by every consumer, never mutated. */
export const HELMET_GEOMETRY = {
  shell: shellGeometry(),
  visor: visorGeometry(),
  visorFrame: visorFrameGeometry(),
  seams: shellSeams(),
  rimTrim: rimTrimGeometry(),
  earPod: new CylinderGeometry(0.17, 0.17, 0.07, 32),

  sensorPad: new CylinderGeometry(0.055, 0.055, 0.02, 20),
  sensorGlow: new CylinderGeometry(0.026, 0.026, 0.008, 16),
  sensorPlacements: sensorPlacements(),
  sensorMountRings: sensorMountRings(),

  processingPlate: new BoxGeometry(0.4, 0.3, 0.035),
  processingCore: new BoxGeometry(0.26, 0.18, 0.05),
  processingChip: new BoxGeometry(0.08, 0.07, 0.04),
  processingAccent: new BoxGeometry(0.2, 0.012, 0.052),
  processingConnectors: processingConnectors(),

  feedbackBand: tube(
    azimuthArc(FEEDBACK.rx, FEEDBACK.rz, FEEDBACK.y, deg(55), deg(305), 72),
    0.011,
  ),
  feedbackPad: new BoxGeometry(0.14, 0.07, 0.03),
  feedbackPads: feedbackPads(),

  supportRing: support.ring,
  supportArchX: support.archX,
  supportArchZ: support.archZ,
  supportPost: new CylinderGeometry(0.014, 0.014, 1, 10),
  supportPosts: supportPosts(),

  head: headGeometry(),
  neck: new CylinderGeometry(0.17, 0.19, 0.32, 28, 1, true),
} as const;
