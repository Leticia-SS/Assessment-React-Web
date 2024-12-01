import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const savedTheme = localStorage.getItem("theme") || systemTheme;
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className={styles.page}>
      <header className={styles.headerImg}>
        <div className={styles.headerImg}></div>
      </header>
      <main className={styles.main}>
        <div className={styles.buttons}>
          <Link href="/Agenda">
            <button className={styles.navButton}>Agenda</button>
          </Link>
          <Link href="/AuthorityForm">
            <button className={styles.navButton}>Authority Form</button>
          </Link>
          <Link href="/SideBar">
            <button className={styles.navButton}>Sidebar</button>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </footer>
    </div>
  );
}
