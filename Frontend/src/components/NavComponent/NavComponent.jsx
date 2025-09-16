import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavComponent.scss';
import LoginModal from '../Auth/LoginModal';
import ModalContainer from '../ModalContainer/ModalContainer';
import MinSideModal from '../MinSideModal/MinSideModal';
import HowItWorksModal from '../HowItWorksModal/HowItWorksModal';

export default function NavComponent() {
    // State til at styre om login modal vises
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showHowModal, setShowHowModal] = useState(false); // "Sådan virker det" modal
    const [showMinSideModal, setShowMinSideModal] = useState(false); // Min side modal
    const [user, setUser] = useState(null);

    // Hent bruger fra localStorage hvis logget ind
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    // Log ud funktion
    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload(); // reload for at opdatere nav
    }

    return (
        <>
            <nav id='globalNav'>
                <ul>
                    <li>
                        <NavLink to="/FindLift">Find et lift</NavLink>
                    </li>
                    <li id='howItWorksBtn'>
                        {/* Åbner "Sådan virker det" modal */}
                        <button
                            onClick={() => setShowHowModal(true)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                        >
                            Sådan virker det
                        </button>
                    </li>
                    {user && (
                        <li id='minSideBtn'>
                            {/* Åbner Min side modal */}
                            <button
                                onClick={() => setShowMinSideModal(true)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                            >
                                Min side
                            </button>
                        </li>
                    )}
                </ul>
                <ul>
                    {!user && (
                        <li id='loginBtn'>
                            <button onClick={() => setShowLoginModal(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                                Log ind
                            </button>
                        </li>
                    )}
                    {user && (
                        <>
                            <li id='userName'>
                                {/* Viser brugerens navn */}
                                {user.firstname} {user.lastname}
                            </li>
                            <li id='logoutBtn'>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                                    Log ud
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {/* Login modal vises hvis showLoginModal er true */}
            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)} onLoginSuccess={userObj => setUser(userObj)} />
            )}
            {/* "Sådan virker det" modal */}
            {showHowModal && (
                <HowItWorksModal onClose={() => setShowHowModal(false)} />
            )}
            {/* Min side modal */}
            {showMinSideModal && (
                <MinSideModal onClose={() => setShowMinSideModal(false)} />
            )}
        </>
    );
}