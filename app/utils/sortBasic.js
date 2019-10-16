// @flow

const basicSortObjects = (
  mainArr: Array<any>,
  sortKey: string,
  sortAsc:boolean = true,
):Array<any> => {
  const newArr = [...mainArr];
  const sortFactor = sortAsc ? 1 : -1;

  newArr.sort(({ [sortKey]: sortKeyA }, { [sortKey]: sortKeyB }) => (
    typeof (sortKeyA) === 'number'
      ? ((sortKeyA - sortKeyB) * sortFactor)
      : (String(sortKeyA).localeCompare(String(sortKeyB))) * sortFactor
  ));

  return newArr;
};

const basicSortItems = (
  mainArr: Array<any>,
  sortAsc:boolean = true,
):Array<any> => {
  const newArr = [...mainArr];
  const sortFactor = sortAsc ? 1 : -1;

  newArr.sort((itemA, itemB) => (
    typeof (itemA) === 'number'
      ? ((itemA - itemB) * sortFactor)
      : (String(itemA).localeCompare(String(itemB))) * sortFactor
  ));

  return newArr;
};

export { basicSortObjects, basicSortItems };
