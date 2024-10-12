"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autorisation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_router_dom_1 = require("react-router-dom");
const FromStore_1 = require("../../stores/FromStore");
require("./Autorisation.css");
const Autorisation = (0, mobx_react_lite_1.observer)(() => {
    const [login, setLogin] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const { error, successMessage, authoriseUser } = FromStore_1.currencyStore;
    const handleSubmit = (e) => {
        e.preventDefault();
        authoriseUser(login, password);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "auth", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [error && (0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error }), successMessage && (0, jsx_runtime_1.jsx)("div", { className: "success-message", children: successMessage }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group-for-auth", children: [(0, jsx_runtime_1.jsx)("label", { children: "\u041B\u043E\u0433\u0438\u043D" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: login, onChange: (e) => setLogin(e.target.value), maxLength: 20, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group-for-auth", children: [(0, jsx_runtime_1.jsx)("label", { children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), maxLength: 38, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button-for-authorization", children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsx)("span", { className: "Home-link", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" }) })] })] }));
});
exports.Autorisation = Autorisation;
