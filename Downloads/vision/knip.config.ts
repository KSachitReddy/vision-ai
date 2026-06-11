/**
 * Knip configuration — unused-export and unused-dependency detection.
 */
export default {
  entry: [
    "apps/api/src/index.ts",
    "apps/web/src/main.tsx",
    "tests/**/*.test.ts",
  ],
  project: ["**/src/**/*.{ts,tsx}"],
  ignore: ["**/dist/**", "**/build/**", "**/node_modules/**"],
};
