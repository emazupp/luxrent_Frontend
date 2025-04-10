import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerWrapper}>
        <div className={styles.upper_footer}>
          <a href="#">Privacy</a>
          <a href="#">Flotta</a>
          <a href="#">Promozioni</a>
          <a href="#">Sedi</a>
          <a href="#">Assistenza</a>
        </div>
        <div className={styles.separatorLine_footer}></div>
        <div className={styles.lower_footer}>
          <a href="#">Termini & Condizioni</a>
          <span>GitHub: emazupp, vai a dare un'occhiata!</span>
          <a href="#">Contatti</a>
        </div>
      </div>
    </footer>
  );
}
