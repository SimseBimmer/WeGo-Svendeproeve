import React, { useState } from 'react';

import './findLiftPage.scss';
// component imports
import FilterComponent from '../../components/FilterComponent/FilterComponent.jsx';
import FooterComponent from '../../components/FooterComponent/footerComponent.jsx';
import LiftListAndFilterComponent from '../../components/LiftListAndFilterComponent/LiftListAndFilterComponent.jsx'; // added


const FindLiftPage = () => {
  // State til søgefilter
  const [searchFilter, setSearchFilter] = useState({ from: '', to: '' });

  // Funktion til at opdatere søgefilter
  function handleSearch(filter) {
    setSearchFilter(filter);
  }

  return (
    <>
      <main>
        <FilterComponent onSearch={handleSearch} />
        <LiftListAndFilterComponent searchFilter={searchFilter} />
      </main>
      <FooterComponent />
    </>
  );
};

export default FindLiftPage;