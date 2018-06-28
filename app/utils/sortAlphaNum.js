/**
 ALPHA NUMERIC SORTING
 ========================
*/

// helper function -> reads sequence of integer in a string
const readIntFragment = (str, idx) => {
  let charCounter = idx;
  let charValue = 0;
  let RESULT = '';
  const lenStr = str.length;
  let isIntValue = true; // flag -> says if current char is an int

  while (isIntValue && (charCounter < lenStr)) {
    charValue = str.charCodeAt(charCounter);

    // this char is a number
    if (charValue <= 57 && charValue >= 48) {
      RESULT += `${str[charCounter]}`;
      charCounter += 1;
    } else {
      isIntValue = false;
    }
  }

  // return [ <sequence_of_integer_just_read>, <last_index_read> ]
  return ([(RESULT * 1), (charCounter - 1)]);
};

/* eslint-disable consistent-return */

// called by Array.sort => sorts 2 alphanunumeric strings by <orderAsc - bool value>
const alphaNumSort = (a, b, orderAsc = true) => {
  const sortOrder = (orderAsc ? 1 : (-1)); // sort order - is multiplied to returned result
  let valueA = ''; // value of current char in string a
  let valueB = ''; // value of current char in string b
  let indexA = 0; // current index of string a
  let indexB = 0; // current index of string b
  const lenA = a.length; // length of string a
  const lenB = b.length; // length of string b
  const lenMax = (lenA > lenB ? lenA : lenB); // length of longer string

  while (indexA <= lenMax && indexB <= lenMax) {
    // end of string a -> it equals or is before string b in 'ASC' order
    if (indexA === lenA) {
      return ((-1) * sortOrder);
    }

    // end of string b -> it equals or is before string a in 'ASC' order
    if (indexB === lenB) {
      return (1 * sortOrder);
    }

    // store char code value of current char
    valueA = a.charCodeAt(indexA);
    valueB = b.charCodeAt(indexB);

    // current chars are both numbers
    if (valueA <= 57 && valueA >= 48 && valueB <= 57 && valueB >= 48) {
      // reads int position of string
      const [intFragValueA, intFragIndexA] = readIntFragment(a, indexA);
      const [intFragValueB, intFragIndexB] = readIntFragment(b, indexB);

      if (intFragValueA !== intFragValueB) {
        return ((intFragValueA - intFragValueB) * sortOrder);
      }

      // numbers are equal -> store value of last read index and move on
      indexA = intFragIndexA;
      indexB = intFragIndexB;
    } else if (valueA !== valueB) {
    // sorting is possible because at least one value is not an int
      return ((valueA - valueB) * sortOrder);
    }

    // all read characters are equal -> work on next character
    indexA += 1;
    indexB += 1;
  }
};

/* eslint-ensable consistent-return */

// sort 2 alphanum strings
const mySort = (list, sortAsc = true) => (
  list.sort(
    (a, b) => (alphaNumSort(a, b, sortAsc)),
  )
);

// sort 2 arrays by alphanum attribute <sortKey>
const mySortArr = (list, sortKey, sortAsc = true) => (
  list.sort(
    (a, b) => (alphaNumSort(a[sortKey], b[sortKey], sortAsc)),
  )
);


export { mySort, mySortArr };
