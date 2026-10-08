/**
 * Monotone cubic interpolation (Fritsch-Carlson / PCHIP) through keyframes.
 * Velocity is continuous across keys, the curve never overshoots its data,
 * and equal neighbouring keys give a flat hold. The ends start and finish at
 * rest. Pure functions: the same input always gives the same output.
 */

export type Key<T> = readonly [position: number, value: T];

export type Curve = {
  xs: readonly number[];
  ys: readonly number[];
  slopes: readonly number[];
};

export function makeCurve(keys: readonly Key<number>[]): Curve {
  const n = keys.length;
  const xs = keys.map(([x]) => x);
  const ys = keys.map(([, y]) => y);
  const h = xs.slice(1).map((x, i) => x - xs[i]);
  const d = h.map((hi, i) => (ys[i + 1] - ys[i]) / hi);

  const slopes = new Array<number>(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] > 0) {
      const w1 = 2 * h[i] + h[i - 1];
      const w2 = h[i] + 2 * h[i - 1];
      slopes[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
  }
  return { xs, ys, slopes };
}

export function evaluate(curve: Curve, p: number): number {
  const { xs, ys, slopes } = curve;
  const last = xs.length - 1;
  if (p <= xs[0]) return ys[0];
  if (p >= xs[last]) return ys[last];

  let i = 0;
  while (p > xs[i + 1]) i++;

  const h = xs[i + 1] - xs[i];
  const t = (p - xs[i]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * ys[i] +
    (t3 - 2 * t2 + t) * h * slopes[i] +
    (-2 * t3 + 3 * t2) * ys[i + 1] +
    (t3 - t2) * h * slopes[i + 1]
  );
}
