import * as React from 'react';
import * as Yup from 'yup';
import { DisplayFormState } from '../Utils'
import { log, animals, roles, genders } from '../Utils'

import FormContainer from '../EzFormContainer'
import Form from '../EzForm';
import Field from '../EzField';
import Button from '../EzButton';

const schema = Yup.object().shape({
})

export default class extends React.Component {

  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      log('onSubmit')(values);
    }, 800);
    setSubmitting(true);
  }

  renderForm = (props: any) => {
    return (
      <Form use="spectre">
        <Field>Text Field | text</Field>
        <Field password>Password | password</Field>
        <Field textarea>Textarea | textarea</Field>
        <Field select options={animals}>Select | select</Field>
        <Field radios options={genders}>Radios | radio</Field>
        <Field checkboxes options={roles}>Checkboxes | checkboxes</Field>
        <Field number>Number | number</Field>
        <Field date>Date | date</Field>
        <Field file>File Upload | file</Field>

        <Button type="submit" />
        <Button gap={10}>Button</Button>
        <DisplayFormState {...props} />
      </Form>
    )
  }

  render() {
    return (
      <div>
        <strong>Examples: All Field Types</strong>
        <FormContainer
          initialValues={{ password: 'password', number: 3.14 }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}