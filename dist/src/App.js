"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Header_1 = require("./front/components/header/Header");
const CurrencyConvert_1 = require("./front/pages/currecyConvert/CurrencyConvert");
const NotFound_1 = require("./front/pages/NotFound");
const Rates_1 = require("./front/pages/rates/Rates");
const Registration_1 = require("./front/pages/registry/Registration");
const Autorisation_1 = require("./front/pages/autorisation/Autorisation");
const Footer_1 = require("./front/components/footer/Footer");
require("./App.css");
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "page-container", children: [(0, jsx_runtime_1.jsx)(Header_1.Header, {}), (0, jsx_runtime_1.jsx)("main", { className: "content", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(CurrencyConvert_1.CurrencyConvert, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Rates", element: (0, jsx_runtime_1.jsx)(Rates_1.Rates, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Registration", element: (0, jsx_runtime_1.jsx)(Registration_1.Registration, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/Autorisation", element: (0, jsx_runtime_1.jsx)(Autorisation_1.Autorisation, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(NotFound_1.NotFound, {}) })] }) }), (0, jsx_runtime_1.jsx)(Footer_1.Footer, {})] }) }));
}
exports.default = App;
