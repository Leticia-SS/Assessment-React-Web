'use client'

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    const initializeData = async () => {
      const cachedData = localStorage.getItem("g20CountriesData");
      if (!cachedData) {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          
          if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();

          const g20Countries = [
            "South Africa", "Germany", "Saudi Arabia", "Argentina", "Australia",
            "Brazil", "Canada", "China", "South Korea", "United States",
            "France", "India", "Indonesia", "Italy", "Japan", "Mexico",
            "United Kingdom", "Russia", "Turkey"
          ];

          const filteredCountries = data.filter(country =>
            g20Countries.includes(country.name.common)
          ).sort((a, b) => a.name.common.localeCompare(b.name.common));

          localStorage.setItem("g20CountriesData", JSON.stringify(filteredCountries));
        } catch (error) {
          console.error("Erro ao buscar dados dos países:", error);
          alert("Não foi possível carregar os dados. Verifique sua conexão ou tente novamente mais tarde.");
        }
      }
    };

    initializeData();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.headerImg}>
        <div className={styles.headerImg}></div>
      </header>
      <main className={styles.main}>
        <nav>
          <div className={styles.routeContainer}>
            <Link href="/Countries" className={styles.route}>Ir para NotFound</Link>
          </div>
          <div className={styles.routeContainer}>
            <Link href="/AuthorityForm" className={styles.route}>Ir para NotFound</Link>
          </div>
          <div className={styles.routeContainer}>
            <Link href="/Agenda" className={styles.route}>Ir para NotFound</Link>
          </div>
        </nav>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Leticia-SS/Assessment-React-Web"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acesse o repositório deste projeto
        </a>
      </footer>
    </div>
  );
}
