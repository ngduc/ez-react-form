"use strict";
exports.__esModule = true;
exports.getChildrenParts = function (props) {
    var children = props.children;
    var isJSXString = Array.isArray(props.children) && children.join('').indexOf('|') >= 0;
    if (isJSXString) {
        // children can be: {role.label} | roles (which is not a string => join it to have a string)
        children = children.join('');
    }
    if ((typeof props.children === 'string' && props.children.indexOf('|') >= 0) || isJSXString) {
        var arr = children.split('|').map(function (item) { return item.trim(); });
        var label_1 = arr[0];
        var fieldName = arr[arr.length - 1];
        var placeholder_1 = arr.length === 3 ? arr[1] : '';
        return { label: label_1, placeholder: placeholder_1, fieldName: fieldName };
    }
    var label = props.label, placeholder = props.placeholder, name = props.name;
    return { label: label, placeholder: placeholder, fieldName: name };
};
