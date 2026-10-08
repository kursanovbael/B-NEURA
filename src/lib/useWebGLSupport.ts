"use client";

import { useSyncExternalStore } from "react";
import { isWebGLAvailable } from "./webgl";

const noopSubscribe = () => () => {};

/** null on the server and during hydration, then true or false on the client. */
export function useWebGLSupport(): boolean | null {
  return useSyncExternalStore(noopSubscribe, isWebGLAvailable, () => null);
}
