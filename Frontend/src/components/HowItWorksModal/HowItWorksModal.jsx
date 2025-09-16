import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import './HowItWorksModal.scss';

export default function HowItWorksModal({ onClose }) {
    return (
        <ModalContainer onClose={onClose}>
            <h2>Sådan virker det:</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam leo libero, vitae ullamcorper nunc rutrum sit amet. </p>
            <p>Integer lobortis diam eu justo fermentum, lacinia laoreet urna efficitur. Mauris sit amet urna vulputate, vulputate turpis a.</p>
            <p>Fusce quis rutrum odio. Integer nec euismod felis. Praesent ex justo, ultrices a neque in, facilisis condimentum ex. Cras iaculis eget nulla a vestibulum. Donec suscipit eu nunc in dictum. Vestibulum congue scelerisque velit, ut tempus urna dictum eu. </p>

        </ModalContainer>
    );
}
