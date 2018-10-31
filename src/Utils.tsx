import * as React from 'react';

export const animals = [
  { value: '', label: 'Select an animal'},
  { value: 'TIGER', label: 'Tiger'},
  { value: 'BEAR', label: 'Bear'}
]
export const genders = [
  { value: '', label: 'N/A'},
  { value: 'MALE', label: 'Male'},
  { value: 'FEMALE', label: 'Female'}
]
export const roles = [
  { value: 'ADMIN', label: 'Admin'},
  { value: 'USER', label: 'User'}
]

export const getChildrenParts = (props: any) => {
  let children = props.children
  const isJSXString = Array.isArray(props.children) && children.join('').indexOf('|') >= 0
  if (isJSXString) {
    // children can be: {role.label} | roles (which is not a string => join it to have a string)
    children = children.join('')
  }

  if ((typeof props.children === 'string' && props.children.indexOf('|') >= 0) || isJSXString) {
    const arr = children.split('|').map((item: string) => item.trim());
    const label = arr[0]
    const fieldName = arr[arr.length - 1];
    const placeholder = arr.length === 3 ? arr[1] : '';
    return { label, placeholder, fieldName }
  }
  const { label, placeholder, name } = props
  return { label, placeholder, fieldName: name }
}

export const DisplayFormState = (props: any) => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem'
      }}
    >
      <strong>values</strong> = {JSON.stringify(props.values, null, 2)}
    </pre>
  </div>
);

// check if variable is an array of options (for select)
export const isOptionArray = (v: any) => {
  if (Array.isArray(v)) {
    for (let i = 0; i < v.length; i += 1) {
      if (!v[i].hasOwnProperty('value')) {
        return false // all array items must have "value"
      }
    }
    return true // Note: empty array => also true
  }
  return false
}