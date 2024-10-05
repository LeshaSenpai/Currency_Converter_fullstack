"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyConvert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobx_react_lite_1 = require("mobx-react-lite");
const SelectCurrency_1 = require("../../components/selectCurrency/SelectCurrency");
const FromStore_1 = require("../../stores/FromStore");
require("./CurrencyConvert.css");
const CurrencyConvert = (0, mobx_react_lite_1.observer)(() => {
    const { rates } = FromStore_1.currencyStore;
    const [fromValue, setFromValue] = (0, react_1.useState)("");
    const [toValue, setToValue] = (0, react_1.useState)("");
    const [fromCurrency, setFromCurrency] = (0, react_1.useState)(null);
    const [toCurrency, setToCurrency] = (0, react_1.useState)(null);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)("");
    const [lastInputField, setLastInputField] = (0, react_1.useState)("from");
    const handleConvert = () => {
        setErrorMessage("");
        let value = lastInputField === "from" ? fromValue : toValue;
        if (value === "") {
            value = "1";
            if (lastInputField === "from") {
                setFromValue(value);
            }
            else {
                setToValue(value);
            }
        }
        if (value.endsWith(".")) {
            setErrorMessage("Ошибка ввода, после точки ожидаются символы");
            return;
        }
        if (rates) {
            try {
                const FactorCurrencyFrom = rates[fromCurrency ? fromCurrency.code : "BYN"];
                const FactorCurrencyTo = rates[toCurrency ? toCurrency.code : "USD"];
                let result;
                if (lastInputField === "from") {
                    result = ((parseFloat(value) / FactorCurrencyFrom) * FactorCurrencyTo).toFixed(2);
                    setToValue(result);
                }
                else {
                    result = ((parseFloat(value) / FactorCurrencyTo) * FactorCurrencyFrom).toFixed(2);
                    setFromValue(result);
                }
            }
            catch (error) {
                setErrorMessage("Ошибка при конвертации валют, попробуйте снова");
            }
        }
    };
    const handleInputChange = (e, isFromField) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            if (isFromField) {
                setFromValue(value);
                setLastInputField("from");
            }
            else {
                setToValue(value);
                setLastInputField("to");
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "table-wrapper", children: (0, jsx_runtime_1.jsx)("table", { className: "currency-table", children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(SelectCurrency_1.SelectCurrency, { defaultCode: fromCurrency ? fromCurrency.code : "BYN", onSelect: setFromCurrency }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(SelectCurrency_1.SelectCurrency, { defaultCode: toCurrency ? toCurrency.code : "USD", onSelect: setToCurrency }) })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "currency-input", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", value: fromValue, onChange: (e) => handleInputChange(e, true) }) }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", className: "currency-input", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", value: toValue, onChange: (e) => handleInputChange(e, false) }), (0, jsx_runtime_1.jsx)("span", { className: "Error-message", children: errorMessage })] })] }), (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 2, children: (0, jsx_runtime_1.jsx)("button", { className: "CurrencyButton", onClick: handleConvert, children: "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }) }) })] }) }) }));
});
exports.CurrencyConvert = CurrencyConvert;
