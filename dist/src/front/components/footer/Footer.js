"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Footer.css");
function Footer() {
    return ((0, jsx_runtime_1.jsx)("footer", { className: "page-footer", children: (0, jsx_runtime_1.jsxs)("div", { className: "footer-content", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u00A9 ", new Date().getFullYear(), " Convertes. Not all rights reserved."] }), (0, jsx_runtime_1.jsx)("a", { href: "https://github.com/LeshaSenpai", className: "footer-link", children: "GitHub Link" })] }) }));
}
