const getItem = (key: string): string[] =>
  JSON.parse(localStorage.getItem(key) as string);

export default getItem;
