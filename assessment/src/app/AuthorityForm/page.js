'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const AuthorityForm = ({ onSelectCountry }) => { 
    const [authorities, setAuthorities] = useState({});
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        position: '',
        email: ''
    });
    const [emailValid, setEmailValid] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedCountries = localStorage.getItem('g20CountriesData');
        if (storedCountries) {
            setCountries(JSON.parse(storedCountries));
        }
    }, []);

    const validateEmail = (email, tld) => {
        const domain = email.split('@')[1];
        return domain.endsWith(tld);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'email') {
            const selectedCountry = countries.find(country => country.name.common === formData.country);
            const tld = selectedCountry?.tld[0] || '';
            setEmailValid(validateEmail(value, tld));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, country, position, email } = formData;
        
        if (!name || !country || !position || !email || !emailValid) {
            alert("Todos os campos devem ser preenchidos corretamente!");
            return;
        }

        if (authorities[country]?.[position]) {
            alert(`Já existe uma autoridade com o cargo "${position}" para o país ${country}`);
            return;
        }

        setAuthorities(prevAuthorities => {
            const updatedAuthorities = {
                ...prevAuthorities,
                [country]: {
                    ...prevAuthorities[country],
                    [position]: { name, email }
                }
            };

            localStorage.setItem('authoritiesData', JSON.stringify(updatedAuthorities));

            return updatedAuthorities;
        });

        onSelectCountry(country);

        router.push(`/countries?country=${country}`);
    };

    return (
        <div className={styles.container}>
            <h1>Cadastrar Autoridade</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome da Autoridade</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="country">País Representado</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um País</option>
                        {countries.map(country => (
                            <option key={country.name.common} value={country.name.common}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="position">Cargo/Função</label>
                    <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um Cargo</option>
                        {['Chefe de Estado', 'Ministros de Finança', 'Presidente de Banco Central'].map(position => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {!emailValid && <span className={styles.error}>O domínio do email deve corresponder ao TLD do país selecionado.</span>}
                </div>

                <button type="submit" className={styles.submitButton}>Cadastrar</button>
            </form>
        </div>
    );
};

export default AuthorityForm;
