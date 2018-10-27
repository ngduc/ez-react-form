import * as React from 'react';
import * as Yup from 'yup';
import DisplayFormState from './DisplayFormState';

import FormContainer from './EzFormContainer'
import Form from './EzForm';
import Field from './EzField';
import Button from './EzButton';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required!'),
  dob: Yup.string().required('Birthday is required!')
});

const animals = [
  { value: '', label: 'Select an animal'},
  { value: 'TIGER', label: 'Tiger'},
  { value: 'BEAR', label: 'Bear'}
]
const genders = [
  { value: '', label: 'N/A'},
  { value: 'MALE', label: 'Male'},
  { value: 'FEMALE', label: 'Female'}
]
const roles = [
  { value: 'ADMIN', label: 'Admin'},
  { value: 'USER', label: 'User'}
]

export default class extends React.Component {
  state: any = {};

  onSubmit = (values: any, { setSubmitting }: any) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 800);
    setSubmitting(true);
  }

  renderForm = (props: any) => (
    <Form use="spectre">
      <Field>Email | email</Field>
      <Field>Birthday | Date of birth (mm/dd/yyyy) | dob</Field>

      <label>Gender:</label>
      {genders.map(gender => <Field radio value={gender.value}>{gender.label} | gender</Field>)}

      <Field select options={animals}>Favorite Animal | animal</Field>
      
      <label>Roles:</label>
      {roles.map(role => <Field checkbox value={role.value}>{role.label} | roles</Field>)}

      <Button type="submit" disabled={props.isSubmitting} />
      <Button gap={10} disabled>Cancel</Button>

      <DisplayFormState {...props} />
    </Form>
  )

  renderHorizontalForm = (props: any) => {
    const css = {
      label: 'col-3 col-sm-12',
      control: 'col-9 col-sm-12',
      error: 'left25pct'
    }
    return (
      <Form use="spectre" css={css}>
        <Field>Email | email</Field>
        <Field>Birthday | Date of birth (mm/dd/yyyy) | dob</Field>

        <Button leftGap={'25%'} type="submit" disabled={props.isSubmitting} />
        <Button gap={10} disabled>Cancel</Button>

        <DisplayFormState {...props} />
      </Form>
    )
  }

  render() {
    return (
      <div>
        <FormContainer
          initialValues={{ email: 'example@email.com', roles: ['USER'], gender: '' }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />

        <hr />
        <h3>Horizontal Form</h3>
        <FormContainer
          initialValues={{}}
          validationSchema={schema}
          onSubmit={this.onSubmit}
          render={this.renderHorizontalForm}
        />
      </div>
    );
  }
}
