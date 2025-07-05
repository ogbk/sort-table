const sortObjects = (mainArr: Array<string>, sortKey: string, sortAsc: boolean): Array<string> => {
  const sortFactor = sortAsc ? 1 : -1;
  return mainArr.sort((a,b) => (sortFactor * (a[sortKey].localeCompare(b[sortKey]))))
};

export { sortObjects };
