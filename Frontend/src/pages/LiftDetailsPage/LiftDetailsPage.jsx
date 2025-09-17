import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import scss 
import './LiftDetailsPage.scss';
// component imports
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';
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

// Simpel detalje-side for lift
const LiftDetailsPage = () => {
    // Hent id fra url
    const { id } = useParams();
    // State til lift data
    const [lift, setLift] = useState(null);
    // Fejlbesked hvis noget går galt
    const [fejl, setFejl] = useState(null);

    // Hent lift data fra backend når siden loader
    useEffect(() => {
        fetch(`/api/lifts/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
            .then(data => setLift(data))
            .catch(() => setFejl('Kunne ikke hente lift detaljer.'));
    }, [id]);

    if (fejl) return <div>{fejl}</div>;
    if (!lift) return <div>Indlæser lift detaljer...</div>;

    return (
        <>
            <main>

            </main>
            <FooterComponent />

        </>
    );
};

export default LiftDetailsPage;
