export const isNumeric = (str: string) => {
  const rx = new RegExp(/^\d+$/);
  return rx.test(str);
};
