import version from "../../../package.json";

export const ENV = {
  version: version.version,
} as const;
