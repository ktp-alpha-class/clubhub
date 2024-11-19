import styles from "../../styles/ClubInfo.module.css";

type EventProps = {
  event: any;
  onClick?: () => void;
};

export default function Event({ event, onClick }: EventProps) {
  return (
    <div className={styles.event} onClick={onClick}>
      <img src="/images/ktp.jpg" className={styles.eventImage}></img>
      <div className={styles.eventFormat}>
        <div className={styles.eventTop}>
          <h3 className={styles.eventName}>{event.name}</h3>
          <button className={styles.rsvpButton}>RSVP</button>
        </div>
        <div className={styles.badgeBox}>
          {event.badges.map((badge: any) => (
            <p className={styles.eventBadge}>{badge}</p>
          ))}
        </div>
        <p className={styles.eventDescription}>{event.description}</p>
      </div>
    </div>
  );
}
