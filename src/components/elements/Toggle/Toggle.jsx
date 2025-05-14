import styles from "./Toggle.module.css";

export default function Toggle({ children, id }) {
  return (
    <div className={styles.toggle}>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>
        <span className={styles.slider}>{children}</span>
      </label>
    </div>
  );
}
