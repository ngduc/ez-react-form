# ez-react-form

[![Build Status](https://travis-ci.org/ngduc/ez-react-form.svg?branch=master)](https://travis-ci.org/ngduc/ez-react-form)

A simple way to work with Forms in React.

- Live Demo: [Codesandbox](https://codesandbox.io/s/l5vxk5o7vq)
- Code examples: [Link](../src/examples)

### 🌟 Features

```JS
$ npm install ez-react-form
import { FormContainer, Form, Field, Button } from 'ez-react-form';

<FormContainer onSubmit={this.onSubmit} render={props => (
  <Form use="bootstrap4">
    <Field>Text Field | text</Field>
    <Field password>Password | password</Field>
    <Field textarea>Textarea | textarea</Field>
    <Field select options={animals}>Select | select</Field>
    <Field radios options={genders}>Radios | radio</Field>
    <Field checkboxes options={roles}>Checkboxes | checkboxes</Field>
    <Field number>Number | number</Field>
    <Field date>Date | date</Field>
    <Field time>Time | time</Field>
    <Field toggle inline>Toggle | toggle</Field>
    <Field file>File Upload | file1</Field>
    <Field file withPreview>File Upload (with Preview) | file2</Field>
    <Field range>Range | range</Field>

    <Button type="submit"/>
    <Button>Cancel</Button>
  </Form>
)} />
```

Result: (Full form, validation (with yup) & error messages)

[![Screenshot](screenshot-types.png)](https://codesandbox.io/s/l5vxk5o7vq)

- Shorthand syntax `<Field>Label | Placeholder | name</Field>` (yes, child is a string for convenience, props work too if you prefer that). Inspired by [Styled Component](https://github.com/styled-components/styled-components) literal string for CSS.
- Render different `form layouts`: Bootstrap 4, Semantic UI, Spectre and more.
- Compatible with `formik`. This is built on top of formik and can be used together with it (for custom fields, etc.)

### 📖 Documentation

[Change Log](/CHANGELOG.md)

#### TODO:
- Support more form layouts: Material, etc.
- More field types: Date Range, etc.
- (File a PR to request any feature, field type, etc.)

### 🙌 Thanks

All contributions are welcome!

[formik](https://github.com/jaredpalmer/formik)