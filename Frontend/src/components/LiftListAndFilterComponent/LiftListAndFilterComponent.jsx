import React, { useEffect, useState } from 'react';
import './LiftListAndFilterComponent.scss';
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
import { useNavigate } from 'react-router-dom'; // til navigation

// content width wrapper
const LiftListAndFilterComponent = ({ searchFilter }) => {
    // State til lifts fra backend
    const [lifts, setLifts] = useState([]);
    // State til baggage typer fra backend
    const [baggageTypes, setBaggageTypes] = useState([]);
    // Filter states
    const [seatsFilter, setSeatsFilter] = useState(1);
    const [baggageFilter, setBaggageFilter] = useState(null); // id på valgt baggage
    const [komfortFilter, setKomfortFilter] = useState(false);
    const [preferencerFilter, setPreferencerFilter] = useState({
        allowMusic: false,
        allowPets: false,
        allowChildren: false,
        allowSmoking: false
    });
    const navigate = useNavigate(); // navigation hook

    // Hent lifts fra backend
    useEffect(() => {
        fetch('/api/trips')
            .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
            .then(data => setLifts(data))
            .catch(() => setLifts([]));
    }, []);

    // Hent baggage typer fra backend
    useEffect(() => {
        fetch('/api/bagsizes')
            .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
            .then(data => setBaggageTypes(data))
            .catch(() => setBaggageTypes([]));
    }, []);

    // Funktion til at nulstille alle filtre
    function resetFilters() {
        setSeatsFilter(1);
        setBaggageFilter(null);
        setKomfortFilter(false);
        setPreferencerFilter({
            allowMusic: false,
            allowPets: false,
            allowChildren: false,
            allowSmoking: false
        });
    }

    // Funktion til at filtrere lifts
    function filterLifts(lift) {
        // Filter på søgefelter (fra og til)
        if (searchFilter?.from && !lift.cityDeparture.toLowerCase().includes(searchFilter.from.toLowerCase())) return false;
        if (searchFilter?.to && !lift.cityDestination.toLowerCase().includes(searchFilter.toLowerCase())) return false;
        // Filter på antal ledige pladser
        const availableSeats = lift.seatsTotal - (lift.seatsBooked || 0);
        if (availableSeats < seatsFilter) return false;
        // Filter på baggage type
        if (baggageFilter && lift.bagSizeId !== baggageFilter) return false;
        // Filter på komfort
        if (komfortFilter && !lift.hasComfort) return false;
        // Filter på preferencer
        for (const key in preferencerFilter) {
            if (preferencerFilter[key] && !lift[key]) return false;
        }
        return true;
    }

    // Render
    return (
        <div id="contentWrapper">
            <aside id='filterAside'>
                {/* antal pladser slider */}
                <div id="slider">
                    <div id='sliderLabel'>
                        <h3>Antal Pladser</h3>
                        <p>{seatsFilter}</p>
                    </div>
                    <input
                        id='NumberOfSeatsSlider'
                        type="range"
                        min="1"
                        max="6"
                        value={seatsFilter}
                        onChange={e => setSeatsFilter(Number(e.target.value))}
                    />
                </div>
                {/* Baggage */}
                <div id='baggage'>
                    <h3>Baggage</h3>
                    <div id='baggageTyper'>
                        {baggageTypes.map(bag => (
                            <div
                                key={bag.id}
                                id={`baggageType${bag.id}`}
                                className='baggageIconWrapper'
                                style={{
                                    backgroundColor: baggageFilter === bag.id ? '#00A6DB' : '',
                                    color: baggageFilter === bag.id ? '#FFFFFF' : ''
                                }}
                                onClick={() => setBaggageFilter(bag.id)}
                            >
                                <img src={bag.iconUrl} alt={bag.name} />
                                <p>{bag.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Komfort */}
                <div id='komfort'>
                    <h3>Komfort</h3>
                    <div>
                        <input
                            type="checkbox"
                            checked={komfortFilter}
                            onChange={e => setKomfortFilter(e.target.checked)}
                        />
                        <p>Højst to personer på bagsædet</p>
                    </div>
                </div>
                {/* Preferencer */}
                <div id='preferencer'>
                    <h3>Preferencer</h3>
                    <div id='preferencerCheckboxes'>
                        <div className='CheckboxContainer'>
                            <input
                                type="checkbox"
                                checked={preferencerFilter.allowMusic}
                                onChange={e => setPreferencerFilter(f => ({ ...f, allowMusic: e.target.checked }))}
                            />
                            <p>Musik</p>
                        </div>
                        <div className='CheckboxContainer'>
                            <input
                                type="checkbox"
                                checked={preferencerFilter.allowPets}
                                onChange={e => setPreferencerFilter(f => ({ ...f, allowPets: e.target.checked }))}
                            />
                            <p>Dyr</p>
                        </div>
                        <div className='CheckboxContainer'>
                            <input
                                type="checkbox"
                                checked={preferencerFilter.allowChildren}
                                onChange={e => setPreferencerFilter(f => ({ ...f, allowChildren: e.target.checked }))}
                            />
                            <p>Børn</p>
                        </div>
                        <div className='CheckboxContainer'>
                            <input
                                type="checkbox"
                                checked={preferencerFilter.allowSmoking}
                                onChange={e => setPreferencerFilter(f => ({ ...f, allowSmoking: e.target.checked }))}
                            />
                            <p>Rygning</p>
                        </div>
                    </div>
                </div>
                {/* nulstil */}
                <div id='reset'>
                    <button type="button" onClick={resetFilters}>Nulstil</button>
                </div>
            </aside>

            <section id='liftList'>
                <h2>Næste lift</h2>
                <div id='liftsContainer'>
                    {/* Viser filtrerede lifts */}
                    {lifts.filter(filterLifts).map(lift => (
                        <div
                            id='liftCard'
                            key={lift.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/LiftDetails/${lift.id}`)} // klik åbner detail page
                        >
                            <div id='DriverInfo'>
                                <img src={lift.user.imageUrl} alt="Driver image" />
                                <p title={`${lift.user.firstname} ${lift.user.lastname}`}>{lift.user.firstname}</p>
                                <div id='starReview' title={`${lift.user.avgStars} ud af 5 stjerner`}>
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={i < Math.round(lift.user.avgStars) ? yellowStar : greyStar}
                                            alt="star"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div id='tripDetails'>
                                <div id='timeAndOffers'>
                                    <p>{new Date(lift.departureDate).toLocaleString('da-DK', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                    <div id='tripIcons'>
                                        {lift.useFerry && <img src={useFerry} alt="use ferry icon" title="Use ferry" />}
                                        {lift.isElectric && <img src={isElectric} alt="is electric icon" title="Is electric" />}
                                    </div>
                                </div>
                                <div id='fromToContainer'>
                                    <div className='addressContainer' id='fraContainer'>
                                        <img src={fraImg} alt="fra" />
                                        <div className='adresses' title={`${lift.cityDeparture}, ${lift.addressDeparture}`}>
                                            <p>{lift.cityDeparture}</p>
                                            <p>{lift.addressDeparture}</p>
                                        </div>
                                    </div>
                                    <div className='addressContainer' id='tilContainer'>
                                        <img src={tilImg} alt="til" />
                                        <div className='adresses' title={`${lift.cityDestination}, ${lift.addressDestination}`}>
                                            <p>{lift.cityDestination}</p>
                                            <p>{lift.addressDestination}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id='priceAndSeats'>
                                <div id='priceContainer' title={`${lift.pricePerSeat} DKK`}>
                                    <p>DKK {lift.pricePerSeat}</p>
                                </div>
                                <div id='seatsContainer' title={`${lift.seatsTotal - (lift.seatsBooked || 0)} ledige pladser`}>
                                    <div id='seatsIcons'>
                                        {[...Array(lift.seatsTotal)].map((_, i) => (
                                            <img
                                                key={i}
                                                src={i < (lift.seatsTotal - (lift.seatsBooked || 0)) ? greenCircle : redCircle}
                                                alt={i < (lift.seatsTotal - (lift.seatsBooked || 0)) ? "available seat" : "unavailable seat"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Hvis ingen lifts matcher */}
                    {lifts.filter(filterLifts).length === 0 && (
                        <div>Ingen lifts matcher dine filtre.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LiftListAndFilterComponent;