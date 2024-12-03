export const fakeSnakeCaseObject = Object.freeze({
  first_level_string: 'Hello Joe!',
  first_level_object: {
    second_level_string: 'Hello Joe!',
    second_level_object: {
      third_level_string: 'Hello Joe!',
      third_level_object: {},
      third_level_number: 3,
      third_level_array: [],
    },
    second_level_number: 2,
    second_level_array: [
      'everything',
      33333,
      {
        third_level_string: 'Hello Joe!',
        third_level_object: {},
        third_level_number: 3,
        third_level_array: [],
      },
    ],
  },
  first_level_number: 1,
  first_level_array: [
    'string',
    0,
    true,
    false,
    3,
    [],
    {
      second_level_string: 'Hello Joe!',
      second_level_object: {
        third_level_string: 'Hello Joe!',
        third_level_object: {},
        third_level_number: 3,
        third_level_array: [],
      },
      second_level_number: 2,
      second_level_array: [],
    },
  ],
})

export const fakeCamelCaseObject = Object.freeze({
  firstLevelString: 'Hello Joe!',
  firstLevelObject: {
    secondLevelString: 'Hello Joe!',
    secondLevelObject: {
      thirdLevelString: 'Hello Joe!',
      thirdLevelObject: {},
      thirdLevelNumber: 3,
      thirdLevelArray: [],
    },
    secondLevelNumber: 2,
    secondLevelArray: [
      'everything',
      33333,
      {
        thirdLevelString: 'Hello Joe!',
        thirdLevelObject: {},
        thirdLevelNumber: 3,
        thirdLevelArray: [],
      },
    ],
  },
  firstLevelNumber: 1,
  firstLevelArray: [
    'string',
    0,
    true,
    false,
    3,
    [],
    {
      secondLevelString: 'Hello Joe!',
      secondLevelObject: {
        thirdLevelString: 'Hello Joe!',
        thirdLevelObject: {},
        thirdLevelNumber: 3,
        thirdLevelArray: [],
      },
      secondLevelNumber: 2,
      secondLevelArray: [],
    },
  ],
})
