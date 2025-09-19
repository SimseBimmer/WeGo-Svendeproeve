import React, { useState } from 'react';
// Importér SCSS i stedet for CSS
import './LoginModal.scss';
import closeImg from '../../assets/images/CloseBtn.svg';

// LoginModal komponent til login og opret konto
export default function LoginModal({ onClose, onLoginSuccess }) {
    // State til at styre om vi viser login eller opret konto
    const [mode, setMode] = useState('login'); // 'login' eller 'createAccount'
    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);
    // Opret konto state
    const [signupFirstname, setSignupFirstname] = useState('');
    const [signupLastname, setSignupLastname] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupLoading, setSignupLoading] = useState(false);

    // Regex til validering af email og password
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^.{6,}$/;

    // Funktion til login
    async function handleLogin(e) {
        e.preventDefault();
        setLoginError('');
        // Simpel validering
        if (!emailRegex.test(loginEmail) || !passwordRegex.test(loginPassword)) {
            setLoginError('Udfyld venligst alle felter korrekt');
            return;
        }
        setLoginLoading(true);
        try {
            // Kald til backend for login
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginEmail, password: loginPassword })
            });
            if (!res.ok) throw new Error('Forkert brugernavn eller adgangskode');
            const data = await res.json();
            // Gem token og bruger i localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify({
                firstname: data.user.firstname,
                lastname: data.user.lastname, 
                email: loginEmail
            }));
            if (onLoginSuccess) onLoginSuccess({ firstname: data.user.firstname, lastname: data.user.lastname, email: loginEmail });
            onClose();
        } catch (err) {
            setLoginError('Forkert brugernavn eller adgangskode');
            console.error(err);
        }
        setLoginLoading(false);
    }

    // Funktion til opret konto
    async function handleSignup(e) {
        e.preventDefault();
        setSignupError('');
        // Simpel validering
        if (
            !signupFirstname ||
            !signupLastname ||
            !emailRegex.test(signupEmail) ||
            !passwordRegex.test(signupPassword)
        ) {
            setSignupError('Udfyld venligst alle felter korrekt');
            return;
        }
        setSignupLoading(true);
        try {
            // Her sendes POST request til backend for at oprette bruger
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname: signupFirstname,
                    lastname: signupLastname,
                    email: signupEmail,
                    password: signupPassword,
                    description: null,
                    imageUrl: "https://img.freepik.com/premium-vector/instagram-profile-icon_772860-1198.jpg",
                    refreshToken: "",
                    isActive: true
                })
            });
            if (!res.ok) throw new Error('Kunne ikke oprette bruger');
            setMode('login');
        } catch (err) {
            setSignupError('Kunne ikke oprette bruger');
            console.error(err);
        }
        setSignupLoading(false);
    }

    // Luk modal hvis baggrund trykkes
    function handleBackdropClick(e) {
        if (e.target.id === 'loginModalBackdrop') {
            onClose();
        }
    }

    // Render modal
    return (
        <div id="loginModalBackdrop" onClick={handleBackdropClick}>
            <div id="loginModalBox">
                {/* Luk-knap */}
                <button id="closeModalBtn" onClick={onClose}>
                    <img src={closeImg} alt="Luk" />
                </button>
                {mode === 'login' ? (
                    <form id="loginForm" onSubmit={handleLogin}>
                        <h2>Log ind</h2>
                        <input
                            type="email"
                            id="loginEmail"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            autoComplete="username"
                        />
                        <input
                            type="password"
                            id="loginPassword"
                            placeholder="Adgangskode"
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        {loginError && <div id="errorMsg">{loginError}</div>}
                        <button type="submit" id="loginBtn" disabled={loginLoading}>
                            {loginLoading ? 'Logger ind...' : 'Log ind'}
                        </button>
                        {/* Skift til opret konto */}
                        <p id="switchToSignup">
                            Har du ikke allerede en konto?{' '}
                            <span
                                id="signupLink"
                                onClick={() => setMode('createAccount')}
                            >
                                opret en <span id="herLink">her</span>
                            </span>
                        </p>
                    </form>
                ) : (
                    <form id="signupForm" onSubmit={handleSignup}>
                        <h2>Opret konto</h2>
                        <input
                            type="text"
                            id="signupFirstname"
                            placeholder="Fornavn"
                            value={signupFirstname}
                            onChange={e => setSignupFirstname(e.target.value)}
                            autoComplete="given-name"
                        />
                        <input
                            type="text"
                            id="signupLastname"
                            placeholder="Efternavn"
                            value={signupLastname}
                            onChange={e => setSignupLastname(e.target.value)}
                            autoComplete="family-name"
                        />
                        <input
                            type="email"
                            id="signupEmail"
                            placeholder="Email"
                            value={signupEmail}
                            onChange={e => setSignupEmail(e.target.value)}
                            autoComplete="username"
                        />
                        <input
                            type="password"
                            id="signupPassword"
                            placeholder="Adgangskode (min. 6 tegn)"
                            value={signupPassword}
                            onChange={e => setSignupPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        {signupError && <div id="errorMsg">{signupError}</div>}
                        <button type="submit" id="signupBtn" disabled={signupLoading}>
                            {signupLoading ? 'Opretter...' : 'Opret konto'}
                        </button>
                        {/* Skift til login */}
                        <p id="switchToLogin">
                            Allerede en konto?{' '}
                            <span
                                id="signupLink"
                                onClick={() => setMode('login')}
                            >
                                log ind <span id="herLink">her</span>
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}