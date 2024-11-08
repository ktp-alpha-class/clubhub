import styles from "../../styles/ClubInfo.module.css";

type clubHeaderInput = {
  name: any;
  image: any;
};

export default function ClubHeader({ name, image }: clubHeaderInput) {
  return (
    <div className={styles.clubHeader}>
      <div className={styles.miniFlex}>
        <img src={image} alt={`${name} image`} className={styles.clubImage} />
        <h2 className={styles.clubName}>{name}</h2>
      </div>
      <div>
        <button className={styles.headerButton}>Apply</button>
        <button className={styles.headerButton}>Follow</button>
      </div>
    </div>
  );
}
