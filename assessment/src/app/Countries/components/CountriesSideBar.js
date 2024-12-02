'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../countries.module.css';

export default function CountriesSidebar({ onSelectCountry }) {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedRegions, setSelectedRegions] = useState([]);
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
            country.name.common.toLowerCase().includes(term) &&
            (selectedRegions.length === 0 || selectedRegions.includes(country.region))
        );
        setFilteredCountries(filtered);
    };

    const handleRegionChange = (region) => {
        let updatedRegions = [...selectedRegions];
        if (updatedRegions.includes(region)) {
            updatedRegions = updatedRegions.filter((r) => r !== region);
        } else {
            updatedRegions.push(region);
        }
        setSelectedRegions(updatedRegions);

        const filtered = countries.filter((country) =>
            (updatedRegions.length === 0 || updatedRegions.includes(country.region)) &&
            country.name.common.toLowerCase().includes(searchTerm)
        );
        setFilteredCountries(filtered);
    };

    const handleCountryClick = (country) => {
        console.log("País selecionado:", country);
        setSelectedCountry(country);
        onSelectCountry(country);
    };

    const uniqueRegions = [...new Set(countries.map((country) => country.region))];

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
            <div className={styles.regionSelector}>
                <p>Filtrar por Região:</p>
                {uniqueRegions.map((region) => (
                    <label key={region} className={styles.regionOption}>
                        <input
                            type="checkbox"
                            value={region}
                            checked={selectedRegions.includes(region)}
                            onChange={() => handleRegionChange(region)}
                        />
                        {region}
                    </label>
                ))}
            </div>
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
