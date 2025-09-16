import React from 'react';
import './ModalContainer.scss';

// Genbrugelig modal container
export default function ModalContainer({ children, onClose }) {
    // Luk modal hvis baggrund trykkes
    function handleBackdropClick(e) {
        if (e.target.id === 'modalBackdrop') {
            onClose();
        }
    }

    return (
        <div id="modalBackdrop" onClick={handleBackdropClick}>
            <div id="modalBox">
                <button id="closeModalBtn" onClick={onClose}>
                    {/* Luk-knap */}
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
