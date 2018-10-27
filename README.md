# ez-react-form

[![Build Status](https://travis-ci.org/ngduc/ez-react-form.svg?branch=master)](https://travis-ci.org/ngduc/ez-react-form)

React Easy Form - ez-react-form - your pain ends here.

*"Let it take care of the work so you don't have to"*

- Live example: [Codesandbox](https://codesandbox.io/s/y7vwzp2091)

### 🌟 Features

[![Screenshot](screenshot-compare.png)](src/EzFormExample.tsx)

```
Easy    Flexible    Consistent    Fast    Layouts    Themes    More Types
```

Not just shorter syntax, it's also offering:
- Consistent rendering, stylings (for big projects)
- Layouts (vertical, horizontal)
- Work with different CSS Frameworks / Form Layouts (tentcss (default), bootstrap, spectre, etc.)
- More types of fields.
- Work well with Formik - use FastField to avoid [too many re-renders] (https://twitter.com/jaredpalmer/status/962114095481851910?lang=en)

### 📦 Usage

```JS
$ npm install ez-react-form

import { EzFormContainer, Form, Field, Button } from 'ez-react-form'; // or: EzForm, EzField, EzButton

<EzFormContainer onSubmit={this.onSubmit} render={props => (
  <Form use="bootstrap">
    <Field>Email | email</Field>
    <Field>Birthday | Date of birth (mm/dd/yyyy) | dob</Field>

    <Button type="submit"/>
    <Button>Cancel</Button>
  </Form>
)} />
```
- Full code example: [Link](src/EzFormExample.tsx)
- Live example: [Codesandbox](https://codesandbox.io/s/y7vwzp2091)

Result:

[![Screenshot](screenshot.png)](src/EzFormExample.tsx)

### 📖 Documentation

[Change Log](/CHANGELOG.md)

### 🙌 Thanks

All contributions are welcome!

[formik](https://github.com/jaredpalmer/formik)