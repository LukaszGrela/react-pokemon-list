import { canUseDOM } from './canUseDOM';

const prefix = (input: string): string => {
  if (input.substring(0, 2) !== '--') {
    return `--${input}`;
  }
  return input;
};

export const getCSSVar = (varName: string): string | undefined => {
  if (canUseDOM) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(prefix(varName))
      .trim();
  }
  return undefined;
};
