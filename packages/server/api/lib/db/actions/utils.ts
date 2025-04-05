import { camelToDotCase } from "../../utils";

export function deriveActionNameFromFn(fn: Function) {
  return "user." + camelToDotCase(fn.name);
}
