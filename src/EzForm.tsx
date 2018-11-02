import * as React from 'react';
import { connect, Form } from 'formik';
import { clone } from './Utils';

const getClasses = (use: string) => {
  const defaults = {
    form: '',
    label: '',
    control: '',
    error: 'left25pct'
  };
  if (use === 'bootstrap3' || use === 'bootstrap4') {
    defaults.label = 'col-sm-3'
    defaults.control = 'col-sm-9'
  }
  if (use === 'spectre') {
    defaults.form = 'form-horizontal'
    defaults.label = 'col-3 col-sm-12'
    defaults.control = 'col-9 col-sm-12'
  }
  return defaults;
};

const EzForm = (props: any) => {
  const classes = getClasses(props.use);

  props.formik.ezUse = props.use; // bootstrap, spectre, etc.
  props.formik.ezHorizontal = typeof props.horizontal !== 'undefined';
  
  const customCss = clone(props.css);
  if (props.formik.ezHorizontal) {
    customCss.form = customCss.form || classes.form
    customCss.label = customCss.label || classes.label
    customCss.control = customCss.control || classes.control
  }
  props.formik.ezCss = customCss;
  
  const className = props.className ? `${classes.form} ${props.className}` : classes.form
  return <Form {...props} className={className} />;
};
export default connect(EzForm);
