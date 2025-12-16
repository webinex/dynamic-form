
# Dynamic Form

A flexible, customizable React library for building dynamic forms with support for themes, localization, and extensible form elements.

## Features

- **Dynamic Form Generation**: Create forms from JSON or configuration objects.
- **Customizable Elements**: Easily add or extend form elements.
- **Field Sets & Grouping**: Organize fields into logical groups.
- **Theming**: Style forms with built-in or custom themes.
- **Localization**: Support for multiple languages.
- **Designer Tools**: Visual form designer for rapid prototyping.

## Demo

Try it live: [https://webinex.github.io/dynamic-form](https://webinex.github.io/dynamic-form)

## Getting Started

### Installation

```sh
npm install @webinex/dynamic-form
```

### Usage

```tsx
import { DynamicForm } from '@webinex/dynamic-form';

const formConfig = {
  "elements": [
    {
      "id": "title",
      "element": "Heading",
      "defaultValue": null,
      "props": {
        "marginBottom": "md",
        "marginTop": "none",
        "text": "Demographics",
        "level": 3
      },
      "validation": null
    },
    {
      "id": "helpText",
      "element": "Paragraph",
      "defaultValue": null,
      "props": {
        "marginBottom": "lg",
        "marginTop": "none",
        "type": "secondary",
        "text": "We would need some demographics and contact information.\nPlease fill in information below, information with \"*\" mark is required."
      },
      "validation": null
    },
    {
      "id": "gender",
      "element": "RadioGroup",
      "defaultValue": null,
      "props": {
        "condition": null,
        "disabled": null,
        "options": [
          "Male",
          "Female",
          "Other"
        ],
        "title": "Gender"
      },
      "validation": [
        {
          "type": "required"
        }
      ]
    }
  ]
};

export default function MyForm() {
	return <DynamicForm config={formConfig} />;
}
```

See [lib/DynamicForm.tsx](lib/DynamicForm.tsx) for the main form component.


## Documentation

- [lib/DynamicForm.tsx](lib/DynamicForm.tsx): Main form component
- [lib/DynamicFormElement.tsx](lib/DynamicFormElement.tsx): Individual form elements
- [lib/DynamicFormFieldSet.tsx](lib/DynamicFormFieldSet.tsx): Field grouping
- [lib/DynamicFormSettings.tsx](lib/DynamicFormSettings.tsx): Form settings
- [lib/DynamicFormTheme.tsx](lib/DynamicFormTheme.tsx): Theming support
- [lib/useDynamicForm.tsx](lib/useDynamicForm.tsx): Form state management hook

## Development

Clone the repo and install dependencies:

```sh
git clone https://github.com/webinex/dynamic-form.git
cd dynamic-form
npm install
```

Run the demo app:

```sh
npm run dev
```

## License

Apache License 2.0
