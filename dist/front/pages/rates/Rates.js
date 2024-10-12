"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rates = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mobx_react_lite_1 = require("mobx-react-lite");
const FromStore_1 = require("../../stores/FromStore");
require("./Rates.css");
const Rates = (0, mobx_react_lite_1.observer)(() => {
    const { loading, items, toggleFavorite, } = FromStore_1.currencyStore;
    const handleFavorite = (currencyCode) => {
        toggleFavorite(currencyCode);
    };
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rates-container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "\u041A\u0443\u0440\u0441\u044B \u0432\u0430\u043B\u044E\u0442" }), (0, jsx_runtime_1.jsxs)("table", { className: "rates-table", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u0424\u043B\u0430\u0433" }), (0, jsx_runtime_1.jsx)("th", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043B\u044E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0421\u0438\u043C\u0432\u043E\u043B \u0432\u0430\u043B\u044E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("th", { className: "rate-header", children: "\u041A\u0443\u0440\u0441 \u043A \u0434\u043E\u043B\u043B\u0430\u0440\u0443" }), (0, jsx_runtime_1.jsx)("th", { children: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: items.map((item) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("img", { src: item.code === 'EUR'
                                            ? `${process.env.PUBLIC_URL}/eu.png`
                                            : `https://flagsapi.com/${item.currencyCode}/flat/64.png`, alt: `${item.text} flag`, width: "64", height: "64" }) }), (0, jsx_runtime_1.jsx)("td", { children: item.text }), (0, jsx_runtime_1.jsx)("td", { className: "center-content", children: item.symbol }), (0, jsx_runtime_1.jsx)("td", { className: "center-content", children: item.rate
                                        ? item.rate.toFixed(2)
                                        : 'Loading...' }), (0, jsx_runtime_1.jsx)("td", { className: "center-content", children: FromStore_1.currencyStore.account && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => {
                                            e.stopPropagation();
                                            handleFavorite(item.code);
                                        }, className: item.buttonClass, children: item.isFavorite ? "⭐" : "☆" })) })] }, item.currencyCode))) })] })] }));
});
exports.Rates = Rates;
