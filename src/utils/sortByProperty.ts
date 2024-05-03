export const sortProductsByProperty = <T>(array: T[], property: keyof T) => {
  const sortedArray = [...array];
  return sortedArray.sort((a: T, b: T) => (a[property] > b[property] ? 1 : -1));
};
