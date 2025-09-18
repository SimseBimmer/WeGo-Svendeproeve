import React, { useEffect, useState } from 'react';
import './forsidePage.scss';
import '../../App.scss';
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';

// Simpelt slideshow, kun tekst har fade
const ForsidePage = () => {
  // slides: gemmer slides fra backend
  const [slides, setSlides] = useState([]);
  // current: hvilket slide vises nu
  const [current, setCurrent] = useState(0);
  // visText: styrer om tekst skal vises
  const [visText, setVisText] = useState(false);
  // fejl: hvis der er fejl fra server
  const [fejl, setFejl] = useState(null);

  // Hent slides når siden loader
  useEffect(() => {
    fetch('/api/slides')
      .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
      .then(data => {
        setSlides(data);
        setCurrent(Math.floor(Math.random() * data.length)); // start på random slide
      })
      .catch(() => setFejl('Kunne ikke hente slideshow fra serveren.'));
  }, []);

  // Skift slide og styr tekst-timing
  useEffect(() => {
    if (slides.length === 0) return;
    setVisText(false);
    const show = setTimeout(() => setVisText(true), 500); // vis tekst efter 0.5sekunder
    const hide = setTimeout(() => setVisText(false), 5000); // skjul tekst 1 sekund før slide
    const next = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), 6000); // næste slide efter 6
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(next);
    };
  }, [current, slides]);

  if (fejl) return <div id="slideshowError">{fejl}</div>;
  if (slides.length === 0) return <div id="slideshowLoading">Indlæser slideshow...</div>;

  // current slide
  const slide = slides[current];

  return (
    <>
      <div id='forsidePageContainer'>
        <main id='forsidePageWrapper'>
        <div id="slideshowContainer">
          <img id="slideshowImage" src={slide.imageUrl} alt="slideshow" draggable={false} />
          <h1 id="slideshowText" className={visText ? 'show' : 'hide'}>
            {slide.text}
          </h1>
        </div>
      </main>
      </div>
      <div id='footerContainer'>
      <FooterComponent />

      </div>
    </>
  );
};

export default ForsidePage;