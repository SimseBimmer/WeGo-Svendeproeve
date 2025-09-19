import React, { useEffect, useState } from 'react';
import './forsidePage.scss';
import '../../App.scss';
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';

// Simpelt slideshow med fade på tekst
const ForsidePage = () => {
  // slides: array med slides fra backend
  const [slides, setSlides] = useState([]);
  // current: index for nuværende slide
  const [current, setCurrent] = useState(0);
  // visText: styrer fade på tekst
  const [visText, setVisText] = useState(false);
  // fejl: hvis fetch fejler
  const [fejl, setFejl] = useState(null);

  // Hent slides fra backend når siden loader
  useEffect(() => {
    fetch('/api/slides')
      .then(res => res.ok ? res.json() : Promise.reject('Serverfejl'))
      .then(data => {
        setSlides(data);
        setCurrent(Math.floor(Math.random() * data.length)); // start på random slide
      })
      .catch(() => setFejl('Kunne ikke hente slideshow fra serveren.'));
  }, []);

  // Skift slide automatisk hvert 6. sekund
  useEffect(() => {
    if (slides.length === 0) return;
    setVisText(true);
    const timer = setTimeout(() => {
      setVisText(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setVisText(true);
      }, 500); // fade ud tekst før næste slide
    }, 6000);
    return () => clearTimeout(timer);
  }, [current, slides]);

  if (fejl) return <div id="slideshowError">{fejl}</div>;
  if (slides.length === 0) return <div id="slideshowLoading">Indlæser slideshow...</div>;

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