// import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'

export default function Home() {

  return (
    <div className={styles.page}>
      <header className={styles.headerImg}>
        <div className={styles.headerImg}></div>
      </header>
      <main className={styles.main}>
      <nav>
          <div className={styles.routeContainer}>
            <Link href="/components/SideBar" className={styles.route}>Ir para NotFound</Link>
          </div>
          <div className={styles.routeContainer}>
            <Link href="/components/AuthorityForm" className={styles.route}>Ir para NotFound</Link>
          </div>
          <div className={styles.routeContainer}>
            <Link href="/components/Agenda" className={styles.route}>Ir para NotFound</Link>
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
