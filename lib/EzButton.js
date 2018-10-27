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
var pick_react_known_prop_1 = require("pick-react-known-prop");
var getClasses = function (use) {
    var defaults = {
        primary: 'ez-btn ez-btn--filled ez-btn--primary ez-submit',
        secondary: 'ez-btn ez-btn--filled'
    };
    if (use === 'bootstrap') {
        defaults.primary = 'btn btn-primary';
        defaults.secondary = 'btn btn-secondary';
    }
    if (use === 'spectre') {
        defaults.primary = 'btn btn-primary';
        defaults.secondary = 'btn btn-secondary';
    }
    return defaults;
};
// interface IProps {
//   type?: string;
//   submit?: any;
//   gap?: number;
//   formik: any; // FormikContext<{}>
//   children?: any;
// }
var EzButton = function (props) {
    var classes = getClasses(props.formik.ezUse);
    var isSubmit = props.submit || props.type === 'submit';
    var type = isSubmit ? 'submit' : 'button';
    var text = props.children ? props.children : isSubmit ? 'Submit' : 'Button';
    var style = {};
    if (props.gap) {
        style.marginLeft = props.gap;
        style.marginRight = props.gap;
    }
    if (props.leftGap) {
        style.marginLeft = props.leftGap;
    }
    if (props.rightGap) {
        style.marginRight = props.rightGap;
    }
    var htmlProps = pick_react_known_prop_1.pickHTMLProps(props);
    return (React.createElement("button", __assign({ type: type, className: "" + (isSubmit ? classes.primary : classes.secondary), style: style }, htmlProps), text));
};
exports["default"] = formik_1.connect(EzButton);
