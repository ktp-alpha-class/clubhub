import styles from "../../styles/ClubInfo.module.css";

export default function ClubSocials() {
  return (
    <div className={styles.socialButtons}>
      <button className={styles.buttonFB}></button>
      <button className={styles.buttonIG}></button>
      <button className={styles.buttonLK}></button>
      <button className={styles.buttonTW}></button>
    </div>
  );
}
