import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavComponent.scss';

export default function NavComponent() {
    //#region GAMMEL KODE TIL NAVIGATION
    // const [open, setOpen] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
    // const navigate = useNavigate();

    // // Listen for login status changes
    // useEffect(() => {
    //     function updateStatus() {
    //         setLoggedIn(!!localStorage.getItem('accessToken'));
    //     }
    //     window.addEventListener('loginStatusChanged', updateStatus);
    //     return () => window.removeEventListener('loginStatusChanged', updateStatus);
    // }, []);

    // function handleLogout() {
    //     if (window.confirm('Er du sikker på, at du vil logge ud?')) {
    //         localStorage.removeItem('accessToken');
    //         setLoggedIn(false);
    //         window.dispatchEvent(new Event('loginStatusChanged'));
    //         setOpen(false);
    //         navigate('/');
    //     }
    // }
    //#endregion

    return (
        <nav id='globalNav'>
            <ul>
                <li><NavLink to="/" onClick={() => setOpen(false)}>Find et lift</NavLink></li>
                <li><NavLink to="/produkter" onClick={() => setOpen(false)}>Sådan virker det</NavLink></li>
            </ul>
            <ul>
                <li id='loginBtn'><NavLink to="/login" onClick={() => setOpen(false)}>Log ind</NavLink></li> {/* vis kun hvis user ik er logget ind */}
                <li ><NavLink to="/opret" onClick={() => setOpen(false)}>UserName</NavLink></li> {/* vis kun hvis user er logget ind */}
                <li id='logoutBtn'><NavLink to="/opret" onClick={() => setOpen(false)}>Log ud</NavLink></li> {/* vis kun hvis user er logget ind */}

            </ul>
        </nav>

    );
}

// //#region GAMMEL KODE TIL NAVIGATION
// <div>

//     <nav>
//         {/* Luk-knap */}
//         <button className="nav-close-btn" onClick={() => setOpen(false)}></button>
//         {/* Navigation links */}
//         <ul>
//             <li><NavLink to="/" onClick={() => setOpen(false)}>Find et lift</NavLink></li>
//             <li><NavLink to="/produkter" onClick={() => setOpen(false)}>Sådan virker det</NavLink></li>
//             {loggedIn ? (
//                 <>
//                     <li><NavLink to="/minside" onClick={() => setOpen(false)}>Min side</NavLink></li>
//                     <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>Log ud</button></li>
//                 </>
//             ) : (
//                 <>
//                     <li><NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink></li>
//                     <li><NavLink to="/opret" onClick={() => setOpen(false)}>Opret konto</NavLink></li>
//                 </>
//             )}
//         </ul>
//     </nav>
//     {/* Baggrund der lukker menuen hvis man klikker udenfor */}
//     {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
// </div>
// #endregion