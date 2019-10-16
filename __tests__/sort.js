import { sortObjects } from '../app/utils/sortAlphaNum';
import notSorted from '../testSuite/notSorted';
import {
  sortedIdAsc,
  sortedIdDesc,
  sortedAddressAsc,
  sortedAddressDesc,
} from '../testSuite/sorted';

test('sorts properties --> sortKey id | order ASC', () => {
  const sorted = sortObjects(notSorted, 'id', true);
  expect(sorted).toEqual(sortedIdAsc);
});

test('sorts properties --> sortKey id | order DESC', () => {
  const sorted = sortObjects(notSorted, 'id', false);
  expect(sorted).toEqual(sortedIdDesc);
});

test('sorts properties --> sortKey address | order ASC', () => {
  const sorted = sortObjects(notSorted, 'address', true);
  expect(sorted).toEqual(sortedAddressAsc);
});

test('sorts properties --> sortKey address | order DESC', () => {
  const sorted = sortObjects(notSorted, 'address', false);
  expect(sorted).toEqual(sortedAddressDesc);
});
