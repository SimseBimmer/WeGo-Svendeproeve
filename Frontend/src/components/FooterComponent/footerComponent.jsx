import React from 'react';
import './footerComponent.scss';
import FooterImage from '../../assets/images/Footer.svg';

const FooterComponent = () => {
    return (
        <footer>
            <div id='footerContentContainer'>
                <img id='footerImage' src={FooterImage} alt="Footer" />
                <div id='footerText'>
                    <p id='copyright'>© 2025 WeGo ApS</p>
                    <p>Fartstræde 12c, 2. sal, 9000 Aalborg </p>
                </div>
            </div>
            <div id='emptyFooterSpace'>
            </div>
        </footer>
    );
};

export default FooterComponent;
