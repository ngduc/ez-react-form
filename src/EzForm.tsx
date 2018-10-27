import * as React from 'react';
import { connect, Form } from 'formik';

const getClasses = (use: string) => {
  const defaults = {
    form: ''
  };
  if (use === 'bootstrap') {
  }
  if (use === 'spectre') {
    defaults.form = 'form-horizontal'
  }
  return defaults;
};

const EzForm = (props: any) => {
  props.formik.ezUse = props.use; // bootstrap, spectre, etc.
  props.formik.ezCss = props.css;

  const classes = getClasses(props.use);
  const className = props.className ? `${classes.form} ${props.className}` : classes.form
  return <Form {...props} className={className} />;
};
export default connect(EzForm);
