import styles from "./Logo.module.css";

export default function Logo({ dark = false }) {
  return (
    <div
      className={
        dark
          ? `${styles.logoContainer} ${styles.dark}`
          : `${styles.logoContainer}`
      }
    >
      <h1>
        <a href="/">LUXRENT</a>
      </h1>
    </div>
  );
}
