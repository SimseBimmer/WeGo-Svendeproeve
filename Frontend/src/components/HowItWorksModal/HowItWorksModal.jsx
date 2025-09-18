import React, { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import './HowItWorksModal.scss';

export default function HowItWorksModal({ onClose }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [fejl, setFejl] = useState(null);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
            .then(data => {
                // Find "Sådan virker det" content
                const item = data.find(c => c.title === "Sådan virker det");
                setContent(item?.content || '');
                setLoading(false);
            })
            .catch(() => {
                setFejl('Kunne ikke hente indhold.');
                setLoading(false);
            });
    }, []);

    return (
        <ModalContainer onClose={onClose}>
            {loading && <p>Indlæser...</p>}
            {fejl && <p style={{ color: 'red' }}>{fejl}</p>}
            {!loading && !fejl && (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </ModalContainer>
    );
}
