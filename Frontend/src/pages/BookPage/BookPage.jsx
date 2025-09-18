import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookPage.scss';
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';

// BookPage - book et lift
export default function BookPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State til form og trip
    const [trip, setTrip] = useState(null);
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isBooked, setIsBooked] = useState(false); // viser om turen er booket

    // Hent trip data
    useEffect(() => {
        fetch(`/api/trips/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(setTrip)
            .catch(() => setTrip(null));
    }, [id]);

    // Valider form felter
    function validateForm() {
        const err = {};
        if (!seats) err.seats = 'Vælg antal pladser';
        if (!message.trim()) err.message = 'Skriv besked';
        if (!/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, ''))) err.cardNumber = '16 cifre';
        if (!/^(0[1-9]|1[0-2]) ?\/ ?\d{2}$/.test(expiry)) err.expiry = 'MM/ÅÅ';
        if (!/^[0-9]{3}$/.test(cvc)) err.cvc = '3 cifre';
        setErrors(err);
        return Object.keys(err).length === 0;
    }

    // Send booking til backend
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitError('');
        if (!validateForm()) return;
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setSubmitError('Du skal være logget ind');
            return;
        }
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tripId: Number(id),
                comment: message,
                numSeats: Number(seats)
            })
        });
        if (!res.ok) {
            setSubmitError('Kunne ikke booke');
            return;
        }
        setIsBooked(true); // sæt booked til true
        setTimeout(() => {
            navigate('/FindLift');
        }, 2000); // redirect efter 2 sek
    }

    // Tilbage knap
    function handleBack() {
        navigate(`/LiftDetails/${id}`);
    }

    // Formatér dato og tid
    function formatDate(d) {
        return d ? new Date(d).toLocaleDateString('da-DK', { weekday: 'long', day: '2-digit', month: 'long' }) : '';
    }
    function formatTime(d) {
        return d ? new Date(d).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }) : '';
    }

    // Udregn pris
    function getTotalPrice() {
        return trip ? Number(trip.pricePerSeat) * seats : 0;
    }

    if (!trip) return <div>Indlæser...</div>;

    if (isBooked) {
        return (
            <main>
                <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '2rem', color: '#00A6DB' }}>
                    Turen er booket!
                </div>
            </main>
        );
    }

    return (
        <>
            <main>
                <div id='contentWrapper'>
                    <div id='formContainer'>
                        <header><h2>Book et lift</h2></header>
                        <form id="bookForm" onSubmit={handleSubmit}>
                            <div id='formGroup'>
                                <label htmlFor="seatsSelect">Pladser</label>
                                <select id="seatsSelect" value={seats} onChange={e => setSeats(Number(e.target.value))}>
                                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                {errors.seats && <p style={{ color: 'red' }}>{errors.seats}</p>}
                            </div>
                            <div id='formGroup'>
                                <label htmlFor="messageTextarea">Besked til {trip.user?.firstname || 'chauffør'}</label>
                                <textarea id="messageTextarea" value={message} onChange={e => setMessage(e.target.value)} />
                                {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                            </div>
                            <div id='formGroup'>
                                <label htmlFor="cardNumberInput">Kortnummer</label>
                                <input id="cardNumberInput" type="text" placeholder="1234 1234 1234 1234" value={cardNumber} onChange={e => setCardNumber(e.target.value)} autoComplete="off" />
                                {errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
                            </div>
                            <div id='formRow'>
                                <div id='formGroup'>
                                    <label htmlFor="expiryInput">Udløbsdato</label>
                                    <input id="expiryInput" type="text" placeholder="MM / ÅÅ" value={expiry} onChange={e => setExpiry(e.target.value)} autoComplete="off" />
                                    {errors.expiry && <p style={{ color: 'red' }}>{errors.expiry}</p>}
                                </div>
                                <div id='formGroup'>
                                    <label htmlFor="cvcInput">CVC-kode</label>
                                    <input id="cvcInput" type="text" placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} autoComplete="off" />
                                    {errors.cvc && <p style={{ color: 'red' }}>{errors.cvc}</p>}
                                </div>
                            </div>
                            <div id='buttonRow'>
                                {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                                <button type="submit" id="bookPayBtn">Book & betal</button>
                                <button type="button" id="backBtn" onClick={handleBack}>Tilbage</button>
                            </div>
                        </form>
                    </div>
                    <aside id='tripDetails'>
                        <div id='tripInfo'>
                            <h3>{trip.cityDeparture} - {trip.cityDestination}</h3>
                            <p>{formatDate(trip.departureDate)} kl {formatTime(trip.departureDate)}</p>
                            <p>{seats} sæde{seats > 1 ? 'r' : ''}</p>
                        </div>
                        <div id='price'>
                            <p>Samlet pris</p>
                            <p>DKK {getTotalPrice()}</p>
                        </div>
                    </aside>
                </div>
            </main>
            <FooterComponent />
        </>
    );
}
//#region
// <main id="bookPageMain">
//     <form id="bookForm" onSubmit={handleSubmit}>
//         <h2>Book et lift</h2>
//         <label htmlFor="seatsSelect">Pladser</label>
//         <select
//             id="seatsSelect"
//             value={seats}
//             onChange={e => setSeats(Number(e.target.value))}
//         >
//             {[1,2,3,4,5,6].map(n => (
//                 <option key={n} value={n}>{n}</option>
//             ))}
//         </select>

//         <label htmlFor="messageTextarea">Besked til {trip.user?.firstname || 'chauffør'}</label>
//         <textarea
//             id="messageTextarea"
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//         />

//         <label htmlFor="cardNumberInput">Kortnummer</label>
//         <input
//             id="cardNumberInput"
//             type="text"
//             placeholder="1234 1234 1234 1234"
//             value={cardNumber}
//             onChange={e => setCardNumber(e.target.value)}
//         />

//         <div id="cardDetailsRow" style={{ display: 'flex', gap: '1rem' }}>
//             <div style={{ flex: 1 }}>
//                 <label htmlFor="expiryInput">Udløbsdato</label>
//                 <input
//                     id="expiryInput"
//                     type="text"
//                     placeholder="MM / ÅÅ"
//                     value={expiry}
//                     onChange={e => setExpiry(e.target.value)}
//                 />
//             </div>
//             <div style={{ flex: 1 }}>
//                 <label htmlFor="cvcInput">CVC-kode</label>
//                 <input
//                     id="cvcInput"
//                     type="text"
//                     placeholder="CVC"
//                     value={cvc}
//                     onChange={e => setCvc(e.target.value)}
//                 />
//             </div>
//         </div>

//         <button type="submit" id="bookPayBtn">Book & betal</button>
//         <button type="button" id="backBtn" onClick={handleBack}>Tilbage</button>
//     </form>

//     <section id="tripDetails">
//         <ul>
//             <li id="routeDetail">{trip.cityDeparture} - {trip.cityDestination}</li>
//             <li id="dateDetail">{formatDate(trip.departureDate)} kl {formatTime(trip.departureDate)}</li>
//             <li id="seatsDetail">{seats} sæde{seats > 1 ? 'r' : ''}</li>
//             <li id="totalPriceDetail">Samlet pris: {getTotalPrice()} kr</li>
//         </ul>
//     </section>
// </main>
//#endregion