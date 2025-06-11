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
      defaultValue: null,
      props: {
        condition: null,
        disabled: null,
        options: ['Male', 'Female', 'Other'],
        title: 'Gender',
      },
      validation: [
        {
          type: 'required',
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
      id: 'submitBtn',
      element: 'SubmitButton',
      defaultValue: null,
      props: {
        align: 'right',
        text: 'Submit',
        type: 'primary',
      },
      validation: null,
    },
  ],
};
