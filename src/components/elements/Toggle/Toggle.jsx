import styles from "./Toggle.module.css";

export default function Toggle({ children, checked, onChange }) {
  return (
    <div className={styles.toggle}>
      <input
        id={children}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={children}>
        <span className={styles.slider}>{children}</span>
      </label>
    </div>
  );
}
