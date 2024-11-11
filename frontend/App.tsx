import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Header} from './front/components/header/Header';
import {CurrencyConvert} from './front/pages/currecyConvert/CurrencyConvert';
import {NotFound} from './front/pages/NotFound';
import {Rates} from './front/pages/rates/Rates';
import {Registration} from './front/pages/registry/Registration';
import {Autorisation} from './front/pages/autorisation/Autorisation';
import {Footer} from './front/components/footer/Footer';
import './App.css';


function App() {
    return (
            <Router>
                <div className="page-container">
                    <Header/>
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<CurrencyConvert/>}/>
                            <Route path="/Rates" element={<Rates/>}/>
                            <Route path="/Registration" element={<Registration/>}/>
                            <Route path="/Autorisation" element={<Autorisation/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
    );
}

export default App;
