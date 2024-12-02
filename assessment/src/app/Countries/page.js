'use client'

import { useState } from 'react';
import CountriesSidebar from './components/CountriesSidebar';
import CountryDetails from './components/CountryDetails';
import styles from './countries.module.css';

export default function CountriesPage() {
    const [selectedCountry, setSelectedCountry] = useState(null);
  
    return (
      <div className={styles.countriesPage}>
        <CountriesSidebar onSelectCountry={setSelectedCountry} />
        <main className={styles.main}>
          {selectedCountry && <CountryDetails country={selectedCountry} />}
        </main>
      </div>
    );
  }
