import { camelToDotCase } from "../../../lib/utils";

export function deriveActionNameFromFn(fn: Function) {
  return "user." + camelToDotCase(fn.name);
}
