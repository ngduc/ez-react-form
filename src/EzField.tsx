import * as React from 'react';
import { connect, Field, FastField } from 'formik';
import { getChildrenParts } from './Utils'

const getClasses = (use: string) => {
  const defaults = {
    group: '',
    label: 'ez-label',
    control: 'ez-field',
    invalidControl: 'ez-field-error',
    error: 'ez-error'
  };
  if (use === 'bootstrap') {
    defaults.group = 'form-group';
    defaults.control = 'form-control';
    defaults.invalidControl = 'is-invalid';
    defaults.error = 'invalid-feedback';
  }
  if (use === 'spectre') {
    defaults.group = 'form-group';
    defaults.label = 'form-label';
    defaults.control = 'form-input';
    defaults.invalidControl = 'is-error';
    defaults.error = 'form-input-hint';
  }
  return defaults;
};

// check if array of options (select)
const isOptionArray = (v) => {
  if (Array.isArray(v)) {
    for (let i = 0; i < v.length; i += 1) {
      if (!v[i].hasOwnProperty('value')) {
        return false // all array items must have "value"
      }
    }
    return true // Note: empty array => true
  }
}

function Checkbox(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value: any) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          &nbsp;
          {props.label}
        </label>
      )}
    </Field>
  );
}

function Radio(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form }) => {
        return (
          <label>
            <input
              type="radio"
              {...props}
              checked={field.value === props.value}
              onChange={() => {
                form.setFieldValue(props.name, props.value);
              }}
            />
            &nbsp;
            {props.label}
          </label>
        )
      }}
    </Field>
  );
}

const EzField = (props: any) => {
  if (!props.children) {
    throw 'EzField is being used incorrectly: missing props.children';
    return null;
  }
  const { label, placeholder, fieldName } = getChildrenParts(props)

  const errors = props.formik.errors;
  const hasErrors =
    props.formik.errors.hasOwnProperty(fieldName) &&
    (props.formik.touched.hasOwnProperty(fieldName) || props.formik.submitCount > 0);

  const classes = getClasses(props.formik.ezUse);
  const css = props.formik.ezCss || {}
  const labelCss = css.label || props.labelCss || ''
  const labelClass = labelCss ? `${classes.label} ${labelCss}` : classes.label

  const controlCss = css.control || props.controlCss || ''
  const controlClass = controlCss ? `${classes.control} ${controlCss}` : classes.control

  const errorCss = css.error || props.errorCss || ''
  const errorClass = errorCss ? `${classes.error} ${errorCss}` : classes.error

  let options = null
  if (isOptionArray(props.options)) {
    options = props.options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)
  }

  const moreProps: any = {}
  if (props.select) {
    moreProps.component = 'select'
  }
  return (
    <div className={classes.group}>
      {props.checkbox ? (
        <Checkbox label={label} name={fieldName} value={props.value} />
      ) : props.radio ? (
        <Radio label={label} name={fieldName} value={props.value} />
      ) : (
        <React.Fragment>
          <label htmlFor={fieldName} className={labelClass}>
            {label}
          </label>
          <FastField
            name={fieldName}
            placeholder={placeholder}
            onChange={props.formik.handleChange}
            validate={props.validate}
            className={`${controlClass} ${hasErrors ? classes.invalidControl : ''}`}
            {...(typeof props.children !== 'string' ? props : {})}
            {...moreProps}
          >{options}</FastField>
        </React.Fragment>
      )}
      {hasErrors && <span className={errorClass}>{errors[fieldName]}</span>}
    </div>
  );
};
export default connect(EzField);
