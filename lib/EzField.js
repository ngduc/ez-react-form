"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var formik_1 = require("formik");
var Utils_1 = require("./Utils");
var getClasses = function (use) {
    var defaults = {
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
var isOptionArray = function (v) {
    if (Array.isArray(v)) {
        for (var i = 0; i < v.length; i += 1) {
            if (!v[i].hasOwnProperty('value')) {
                return false; // all array items must have "value"
            }
        }
        return true; // Note: empty array => true
    }
};
function Checkbox(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement("label", null,
            React.createElement("input", __assign({ type: "checkbox" }, props, { checked: field.value.includes(props.value), onChange: function () {
                    if (field.value.includes(props.value)) {
                        var nextValue = field.value.filter(function (value) { return value !== props.value; });
                        form.setFieldValue(props.name, nextValue);
                    }
                    else {
                        var nextValue = field.value.concat(props.value);
                        form.setFieldValue(props.name, nextValue);
                    }
                } })),
            "\u00A0",
            props.label));
    }));
}
function Radio(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement("label", null,
            React.createElement("input", __assign({ type: "radio" }, props, { checked: field.value === props.value, onChange: function () {
                    form.setFieldValue(props.name, props.value);
                } })),
            "\u00A0",
            props.label));
    }));
}
var EzField = function (props) {
    if (!props.children) {
        throw 'EzField is being used incorrectly: missing props.children';
        return null;
    }
    var _a = Utils_1.getChildrenParts(props), label = _a.label, placeholder = _a.placeholder, fieldName = _a.fieldName;
    var errors = props.formik.errors;
    var hasErrors = props.formik.errors.hasOwnProperty(fieldName) &&
        (props.formik.touched.hasOwnProperty(fieldName) || props.formik.submitCount > 0);
    var classes = getClasses(props.formik.ezUse);
    var css = props.formik.ezCss || {};
    var labelCss = css.label || props.labelCss || '';
    var labelClass = labelCss ? classes.label + " " + labelCss : classes.label;
    var controlCss = css.control || props.controlCss || '';
    var controlClass = controlCss ? classes.control + " " + controlCss : classes.control;
    var errorCss = css.error || props.errorCss || '';
    var errorClass = errorCss ? classes.error + " " + errorCss : classes.error;
    var options = null;
    if (isOptionArray(props.options)) {
        options = props.options.map(function (opt) { return React.createElement("option", { key: opt.value, value: opt.value }, opt.label); });
    }
    var moreProps = {};
    if (props.select) {
        moreProps.component = 'select';
    }
    return (React.createElement("div", { className: classes.group },
        props.checkbox ? (React.createElement(Checkbox, { label: label, name: fieldName, value: props.value })) : props.radio ? (React.createElement(Radio, { label: label, name: fieldName, value: props.value })) : (React.createElement(React.Fragment, null,
            React.createElement("label", { htmlFor: fieldName, className: labelClass }, label),
            React.createElement(formik_1.FastField, __assign({ name: fieldName, placeholder: placeholder, onChange: props.formik.handleChange, validate: props.validate, className: controlClass + " " + (hasErrors ? classes.invalidControl : '') }, (typeof props.children !== 'string' ? props : {}), moreProps), options))),
        hasErrors && React.createElement("span", { className: errorClass }, errors[fieldName])));
};
exports["default"] = formik_1.connect(EzField);
