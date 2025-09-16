import React from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';

export default function MinSideModal({ onClose }) {
    return (
        <ModalContainer onClose={onClose}>
            <h2>Min side</h2>
        </ModalContainer>
    );
}
