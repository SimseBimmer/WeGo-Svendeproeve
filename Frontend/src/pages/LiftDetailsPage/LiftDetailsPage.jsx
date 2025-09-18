import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // tilføj useNavigate
// import scss 
import './LiftDetailsPage.scss';
// component imports
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';
import FilterComponent from '../../components/FilterComponent/FilterComponent.jsx';
// image imports
// storage icons
import baggageLilleImg from '../../assets/images/baggage/baggageLille.svg';
import baggageMellemImg from '../../assets/images/baggage/baggageMellem.svg';
import baggageStorImg from '../../assets/images/baggage/baggageStor.svg';
// star icons
import greyStar from '../../assets/images/starReview/greyStar.svg';
import yellowStar from '../../assets/images/starReview/yellowStar.svg';
// seat icons
import greenCircle from '../../assets/images/seats/greenCircle.svg';
import redCircle from '../../assets/images/seats/redCircle.svg';
// tripDetails icon
import useFerry from '../../assets/images/tripDetail/useFerry.svg';
import isElectric from '../../assets/images/tripDetail/isElectric.svg';
// fra og til Icon
import fraImg from '../../assets/images/Fra.svg';
import tilImg from '../../assets/images/Til.svg';
// details icon
import flexDriver from '../../assets/images/detaljer/FlexDriver.svg';
import komfort from '../../assets/images/detaljer/komfort.svg';
import baggageDetailIcon from '../../assets/images/detaljer/Baggage.svg';
import electricDetailIcon from '../../assets/images/detaljer/electric.svg';
import gasDetailIcon from '../../assets/images/detaljer/gas.svg';
// preferences icon
import yesImg from '../../assets/images/præferencer/yes.svg';
import noImg from '../../assets/images/præferencer/no.svg';
// quote icon
import quote from '../../assets/images/quote/quotation.svg';
// arrow icon
import arrowImg from '../../assets/images/Arrow.svg';




// Simpel detalje-side for lift
const LiftDetailsPage = () => {
    // Hent id fra url
    const { id } = useParams();
    const navigate = useNavigate(); // navigation hook
    // State til lift data
    const [lift, setLift] = useState(null);
    // Fejlbesked hvis noget går galt
    const [fejl, setFejl] = useState(null);
    // Tjek om bruger er logget ind
    const isLoggedIn = !!localStorage.getItem('accessToken');
    // State til fejlbesked hvis ikke logget ind
    const [loginError, setLoginError] = useState(false);

    // Hent lift data fra backend når siden loader
    useEffect(() => {
        if (!id) return; // hvis ingen id, hent ikke
        fetch(`/api/trips/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
            .then(data => setLift(data))
            .catch(() => setFejl('Kunne ikke hente lift detaljer.'));
    }, [id]);

    // Helper til dato og tid
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
    function formatTime(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
    }

    // Helper til preferences
    function prefIcon(val) {
        return val ? yesImg : noImg;
    }

    // Helper til seat bookings
    function getSeatsArray() {
        // Returnerer et array med booked og ledige pladser
        const array = [];
        const total = lift.seatsTotal || 0;
        const booked = lift.bookings || [];
        for (let i = 0; i < total; i++) {
            // Hvis der er en booking til denne plads, brug booking
            if (i < booked.length) {
                array.push(booked[i]);
            } else {
                array.push(null); // ledig plads
            }
        }
        return array;
    }

    // Funktion til book-knap
    function handleBookClick() {
        if (!isLoggedIn) {
            setLoginError(true); // vis fejlbesked
            return;
        }
        navigate(`/Book/${id}`);
    }

    if (fejl) return <div>{fejl}</div>;
    if (!lift) return <div>Indlæser lift detaljer...</div>;

    // Tjek om information er tom
    const infoIsEmpty = !lift.useFerry && !lift.isElectric;

    return (
        <>
            <main>
                <FilterComponent />
                <div id='contentWrapper'>
                    {/* trip */}
                    <section id='tripSection'>
                        <div
                            id='backButton'
                            onClick={() => navigate(-1)} // gå tilbage til forrige side
                        >
                            <img src={arrowImg} alt="Back" />
                        </div>
                        <header id='tripHeader'>
                            <h2>{lift.cityDeparture} til {lift.cityDestination}</h2>
                            <p>{formatDate(lift.departureDate)} {formatTime(lift.departureDate)}</p>
                        </header>
                        <div id='information'>
                            <h3>Information</h3>
                            <div id='driverInfo'>
                                {infoIsEmpty && (
                                    <p style={{ color: "#999", margin: "1rem 0" }}>Ingen ekstra information om ruten.</p>
                                )}
                                {lift.useFerry && (
                                    <div id='useFerry'>
                                        <img src={useFerry} alt="Use ferry" />
                                        <p>Rute inkluderer en færge</p>
                                    </div>
                                )}
                                {lift.isElectric && (
                                    <div>
                                        <img src={isElectric} alt="Electric car" />
                                        <p>Rute køres i elbil</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id='details'>
                            <h3>Detaljer</h3>
                            <ul>
                                {lift.hasComfort && (
                                    <li>
                                        <div className='detailContainer'>
                                            <img src={komfort} alt="Komfort" />
                                            <div>
                                                <p className='detailTitle'>Komfort</p>
                                                <p>Maks. 2 personer på bagsædet</p>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                <li>
                                    <div className='detailContainer'>
                                        <img src={flexDriver} alt="Flex driver" />
                                        <div>
                                            <p className='detailTitle'>Afgivelser fra ruten</p>
                                            <p>{lift.routeDeviation > 0 ? "Bilisten er fleksibel" : "Bilisten følger ruten"}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='detailContainer'>
                                        <img src={baggageDetailIcon} alt="Bagagestørrelse" />
                                        <div>
                                            <p className='detailTitle'>Bagagestørrelse</p>
                                            <p>{lift.bagsize?.description || "Ukendt"}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='detailContainer'>
                                        <img
                                            src={lift.isElectric ? electricDetailIcon : gasDetailIcon}
                                            alt="Brændstoftype"
                                        />
                                        <div>
                                            <p className='detailTitle'>Brændstoftype</p>
                                            <p>{lift.isElectric ? "Bilen er elektrisk" : "Bilen bruger benzin/diesel"}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id='preferences'>
                            <h3>Præferencer</h3>
                            <div id='preferencesLists'>
                                <ul>
                                    <li>
                                        <div>
                                            <img src={prefIcon(lift.allowPets)} alt={lift.allowPets ? "Allowed" : "Not allowed"} />
                                            <p>Kæledyr</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <img src={prefIcon(lift.allowChildren)} alt={lift.allowChildren ? "Allowed" : "Not allowed"} />
                                            <p>Børn</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div>
                                            <img src={prefIcon(lift.allowMusic)} alt={lift.allowMusic ? "Allowed" : "Not allowed"} />
                                            <p>Musik</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <img src={prefIcon(lift.allowSmoking)} alt={lift.allowSmoking ? "Allowed" : "Not allowed"} />
                                            <p>Rygning</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id='driverComment'>
                            <h3>Chauførrens kommentar:</h3>
                            <div>
                                <img src={quote} alt="quote" />
                                {lift.comment && lift.comment.length > 0 ? (
                                    <p>{lift.comment}</p>
                                ) : (
                                    <p style={{ color: "#999", margin: "0" }}>Ingen kommentar</p>
                                )}
                            </div>
                        </div>
                        <div id='driver'>
                            <h3>Chauførren:</h3>
                            <div id='driverInfoContainer'>
                                <img id='driverImage' src={lift.user?.imageUrl || yesImg} alt="Driver" />
                                <div id='driverDetails'>
                                    <h3>{lift.user?.firstname} {lift.user?.lastname}</h3>
                                    <div id='starReviews'>
                                        {[...Array(5)].map((_, i) => (
                                            <img
                                                key={i}
                                                src={i < Math.round(lift.user?.avgStars || 0) ? yellowStar : greyStar}
                                                alt="star"
                                            />
                                        ))}
                                        <p> ({lift.user?.numReviews || 0} anmeldelser)</p>
                                    </div>
                                    <button>Skriv en anmeldese</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <aside id='seatsSection'>
                        <h2>Pladser</h2>
                        <div id='steatContainer'>
                            <ul id='seatsList'>
                                {getSeatsArray().map((booking, idx) => (
                                    <li key={idx}>
                                        <div className='seatContainer'>
                                            {booking && booking.user ? (
                                                <>
                                                    <img id='userProfilePicture' src={booking.user.imageUrl} alt={booking.user.firstname} />
                                                    <div id='userInfo'>
                                                        <p id='userName'>{booking.user.firstname}</p>
                                                        <p>{lift.cityDeparture} - {lift.cityDestination}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div id='userProfilePicture' style={{ background: '#DFE4E7' }}></div>
                                                    <div id='userInfo'>
                                                        <p id='dig'>Ledig</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div id='seatPriceContainer'>
                                <p>Pris per plads</p>
                                <p id='valuta'>DKK <span id='seatPrice'>{lift.pricePerSeat}</span></p>
                            </div>
                            <button
                                onClick={handleBookClick}
                                id="bookPladsBtn"
                                style={{
                                    background: !isLoggedIn ? '#ccc' : '',
                                    color: !isLoggedIn ? '#888' : '',
                                    cursor: !isLoggedIn ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Book plads
                            </button>
                            {/* Vis besked hvis user ikke logget ind */}
                            {!isLoggedIn && (
                                <p id="loginErrorMsg" style={{ color: 'red', marginTop: '0.5rem' }}>
                                    Du skal være logget ind for at booke en plads
                                </p>
                            )}
                        </div>
                    </aside>
                </div>
            </main>
            <FooterComponent />
        </>
    );
};

export default LiftDetailsPage;