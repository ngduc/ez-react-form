"use strict";
exports.__esModule = true;
var React = require("react");
exports["default"] = (function (props) { return (React.createElement("div", { style: { margin: '1rem 0' } },
    React.createElement("h3", { style: { fontFamily: 'monospace' } }),
    React.createElement("pre", { style: {
            background: '#f6f8fa',
            fontSize: '.65rem',
            padding: '.5rem'
        } },
        React.createElement("strong", null, "values"),
        " = ",
        JSON.stringify(props.values, null, 2)))); });
