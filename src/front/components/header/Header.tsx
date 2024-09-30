import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currencyStore } from '../../stores/FromStore';
import "./Header.css";

function Header () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (currencyStore.account) {
      fetch(`http://localhost:5000/getUsername?login=${currencyStore.account}`)
        .then(response => response.json())
        .then(data => setUsername(data.username));
    }
  }, [currencyStore.account]);

  const handleLogout = () => {
    currencyStore.account = '';
    currencyStore.updateItemsWithFavorites();
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
                        <span>{username}</span>
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
