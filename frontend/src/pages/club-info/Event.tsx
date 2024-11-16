import styles from "../../styles/ClubInfo.module.css";

export default function Event() {
  return (
    <div className={styles.event}>
      <img src="/images/ktp.jpg" className={styles.eventImage}></img>
      <div className={styles.eventFormat}>
        <div className={styles.eventTop}>
          <h3 className={styles.eventName}>Event Name</h3>
          <button className={styles.rsvpButton}>RSVP</button>
        </div>

        <div className={styles.badgeBox}>
          <p className={styles.eventBadge}>Badge</p>
          <p className={styles.eventBadge}>Badge</p>
          <p className={styles.eventBadge}>Badge</p>
          <p className={styles.eventDescription}>
            Short two sentence description Short two sentence description Short
            two sentence description Short two sentence description
          </p>
        </div>
      </div>
    </div>
  );
}
