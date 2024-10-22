import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currencyStore, accountInLocalStorage } from '../../stores/FromStore';
import { getUsername } from '../../api/CurrencyApi';
import "./Header.css";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function load() {
      if (currencyStore.account) {
        const result = await getUsername(currencyStore.account);
        if (result.success && result.data) {
          setUsername(result.data.username);
        } else {
          setUsername(''); 
        }
      }
    }
    
    load();
  }, [currencyStore.account]);

  const handleLogout = () => {
    currencyStore.account = '';
    localStorage.removeItem(accountInLocalStorage);
    currencyStore.updateItemsWithFavorites();
    setUsername('');
  };

  return (
    <div>
      <nav className="header-nav">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Converters
          </Link>
          <ul id="nav-mobile" className="right">
            <li
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="dropdown-trigger"
            >
              🚹
              {dropdownOpen && (
                <ul className="dropdown-content">
                  {currencyStore.account ? (
                    <>
                      <li>
                        <span>{username || 'Пользователь'}</span>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Выйти</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/Autorisation">Авторизация</Link>
                      </li>
                      <li>
                        <Link to="/Registration">Регистрация</Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
            <li>
              <Link to="/">Конвертировать</Link>
            </li>
            <li>
              <Link to="/rates">Курсы</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export { Header };
