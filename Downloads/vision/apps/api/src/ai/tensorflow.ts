/**
 * TensorFlow.js model registry (server stub).
 *
 * Holds metadata for trained gesture models. The browser performs inference
 * with `@tensorflow/tfjs`; this module is intentionally framework-agnostic so
 * trained models can be served from object storage later.
 */

export interface TfModelDescriptor {
  name: string;
  version: string;
  url: string;
  inputShape: number[];
  classes: string[];
}

export const tfModels: TfModelDescriptor[] = [
  {
    name: "signbridge-baseline",
    version: "0.1.0",
    url: "models/signbridge-baseline/model.json",
    inputShape: [21, 3],
    classes: ["A", "B", "C", "HELLO", "THANK_YOU", "YES", "NO"],
  },
];

export function getModel(name: string): TfModelDescriptor | undefined {
  return tfModels.find((m) => m.name === name);
}
