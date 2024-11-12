import React from "react";
import styles from "../../styles/ClubInfo.module.css";
import { clubs } from "../../app/shared/clubs";

type clubHeaderInput = {
  name: any;
  image: any;
};

export default function ClubHeader({ name, image }: clubHeaderInput) {
  const club = clubs.find((c) => c.name === name);

  return (
    <div className={styles.clubHeader}>
      <div className={styles.miniFlex}>
        <img src={image} alt={`${name} image`} className={styles.clubImage} />
        <h2 className={styles.clubName}>{name}</h2>
      </div>
      <div>
        {club?.applicationLink && (
          <button
            className={styles.headerButton}
            onClick={() => window.open(club.applicationLink, "_blank")}
          >
            Apply
          </button>
        )}
        <button className={styles.headerButton}>Follow</button>
      </div>
    </div>
  );
}
