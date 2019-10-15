// @flow

type UnicodeOfChar = {
  charType: 'CHAR_UNICODE' | 'INT_FRAGMENT',
  value: number
};

type StringInfo = {
  containsInt: boolean,
  mainString: string,
  unicodeList: Array<UnicodeOfChar>
};

type Stack = {
  intBuffer: Array<number>,
  isReadingInt: boolean
};

const closeIntBuffer = (stack:Stack, unicodeList: Array<UnicodeOfChar>) => {
  if (stack.isReadingInt) {
    unicodeList.push({
      charType: 'INT_FRAGMENT',
      value: Number(stack.intBuffer.join('')),
    });
  }
  stack.intBuffer = [];
  stack.isReadingInt = false;
};

const createUnicodeList = (mainString: string): StringInfo => {
  let containsInt: boolean = false;
  const lenString: number = mainString.length;
  const unicodeList: Array<UnicodeOfChar> = [];

  const stack:Stack = {
    intBuffer: [],
    isReadingInt: false,
  };

  for (let xval:number, xchar:string, i:number = 0; i < lenString; i += 1) {
    xchar = mainString[i];
    xval = mainString.charCodeAt(i);

    if (xval >= 48 && xval <= 57) { // reading numeric char -> an int fragment
      containsInt = true;
      stack.intBuffer.push(Number(xchar));
      stack.isReadingInt = true;
    } else { // reading non-numeric char
      closeIntBuffer(stack, unicodeList); // last read char was int
      unicodeList.push({
        charType: 'CHAR_UNICODE',
        value: xval,
      });
    }
  }

  // parse int buffer in case last read char was int
  closeIntBuffer(stack, unicodeList);

  return ({
    containsInt, mainString, unicodeList,
  });
};

const sortUnicodeList = (
  {
    sortInfo: {
      containsInt: containsIntA,
      mainString: stringA,
      unicodeList: unicodeListA,
    },
  }: {
      sortInfo: StringInfo
  },
  {
    sortInfo: {
      containsInt: containsIntB,
      mainString: stringB,
      unicodeList: unicodeListB,
    },
  }: {
      sortInfo: StringInfo
  },
): number => {
  if (!containsIntA && !containsIntB) {
    return (stringA.localeCompare(stringB));
  }
  const maxLen = Math.max(unicodeListA.length, unicodeListB.length);

  for (let i = 0; i < maxLen; i += 1) {
    // both strings contain same items so far
    if (!unicodeListA[i]) { return (-1); } // string B is longer
    if (!unicodeListB[i]) { return 1; } // string A is longer

    const { charType: charTypeA, value: valueA } = unicodeListA[i];
    const { charType: charTypeB, value: valueB } = unicodeListB[i];

    if (charTypeA === charTypeB) {
      if (valueA !== valueB) {
        return (valueA - valueB);
      }
    } else if (charTypeA === 'CHAR_UNICODE') {
      return (valueA - 48);
    } else if (charTypeB === 'CHAR_UNICODE') {
      return (valueB - 48);
    }
  }
  return 0;
};


const customSort = (newArr: Array<any>, sortAsc:boolean = true): Array<any> => {
  const sortFactor = sortAsc ? 1 : -1;

  newArr.sort((a, b) => (
    sortUnicodeList(a, b) * sortFactor
  ));
  return (
    newArr.map(({ sortInfo, ...rest }) => (rest))
  );
};

const sortStrings = (stringArr: Array<string>, sortAsc:boolean = true):Array<any> => {
  const newArr:Array<any> = stringArr.map((item) => ({
    sortInfo: (createUnicodeList(item)),
    item,
  }));

  return (
    customSort(newArr, sortAsc)
  );
};

const sortObjects = (mainArr: Array<any>, sortKey: string, sortAsc:boolean = true):Array<any> => {
  const newArr:Array<any> = mainArr.map((item:any) => ({
    sortInfo: (createUnicodeList(item[sortKey])),
    ...item,
  }));

  return (
    customSort(newArr, sortAsc)
  );
};

export { sortObjects, sortStrings };
