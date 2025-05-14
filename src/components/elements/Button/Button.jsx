import styles from "./Button.module.css";

export default function Button({ children, submit }) {
  return (
    <button
      type={submit === true ? "submit" : ""}
      className={styles.customButton}
    >
      {children}
    </button>
  );
}
