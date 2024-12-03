'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './authority.module.css';

const positions = [
  'Chefe de Estado', 
  'Ministro de Finanças', 
  'Presidente de Banco Central',
];

export default function AuthorityForm() {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    position: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCountries = localStorage.getItem('g20CountriesData');
      const storedAuthorities = localStorage.getItem('authorities');
      
      if (storedCountries) {
        const parsedCountries = JSON.parse(storedCountries);
        setCountries(parsedCountries);
      }
      
      if (storedAuthorities) {
        const parsedAuthorities = JSON.parse(storedAuthorities);
        setAuthorities(parsedAuthorities);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else {
      const nameParts = formData.name.trim().split(' ');
      if (nameParts.length < 2) {
        newErrors.name = 'Digite nome completo (primeiro e último nome)';
      }
    }

    if (!formData.country) {
      newErrors.country = 'Selecione um país';
    }

    if (!formData.position) {
      newErrors.position = 'Selecione um cargo';
    } else {
      const existingAuthority = authorities.find(
        (auth) => auth.country === formData.country && auth.position === formData.position
      );
      if (existingAuthority) {
        newErrors.position = 'Essa posição já existe para este país';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Formato de email inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAuthority = (authority) => {
    const updatedAuthorities = [...authorities, authority];
    setAuthorities(updatedAuthorities);
    localStorage.setItem('authorities', JSON.stringify(updatedAuthorities));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveAuthority(formData);
      router.push('/Countries', { state: { selectedCountry: formData.country } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['authority-form']}>
      <div className={styles['form-group']}>
        <label htmlFor="name">Nome da autoridade</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome completo"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="country">País representado</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Selecione um país</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="position">Cargo/função</label>
        <select
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">Selecione um cargo</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        {errors.position && <p className={styles.error}>{errors.position}</p>}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemplo@pais.tld"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <button type="submit" className={styles['submit-button']}>Salvar</button>
    </form>
  );
}