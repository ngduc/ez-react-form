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