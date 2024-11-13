import React from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/ClubInfo.module.css";
import { clubs } from "../../app/shared/clubs";
import ClubHeader from "./ClubHeader";
import "../../app/globals.css";
import ClubSocials from "./ClubSocials";
import Event from "./Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const badgePlaceholders = [
  "category",
  "longer category",
  "category",
  "tiny",
  "another category",
];

const ClubInfo: React.FC = () => {
  const club = clubs.at(1);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.clubPage}>
          <ClubHeader name={club?.name} image={club?.image} />
          <div className={styles.clubContent}>
            <div className={styles.clubDescription}>
              {/* {club?.description} */}
              <p>
                Description here description here description here description
                here description here description here description here
                description here
              </p>
              <br />
              <p>
                Description here description here description here description
                here description here description here description here
                description here description here description here description
                here description here
              </p>
            </div>
            <div className={styles.clubIcons}>
              <div className={styles.badgeBox}>
                {badgePlaceholders.map((badge, i) => (
                  <p className={styles.badge} key={i}>
                    {badge}
                  </p>
                ))}
              </div>
              <ClubSocials />
            </div>
          </div>
          <div className={styles.clubEvents}>
            <h2 className={styles.eventHeader}>Events</h2>
            <div className={styles.events}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={styles.eventButtonLeft}
              />
              <Event />
              <Event />
              <Event />
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.eventButtonRight}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClubInfo;
