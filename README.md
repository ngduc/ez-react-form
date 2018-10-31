# ez-react-form

[![Build Status](https://travis-ci.org/ngduc/ez-react-form.svg?branch=master)](https://travis-ci.org/ngduc/ez-react-form)

Easy React Form - ez-react-form

- Live Demo: [Codesandbox](https://codesandbox.io/s/l5vxk5o7vq)

### 🌟 Features

[![Screenshot](screenshot-compare.png)](src/EzFormExample.tsx)

- Shorthand syntax `<Field>Label | Placeholder | name</Field>` (yes, child is a string for convenience, props work too but it's up to you) generates more code for you. (inspired by [Styled Component](https://github.com/styled-components/styled-components) literal string for CSS)

Not just shorter syntax, it's also offering:
- Describe Forms naturally.
- Consistent rendering, stylings (good for big projects).
- Layouts (vertical, horizontal).
- Work with different CSS Frameworks / Form Layouts (tentcss (default), bootstrap, spectre, etc.)
- More types of fields.
- Work well together with Formik - use FastField to avoid [too many re-renders](https://twitter.com/jaredpalmer/status/962114095481851910?lang=en)

### 📦 Usage

```JS
$ npm install ez-react-form
import { FormContainer, Form, Field, Button } from 'ez-react-form';

<FormContainer onSubmit={this.onSubmit} render={props => (
  <Form use="bootstrap">
    <Field>Email | Enter your email | email</Field>
    <Field radios options={genders}>Gender | gender</Field>
    <Field select options={animals}>Favorite Animal | animal</Field>

    <Button type="submit"/>
    <Button>Cancel</Button>
  </Form>
)} />
```
- To avoid conflicts, you can also use `import { EzFormContainer, EzForm, EzField, EzButton }`
- Full code example: [Link](src/EzFormExample.tsx)
- Live example: [Codesandbox](https://codesandbox.io/s/l5vxk5o7vq)

Result:

[![Screenshot](screenshot.png)](src/EzFormExample.tsx)

### 📖 Documentation

[Change Log](/CHANGELOG.md)

### 🙌 Thanks

All contributions are welcome!

[formik](https://github.com/jaredpalmer/formik)