'use client'

import { useState, useEffect } from 'react';
import CountriesSidebar from './components/CountriesSideBar';
import CountryDetails from './components/CountryDetails';
import styles from './countries.module.css';

export default function CountriesPage() {
    const [selectedCountry, setSelectedCountry] = useState(null);
  
    useEffect(() => {
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setSelectedCountry(savedCountry);
        }
    }, []);


    return (
      <div className={styles.countriesPage}>
        <CountriesSidebar onSelectCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
        <main className={styles.main}>
          {selectedCountry && <CountryDetails country={selectedCountry} />}
        </main>
      </div>
    );
  }
