import { sortObjects } from '../app/utils/sortAlphaNum';
import notSorted from '../testSuite/notSorted';

test('sorts properties --> sortKey id | order ASC', () => {
  const sortedArray = [
    {
      address: '.1 address',
      id: '1',
      location: {
        lat: '51.608049',
        long: '-0.1096416',
      },	  
    }, {
      address: '2 address',
      id: '2',
      location: {
        lat: '51.5075601',
        long: '-0.1077025',
      },	  
    }, {
      address: '10 address',
      id: '3',
      location: {
        lat: '54.9439441',
        long: '-3.9222086',
      },	  
    }, {
      address: '1 address',
      id: '4',
	  location: {
        lat: '50.7669',
        long: '0.280939',
      },
    }, {
      address: '12 address',
      id: '5',
      location: {
        lat: '40.4334536',
        long: '-3.689207',
      },	  
    }, {
      address: '11 address',
      id: '6',
      location: {
        lat: '52.52000659',
        long: '13.404954',
      },	  
    }, {
      address: '21 address',
      id: '7',
      location: {
        lat: '51.4861134',
        long: '-0.21469',
      },	  
    },
  ];

  const sorted = sortObjects(notSorted, 'id',  true );
  expect(sorted).toEqual(sorted);  
});

test('sorts properties --> sortKey id | order DESC', () => {
  const sortedArray = [
    {
      address: '21 address',
      id: '7',
      location: {
        lat: '51.4861134',
        long: '-0.21469',
      },	  
    }, {
	  address: '11 address',
      id: '6',
      location: {
        lat: '52.52000659',
        long: '13.404954',
      },
    }, {
      address: '12 address',
      id: '5',
      location: {
        lat: '40.4334536',
        long: '-3.689207',
      },
    }, {
      address: '1 address',
      id: '4',
	  location: {
        lat: '50.7669',
        long: '0.280939',
      },
    }, {	
      address: '10 address',
      id: '3',
      location: {
        lat: '54.9439441',
        long: '-3.9222086',
      },	  
    }, {	
      address: '2 address',
      id: '2',
      location: {
        lat: '51.5075601',
        long: '-0.1077025',
      },	  
    }, {	
      address: '.1 address',
      id: '1',
      location: {
        lat: '51.608049',
        long: '-0.1096416',
      },	
    }	  
  ];

  const sorted = sortObjects(notSorted, 'id', false);
  expect(sorted).toEqual(sortedArray);  
});


test('sorts properties --> sortKey address | order ASC', () => {
  const sortedArray = [
    {
      address: '.1 address',
      id: '1',
      location: {
        lat: '51.608049',
        long: '-0.1096416',
      }
    }, {
      address: '1 address',
      id: '4',
      location: {
        lat: '50.7669',
        long: '0.280939',
      },	  
    }, {
      address: '2 address',
      id: '2',
      location: {
        lat: '51.5075601',
        long: '-0.1077025',
      },	  
    }, {
      address: '10 address',
      id: '3',
      location: {
        lat: '54.9439441',
        long: '-3.9222086',
      },	  
    }, {
      address: '11 address',
      id: '6',
      location: {
        lat: '52.52000659',
        long: '13.404954',
      },	  
    }, {
      address: '12 address',
      id: '5',
      location: {
        lat: '40.4334536',
        long: '-3.689207',
      },	  
    }, {
      address: '21 address',
      id: '7',
      location: {
        lat: '51.4861134',
        long: '-0.21469',
      },	  
    },
  ];

  const sorted = sortObjects(notSorted, 'address', true);
  expect(sorted).toEqual(sortedArray);
});

test('sorts properties --> sortKey address | order DESC', () => {
  const sortedArray = [
    {
      address: '21 address',
      id: '7',
      location: {
        lat: '51.4861134',
        long: '-0.21469',
      },	  
    }, {
	  address: '12 address',
      id: '5',
      location: {
        lat: '40.4334536',
        long: '-3.689207',
      },
    }, {
      address: '11 address',
      id: '6',
      location: {
        lat: '52.52000659',
        long: '13.404954',
      },	  
    }, {
      address: '10 address',
      id: '3',
      location: {
        lat: '54.9439441',
        long: '-3.9222086',
      },	  
    }, {
      address: '2 address',
      id: '2',
      location: {
        lat: '51.5075601',
        long: '-0.1077025',
      },	  
    }, {
      address: '1 address',
      id: '4',
      location: {
        lat: '50.7669',
        long: '0.280939',
      },	  
    }, {
      address: '.1 address',
      id: '1',
      location: {
        lat: '51.608049',
        long: '-0.1096416',
      }
    }	  
  ];

  const sorted = sortObjects(notSorted, 'address', false);
  expect(sorted).toEqual(sortedArray);
});


