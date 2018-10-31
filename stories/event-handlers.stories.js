import React from 'react';

import { storiesOf } from '@storybook/react';
import { action, decorateAction } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import '../lib/css/spectre.css';
import '../lib/css/styles.css'; // default Theme
// import { EzFormExample, DynamicFormExample, EventHandlerExample } from '../lib';

import { DisplayFormState, genders, roles } from '../lib/Utils';
import { FormContainer, Form, Field, Button } from '../lib';

const renderForm = props => {
  const gender = props.values.gender;
  return (
    <Form use="spectre">
      <Field onChange={action('email - onChange')}>Email | email</Field>
      <Field radios options={genders} onChange={action('radios - onChange')}>
        Gender | gender
      </Field>
      <Field checkboxes options={roles} onChange={action('checkboxes - onChange')}>
        Role(s) | roles
      </Field>

      {gender === 'MALE' && <Field>Wife Name | wifeName</Field>}
      {gender === 'FEMALE' && <Field>Husband Name | husbandName</Field>}

      <Button type="submit" />
      <DisplayFormState {...props} />
    </Form>
  );
};

storiesOf('Event Handlers', module).add('onChange, onSubmit', () => (
  <FormContainer
    initialValues={{ email: 'example@email.com', roles: [], gender: '' }}
    onSubmit={action('onSubmit')}
    render={renderForm}
  />
));
