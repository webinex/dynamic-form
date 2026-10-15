import { Model } from '@/Model';

export const DEFAULT_MODEL: Model = {
  elements: [
    {
      id: 'title',
      element: 'Heading',
      defaultValue: null,
      props: {
        marginBottom: 'md',
        marginTop: 'none',
        text: 'Demographics',
        level: 3,
      },
      validation: null,
    },
    {
      id: 'helpText',
      element: 'Paragraph',
      defaultValue: null,
      props: {
        marginBottom: 'lg',
        marginTop: 'none',
        type: 'secondary',
        text: 'We would need some demographics and contact information.\nPlease fill in information below, information with "*" mark is required.',
      },
      validation: null,
    },
    {
      id: 'gender',
      element: 'RadioGroup',
      defaultValue: 'Male',
      props: {
        optionType: 'default',
        options: ['Male', 'Female', 'Other'],
        title: 'Gender',
        condition: null,
        disabled: null,
      },
      validation: [
        {
          type: 'required',
        },
      ],
    },
    {
      id: 'dateOfBirth',
      element: 'DateTimePicker',
      defaultValue: null,
      props: {
        disabled: null,
        type: 'date',
        title: 'Date of Birth',
      },
      validation: [
        {
          type: 'required',
          message: null,
        },
      ],
    },
    {
      id: 'firstName',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: 'James',
        htmlType: 'text',
        type: 'input',
        title: 'First Name',
        multiline: false,
      },
      validation: [
        {
          type: 'required',
          message: null,
        },
        {
          type: 'test',
          message: 'Might be at least 3 characters',
          test: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'CallExpression',
              function: 'len',
              args: [
                {
                  type: 'ReferenceExpression',
                  ref: 'firstName',
                },
              ],
            },
            right: {
              type: 'ConstantExpression',
              value: '3',
            },
          },
        },
        {
          type: 'test',
          message: 'Might be less than 10 characters',
          test: {
            type: 'BinaryExpression',
            operator: '>',
            left: {
              type: 'CallExpression',
              function: 'len',
              args: [
                {
                  type: 'ReferenceExpression',
                  ref: 'firstName',
                },
              ],
            },
            right: {
              type: 'ConstantExpression',
              value: '10',
            },
          },
        },
      ],
    },
    {
      id: 'lastName',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: 'Doe',
        htmlType: 'text',
        type: 'input',
        title: 'Last Name',
        multiline: false,
      },
      validation: [
        {
          type: 'required',
          message: null,
        },
        {
          type: 'test',
          message: 'Might be at least 3 characters',
          test: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'CallExpression',
              function: 'len',
              args: [
                {
                  type: 'ReferenceExpression',
                  ref: 'lastName',
                },
              ],
            },
            right: {
              type: 'ConstantExpression',
              value: '3',
            },
          },
        },
        {
          type: 'test',
          message: 'Might be less than 10 characters',
          test: {
            type: 'BinaryExpression',
            operator: '>',
            left: {
              type: 'CallExpression',
              function: 'len',
              args: [
                {
                  type: 'ReferenceExpression',
                  ref: 'lastName',
                },
              ],
            },
            right: {
              type: 'ConstantExpression',
              value: '10',
            },
          },
        },
      ],
      condition: null,
    },
    {
      id: 'maidenName',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        htmlType: 'text',
        type: 'input',
        title: 'Maiden Name',
      },
      validation: null,
      condition: {
        type: 'BinaryExpression',
        operator: '=',
        left: {
          type: 'ReferenceExpression',
          ref: 'gender',
        },
        right: {
          type: 'ConstantExpression',
          value: 'Female',
        },
      },
    },
    {
      id: 'divider1',
      element: 'Divider',
      defaultValue: null,
      props: {
        marginBottom: 'lg',
        marginTop: 'lg',
      },
      validation: null,
    },
    {
      id: 'contactInformationTitle',
      element: 'Heading',
      defaultValue: null,
      props: {
        marginBottom: 'md',
        marginTop: 'none',
        text: 'Contact information',
        level: 4,
      },
      validation: null,
    },
    {
      id: 'phoneNumber',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: '+1 25325 326 3262',
        htmlType: 'text',
        type: 'input',
        title: 'Phone Number',
        multiline: false,
      },
      validation: null,
    },
    {
      id: 'email',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: 'james.doe@gmail.com',
        htmlType: 'text',
        type: 'input',
        title: 'Email',
        multiline: false,
      },
      validation: [
        {
          type: 'required',
        },
      ],
    },
    {
      id: 'divider2',
      element: 'Divider',
      defaultValue: null,
      props: {
        marginBottom: 'lg',
        marginTop: 'lg',
      },
      validation: null,
    },
    {
      id: 'aboutYourselfTitle',
      element: 'Heading',
      defaultValue: null,
      props: {
        marginBottom: 'md',
        marginTop: 'none',
        text: 'About yourself',
        level: 4,
      },
      validation: null,
    },
    {
      id: 'bio',
      element: 'Input',
      defaultValue: null,
      props: {
        disabled: null,
        htmlType: 'text',
        type: 'textarea',
        title: 'Bio',
      },
      validation: null,
    },
    {
      id: 'specialty',
      element: 'Select',
      defaultValue: null,
      props: {
        disabled: null,
        options: ['Therapist', 'Surgery', 'Pediatrics', 'Dentist', 'Other'],
        title: 'Specialty',
      },
      validation: [
        {
          type: 'required',
          message: null,
        },
      ],
    },
    {
      id: 'licenses',
      element: 'CheckboxGroup',
      defaultValue: null,
      props: {
        disabled: null,
        options: ['Psychology', 'Therapy', 'Surgery'],
        description: null,
        title: 'Licenses',
      },
      validation: null,
    },
    {
      id: 'statesLicensed',
      element: 'MultiSelect',
      defaultValue: [],
      props: {
        disabled: null,
        showSearch: true,
        options: ['Alaska', 'Alabama', 'Washington'],
        title: 'States Licensed (when any Licenses selected)',
      },
      validation: null,
      condition: {
        type: 'BinaryExpression',
        operator: '>',
        left: {
          type: 'CallExpression',
          function: 'len',
          args: [
            {
              type: 'ReferenceExpression',
              ref: 'licenses',
            },
          ],
        },
        right: {
          type: 'ConstantExpression',
          value: 0,
        },
      },
    },
    {
      id: 'satisfaction',
      element: 'Matrix',
      defaultValue: [],
      props: {
        title: 'Customer Satisfaction Survey',
        rows: [
          {
            title: 'How satisfied are you with our service?',
            required: true,
            options: [
              { label: 'Very satisfied', value: 5 },
              { label: 'Satisfied', value: 4 },
              { label: 'Neutral', value: 3 },
              { label: 'Dissatisfied', value: 2 },
              { label: 'Very dissatisfied', value: 1 },
            ],
          },
          {
            title: 'Would you recommend our service to others?',
            options: [
              { label: 'Yes', value: 5 },
              { label: 'Maybe', value: 3 },
              { label: 'No', value: 1 },
            ],
          },
          {
            title: 'How likely are you to use our service again?',
            options: [
              { label: 'Very likely', value: 5 },
              { label: 'Likely', value: 4 },
              { label: 'Neutral', value: 3 },
              { label: 'Unlikely', value: 2 },
              { label: 'Very unlikely', value: 1 },
            ],
          },
        ],
        interpretations: [
          {
            from: 0,
            to: 5,
            text: 'Low satisfaction',
          },
          {
            from: 6,
            to: 10,
            text: 'Moderate satisfaction',
          },
          {
            from: 11,
            to: 15,
            text: 'High satisfaction',
          },
        ],
      },
      validation: [{ type: 'required' }],
    },
    {
      id: 'phq9-table',
      element: 'MatrixTable',
      defaultValue: [],
      props: {
        title: 'PHQ-9',
        rows: [
          'Little interest or pleasure in doing things',
          'Feeling down, depressed, or hopeless',
          'Trouble falling or staying asleep, or sleeping too much',
          'Feeling tired or having little energy',
          'Poor appetite or overeating',
          'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
          'Trouble concentrating on things, such as reading the newspaper or watching television',
          'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
          'Thoughts that you would be better off dead or of hurting yourself in some way',
        ],
        cols: [
          { label: 'Not at all', value: 0 },
          { label: 'Several days', value: 1 },
          { label: 'More than half the days', value: 2 },
          { label: 'Nearly every day', value: 3 },
        ],
        interpretations: [
          {
            from: 0,
            to: 4,
            text: 'Minimal depression',
          },
          {
            from: 5,
            to: 9,
            text: 'Mild depression',
          },
          {
            from: 10,
            to: 14,
            text: 'Moderate depression',
          },
          {
            from: 15,
            to: 19,
            text: 'Moderately severe depression',
          },
          {
            from: 20,
            to: 27,
            text: 'Severe depression',
          },
        ],
      },
      validation: [{ type: 'required' }],
      condition: null,
    },
  ],
};
