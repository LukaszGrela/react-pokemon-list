export const capitalise = (input: string): string => {
  if (input.length === 0) return input;

  const first = input.substring(0, 1).toLocaleUpperCase();
  if (input.length === 1) return first;
  if (input.indexOf('-') !== -1) {
    return input
      .split('-')
      .map((chunk) => capitalise(chunk))
      .join('-');
  }
  return `${first}${input.substring(1)}`;
};
