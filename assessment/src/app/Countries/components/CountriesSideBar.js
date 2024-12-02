'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../countries.module.css';

export default function CountriesSidebar({ onSelectCountry }) {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/');
    };

    useEffect(() => {
        const storedCountries = localStorage.getItem('g20CountriesData');
        if (storedCountries) {
            const parsedCountries = JSON.parse(storedCountries);
            console.log("Países carregados:", parsedCountries);
            setCountries(parsedCountries);
            setFilteredCountries(parsedCountries);
        }
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(term)
        );
        setFilteredCountries(filtered);
    };

    const handleCountryClick = (country) => {
        console.log("País selecionado:", country);
        setSelectedCountry(country);
        onSelectCountry(country);
    };

    return (
        <div className={styles.sidebar}>
            <button
                onClick={handleBackClick}
                className={styles.backButton}
            >
                Voltar
            </button>
            <input
                type="text"
                placeholder="Procure um País"
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchBar}
            />
            <ul className={styles.countryList}>
                {filteredCountries.map((country) => (
                    <li
                        key={country.name.common}
                        className={styles.countryItem}
                        style={
                            selectedCountry?.name.common === country.name.common
                                ? { backgroundColor: 'var(--link-color)', fontWeight: 'normal', color: 'var(--background)' }
                                : {}
                        }
                        onClick={() => handleCountryClick(country)}
                        >
                        {country.name.common}
                    </li>
               
                ))}
            </ul>
        </div>
    );
}
