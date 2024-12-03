'use client'

import { useState, useEffect } from 'react';
import './page.module.css';

const positions = ['Chefe de Estado', 'Ministro de Finanças', 'Presidente de Banco Central'];

export default function AuthorityForm() {
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
    const storedCountries = localStorage.getItem('g20CountriesData');
    const storedAuthorities = localStorage.getItem('authorities');
    if (storedCountries) {
      const parsedCountries = JSON.parse(storedCountries);
      console.log("Países carregados:", parsedCountries);
      setCountries(parsedCountries);
    }
    if (storedAuthorities) {
      const parsedAuthorities = JSON.parse(storedAuthorities);
      console.log("Autoridades carregadas:", parsedAuthorities);
      setAuthorities(parsedAuthorities);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.split(' ').length < 2) {
      newErrors.name = 'Digite o nome completo';
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
      newErrors.email = 'Digite um email';
    } else {
      const country = countries.find((c) => c.name === formData.country);
      if (country && !formData.email.endsWith(`.${country.tld}`)) {
        newErrors.email = `Email deve terminar com .${country.tld}`;
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
      setFormData({ name: '', country: '', position: '', email: '' });
      alert('Autoridade Salva!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="authority-form">
      <div className="form-group">
        <label htmlFor="name">Nome da autoridade</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="country">País representado</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um país</option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Cargo/função</label>
        <select
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um cargo</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        {errors.position && <p className="error">{errors.position}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <button type="submit" className="submit-button">Salvar</button>
    </form>
  );
}

