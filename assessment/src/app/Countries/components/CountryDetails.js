import styles from '../countries.module.css';

export default function CountryDetails({ country }) {
  if (!country) {
    return <p>Selecione um país para ver mais detalhes</p>;
  }

  return (
    <div className={styles.countryDetails}>
      <h1 className={styles.countryName}>{country.name.common}</h1>
      <img 
        src={country.flags.svg} 
        alt={`Bandeira de ${country.name.common}`} 
        className={styles.countryFlag} 
      />
      <div className={styles.countryInfo}>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Região:</strong> {country.region}</p>
        <p><strong>Idioma:</strong> {Object.values(country.languages)[0]}</p>
        <p><strong>Top-Level Domain:</strong> {country.tld[0]}</p>
      </div>
    </div>
  );
}
