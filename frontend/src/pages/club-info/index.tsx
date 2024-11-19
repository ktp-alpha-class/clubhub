import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/ClubInfo.module.css";
import { clubs } from "../../app/shared/clubs";
import ClubHeader from "./ClubHeader";
import "../../app/globals.css";
import ClubSocials from "./ClubSocials";
import Event from "./Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "./EventModal";
import Overlay from "./Overlay";

function ClubInfo() {
  const badgePlaceholders = [
    "category",
    "longer category",
    "category",
    "tiny",
    "another category",
  ];

  const events = [
    {
      name: "Info Session",
      badges: ["Welcome", "Computer Science"],
      description:
        "Welcoming to the club, Welcoming to the club, Welcoming to the club, Welcoming to the club, Welcoming to the club, Welcoming to the club",
    },
    {
      name: "Workshop",
      badges: ["badge", "badge"],
      description:
        "fun little workshop event fun little workshop event fun little workshop event",
    },
    {
      name: "Hackathon",
      badges: ["Learning", "Networking"],
      description:
        "hackathon for major prize hackathon for major prize hackathon for major prize",
    },
    {
      name: "Philanthropy",
      badges: ["Charity", "Community Service"],
      description: "donating to the nearby foundation",
    },
  ];

  const club = clubs[0];

  const [eventIndex, setEventIndex] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [modalEvent, setModalEvent] = useState<any>(null);

  const eventsSelected = events.slice(eventIndex, eventIndex + 3);

  function handeDecrement() {
    if (eventIndex > 0) {
      setEventIndex(eventIndex - 1);
    }
  }

  function handeIncrement() {
    if (eventIndex < events.length - 3) {
      setEventIndex(eventIndex + 1);
    }
  }

  function handleOpen(event: any) {
    setIsOpen(true);
    setModalEvent(event);
  }

  function handleClose() {
    setIsOpen(false);
    setModalEvent(null);
  }

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div>
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
                onClick={handeDecrement}
              />
              {eventsSelected.map((event: any) => (
                <Event event={event} onClick={() => handleOpen(event)} />
              ))}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={styles.eventButtonRight}
                onClick={handeIncrement}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} event={modalEvent} />
      <Overlay isOpen={isOpen} onClick={handleClose} />
    </div>
  );
}

export default ClubInfo;
