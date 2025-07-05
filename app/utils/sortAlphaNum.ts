import type {Fields} from '../utils/types';

const sortObjects = (mainArr: Fields[], sortKey: string, sortAsc: boolean): Fields[] => {
  const sortFactor = sortAsc ? 1 : -1;
  //@ts-ignore-error
  return mainArr.sort((a,b) => (sortFactor * (a[sortKey].localeCompare(b[sortKey]))))
};

export { sortObjects };
