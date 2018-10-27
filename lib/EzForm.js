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
var getClasses = function (use) {
    var defaults = {
        form: ''
    };
    if (use === 'bootstrap') {
    }
    if (use === 'spectre') {
        defaults.form = 'form-horizontal';
    }
    return defaults;
};
var EzForm = function (props) {
    props.formik.ezUse = props.use; // bootstrap, spectre, etc.
    props.formik.ezCss = props.css;
    var classes = getClasses(props.use);
    var className = props.className ? classes.form + " " + props.className : classes.form;
    return React.createElement(formik_1.Form, __assign({}, props, { className: className }));
};
exports["default"] = formik_1.connect(EzForm);
