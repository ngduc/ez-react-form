import * as React from 'react';
import { connect, Field, FastField } from 'formik';
import Toggle from 'react-toggle';
import { getChildrenParts, isOptionArray } from './Utils'

const getClasses = (use: string, isHorizontal: boolean) => {
  const defaults = {
    group: '',
    label: 'ez-label',
    control: 'ez-field',
    file: 'ez-field',
    toggle: 'ez-toggle',
    invalidControl: 'ez-field-error',
    error: 'ez-error'
  };
  if (use === 'bootstrap3' || use === 'bootstrap4') {
    defaults.group = 'form-group' + (isHorizontal ? ' row' : '');
    defaults.control = 'form-control';
    defaults.file = 'ez-field ez-bootstrap-file';
    defaults.toggle = 'ez-bootstrap-toggle'; // custom css for bootstrap
    defaults.invalidControl = 'is-invalid';
    defaults.error = 'invalid-feedback';
  }
  if (use === 'spectre') {
    defaults.group = 'form-group';
    defaults.label = 'form-label';
    defaults.control = 'form-input';
    // defaults.toggle = 'ez-spectre-toggle'; // no need yet
    defaults.invalidControl = 'is-error';
    defaults.error = 'form-input-hint';
  }
  if (use === 'semanticui2') {
    defaults.group = isHorizontal ? 'field inline' : 'field';
    defaults.file = 'ez-field ez-semanticui2-file';
    defaults.toggle = 'ez-semanticui2-toggle';
  }
  return defaults;
};

function Checkbox(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value && field.value.includes(props.value)}
            onChange={() => {
              let nextValue
              field.value = field.value || []
              if (field.value.includes(props.value)) {
                nextValue = field.value.filter(
                  (value: any) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
              props.onChange && props.onChange(nextValue);
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
      {({ field, form } : { field: any, form: any }) => {
        return (
          <label>
            <input
              type="radio"
              {...props}
              checked={field.value === props.value}
              onChange={() => {
                form.setFieldValue(props.name, props.value);
                props.onChange && props.onChange(props.value);
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

function EzToggle(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => {
        const formVal = form.values[props.name] // field value form formik.values
        const checked = typeof formVal !== 'undefined' ? formVal : false
        return (
          <Toggle
            icons={false}
            {...props}
            checked={checked}
            onChange={(e: any) => {
              form.setFieldValue(props.name, e.target.checked);
              props.onChange && props.onChange(e.target.checked);
            }}
          />
        )
      }}
    </Field>
  );
}

interface IThumb {
  file: any
}
class Thumb extends React.Component<IThumb> {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps: any) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const file = this.props.file;
    const { loading, thumb } = this.state;

    if (!file) { return null; }

    // if (loading) { return <p>loading...</p>; } // this causes flickering when changing other fields.

    return (<img src={thumb} alt={file.name} className="ez-thumb" />);
  }
}

function FileUpload(props: any) {
  return (
    <Field name={props.name}>
      {({ field, form } : { field: any, form: any }) => {
        return (
          <React.Fragment>
            <input id={props.id || props.name} name={props.name} type="file" className={props.className || ''} onChange={(event) => {
              form.setFieldValue(props.name, event.currentTarget.files[0]);
              props.onChange && props.onChange(event.currentTarget.files[0]);
            }} />
            {props.withPreview && <Thumb file={form.values[props.name]} />}
          </React.Fragment>
        )
      }}
    </Field>
  )
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

  const classes = getClasses(props.formik.ezUse, props.formik.ezHorizontal);
  const css = props.formik.ezCss || {}
  const labelCss = css.label || props.labelCss || ''
  const labelClass = labelCss ? `${classes.label} ${labelCss}` : classes.label

  const controlCss = css.control || props.controlCss || ''
  const controlClass = controlCss ? `${classes.control} ${controlCss}` : classes.control

  const toggleCss = css.toggle || props.toggleCss || ''
  const toggleClass = toggleCss ? `${classes.toggle} ${toggleCss}` : classes.toggle

  const fileCss = css.file || props.fileCss || ''
  const fileClass = fileCss ? `${classes.toggle} ${fileCss}` : classes.file

  const errorCss = css.error || props.errorCss || ''
  const errorClass = errorCss ? `${classes.error} ${errorCss}` : classes.error

  let options = null
  if (isOptionArray(props.options)) {
    options = props.options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)
  }
  const Label = () => <label htmlFor={fieldName} className={labelClass}>
    {label}
  </label>

  const moreProps: any = {}
  if (props.textarea) {
    moreProps.component = 'textarea'
  }
  if (props.select) {
    moreProps.component = 'select'
  }
  if (props.number) {
    moreProps.type = 'number'
  }
  if (props.password) {
    moreProps.type = 'password'
  }
  if (props.date) {
    moreProps.type = 'date'
  }
  if (props.time) {
    moreProps.type = 'time'
  }
  if (props.range) {
    moreProps.type = 'range'
  }
  return (
    <div className={classes.group}>
      {props.toggle ? (
        <React.Fragment>
          <Label />
          <EzToggle name={fieldName} value={props.value} onChange={props.onChange}
            className={props.inline ? `${toggleClass}-inline` : toggleClass} />
        </React.Fragment>
      ) : props.file ? (
        <React.Fragment>
          <Label />
          <FileUpload label={label} name={fieldName} value={props.value} onChange={props.onChange}
            withPreview={props.withPreview} className={`${fileClass} ${hasErrors ? classes.invalidControl : ''}`} />
        </React.Fragment>
      ) : props.checkbox ? (
        <Checkbox label={label} name={fieldName} value={props.value} onChange={props.onChange} />
      ) : props.radio ? (
        <Radio label={label} name={fieldName} value={props.value} onChange={props.onChange} />
      ) : (props.radios && props.options) ? (
        <React.Fragment>
          <Label />
          <div className={`ez-field-full ${hasErrors ? classes.invalidControl : ''}`}>
            {props.options.map((opt: any) => (
              <Radio key={opt.value} label={opt.label} name={fieldName} value={opt.value} onChange={props.onChange} />
            ))}
          </div>
        </React.Fragment>
      ) : (props.checkboxes && props.options) ? (
        <React.Fragment>
          <Label />
          <div className={`ez-field-full ${hasErrors ? classes.invalidControl : ''}`}>
            {props.options.map((opt: any) => (
              <Checkbox key={opt.value} label={opt.label} name={fieldName} value={opt.value} onChange={props.onChange} />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Label />
          <FastField
            name={fieldName}
            placeholder={placeholder}
            onChange={(val: any) => { props.formik.handleChange(val); props.onChange && props.onChange(val); }}
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
