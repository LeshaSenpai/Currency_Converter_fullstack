"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const FromStore_1 = require("../../stores/FromStore");
require("./Header.css");
function Header() {
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [username, setUsername] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (FromStore_1.currencyStore.account) {
            fetch(`http://localhost:5000/getUsername?login=${FromStore_1.currencyStore.account}`)
                .then(response => response.json())
                .then(data => setUsername(data.username));
        }
    }, [FromStore_1.currencyStore.account]);
    const handleLogout = () => {
        FromStore_1.currencyStore.account = '';
        FromStore_1.currencyStore.updateItemsWithFavorites();
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("nav", { className: "header-nav", children: (0, jsx_runtime_1.jsxs)("div", { className: "nav-wrapper", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "brand-logo", children: "Converters" }), (0, jsx_runtime_1.jsxs)("ul", { id: "nav-mobile", className: "right", children: [(0, jsx_runtime_1.jsxs)("li", { onMouseEnter: () => setDropdownOpen(true), onMouseLeave: () => setDropdownOpen(false), onClick: () => setDropdownOpen(!dropdownOpen), className: "dropdown-trigger", children: ["\uD83D\uDEB9", dropdownOpen && ((0, jsx_runtime_1.jsx)("ul", { className: "dropdown-content", children: FromStore_1.currencyStore.account ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("span", { children: username }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, children: "\u0412\u044B\u0439\u0442\u0438" }) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/Autorisation", children: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/Registration", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }) })] })) }))] }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/rates", children: "\u041A\u0443\u0440\u0441\u044B" }) })] })] }) }) }));
}
