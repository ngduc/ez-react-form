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
function Checkbox(props) {
    return (React.createElement(formik_1.Field, { name: props.name }, function (_a) {
        var field = _a.field, form = _a.form;
        return (React.createElement("label", null,
            React.createElement("input", __assign({ type: "checkbox" }, props, { checked: field.value && field.value.includes(props.value), onChange: function () {
                    var nextValue;
                    field.value = field.value || [];
                    if (field.value.includes(props.value)) {
                        nextValue = field.value.filter(function (value) { return value !== props.value; });
                        form.setFieldValue(props.name, nextValue);
                    }
                    else {
                        nextValue = field.value.concat(props.value);
                        form.setFieldValue(props.name, nextValue);
                    }
                    props.onChange && props.onChange(nextValue);
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
                    props.onChange && props.onChange(props.value);
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
    if (Utils_1.isOptionArray(props.options)) {
        options = props.options.map(function (opt) { return React.createElement("option", { key: opt.value, value: opt.value }, opt.label); });
    }
    var Label = function () { return React.createElement("label", { htmlFor: fieldName, className: labelClass }, label); };
    var moreProps = {};
    if (props.select) {
        moreProps.component = 'select';
    }
    return (React.createElement("div", { className: classes.group },
        props.checkbox ? (React.createElement(Checkbox, { label: label, name: fieldName, value: props.value, onChange: props.onChange })) : props.radio ? (React.createElement(Radio, { label: label, name: fieldName, value: props.value, onChange: props.onChange })) : (props.radios && props.options) ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement("div", { className: "ez-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Radio, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })))) : (props.checkboxes && props.options) ? (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement("div", { className: "ez-field-full " + (hasErrors ? classes.invalidControl : '') }, props.options.map(function (opt) { return (React.createElement(Checkbox, { key: opt.value, label: opt.label, name: fieldName, value: opt.value, onChange: props.onChange })); })))) : (React.createElement(React.Fragment, null,
            React.createElement(Label, null),
            React.createElement(formik_1.FastField, __assign({ name: fieldName, placeholder: placeholder, onChange: function (val) { props.formik.handleChange(val); props.onChange && props.onChange(val); }, validate: props.validate, className: controlClass + " " + (hasErrors ? classes.invalidControl : '') }, (typeof props.children !== 'string' ? props : {}), moreProps), options))),
        hasErrors && React.createElement("span", { className: errorClass }, errors[fieldName])));
};
exports["default"] = formik_1.connect(EzField);
