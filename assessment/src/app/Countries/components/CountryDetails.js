import styles from '../countries.module.css';

export default function CountryDetails({ country }) {
  if (!country) {
    return <p>Select a country from the sidebar to view details.</p>;
  }

  return (
    <div className={styles.countryDetails}>
      <h1 className={styles.countryName}>{country.name.common}</h1>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Language:</strong> {Object.values(country.languages)[0]}</p>
      <p><strong>Top-Level Domain:</strong> {country.tld[0]}</p>
    </div>
  );
}

