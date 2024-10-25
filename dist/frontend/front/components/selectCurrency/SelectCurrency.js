"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCurrency = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobx_react_lite_1 = require("mobx-react-lite");
const FromStore_1 = require("../../stores/FromStore");
require("./SelectCurrency.css");
const SelectCurrency = (0, mobx_react_lite_1.observer)(({ onSelect, defaultCode }) => {
    const { items, toggleFavorite } = FromStore_1.currencyStore;
    const [filteredItems, setFilteredItems] = (0, react_1.useState)([]);
    const [selectedItem, setSelectedItem] = (0, react_1.useState)(null);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const containerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleSelect = (0, react_1.useCallback)((code) => {
        const selected = filteredItems.find((item) => item.code === code);
        setSelectedItem(selected || null);
        setIsOpen(false);
        if (onSelect && selected) {
            onSelect(selected);
        }
    }, [filteredItems, onSelect]);
    (0, react_1.useEffect)(() => {
        if (defaultCode && !selectedItem) {
            const selected = items.find((item) => item.code === defaultCode);
            setSelectedItem(selected || null);
        }
    }, [defaultCode, items, selectedItem]);
    (0, react_1.useEffect)(() => {
        if (filteredItems.length && defaultCode && !selectedItem) {
            handleSelect(defaultCode);
        }
    }, [filteredItems, defaultCode, selectedItem, handleSelect]);
    (0, react_1.useEffect)(() => {
        if (!items || !items.length) {
            return;
        }
        if (!searchTerm) {
            setFilteredItems(items);
        }
        else {
            setFilteredItems(items.filter((item) => item.text.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm, items]);
    const handleFavorite = (code) => {
        toggleFavorite(code);
    };
    const handleClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setSearchTerm("");
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "select-container", ref: containerRef, children: [(0, jsx_runtime_1.jsx)("div", { className: "select-currency", onClick: handleClick, children: selectedItem ? (selectedItem.text) : ((0, jsx_runtime_1.jsx)("i", { className: "placeholder-text", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u043B\u044E\u0442\u0443 \u0434\u043B\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438" })) }), isOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "options-currency", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", className: "search-input", placeholder: "\u041F\u043E\u0438\u0441\u043A \u0432\u0430\u043B\u044E\u0442\u044B...", value: searchTerm, onChange: handleSearchChange }), filteredItems.length > 0 ? (filteredItems.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: `option-currency ${selectedItem && selectedItem.code === item.code ? "selected" : ""}`, onClick: () => handleSelect(item.code), children: [(0, jsx_runtime_1.jsx)("span", { children: item.text }), FromStore_1.currencyStore.account && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => {
                                    e.stopPropagation();
                                    handleFavorite(item.code);
                                }, className: item.buttonClass, children: item.isFavorite ? "⭐" : "☆" }))] }, item.code)))) : ((0, jsx_runtime_1.jsx)("div", { className: "no-results", children: (0, jsx_runtime_1.jsx)("span", { className: "no-results-text", children: "\u2A37 \u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" }) }))] }))] }));
});
exports.SelectCurrency = SelectCurrency;
