import * as React from 'react';
import * as Yup from 'yup';
import { DisplayFormState } from '../Utils'
// import { genders } from './Utils'

import FormContainer from '../EzFormContainer'
import Form from '../EzForm';
import Field from '../EzField';
import Button from '../EzButton';

export const genders = [
  { value: '', label: 'N/A'},
  { value: 'MALE', label: 'Male', render: () => <Field>Wife Name | wifeName</Field>},
  { value: 'FEMALE', label: 'Female'}
]

const schema = Yup.object().shape({
})

export default class extends React.Component {

  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 800);
    setSubmitting(true);
  }

  renderForm = (props: any) => {
    const gender = props.values.gender
    return (
      <Form use="spectre">
        <Field>Email | email</Field>
        <Field radios options={genders} onChange={() => this.onGenderChange(props)}>Gender | gender</Field>

        {gender === 'MALE' && <Field>Wife Name | wifeName</Field>}
        {gender === 'FEMALE' && <Field>Husband Name | husbandName</Field>}
  
        <Button type="submit" disabled={props.isSubmitting} />
        <DisplayFormState {...props} />
      </Form>
    )
  }

  onGenderChange = (props: any) => {
    delete props.values.husbandName
    delete props.values.wifeName
  }

  render() {
    return (
      <div>
        <FormContainer
          initialValues={{ email: 'example@email.com', roles: [], gender: '' }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }
}