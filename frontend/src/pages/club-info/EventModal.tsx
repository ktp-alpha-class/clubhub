import Event from "./Event";
import styles from "../../styles/ClubInfo.module.css";

type ModalProps = {
  event: any | null;
  isOpen: boolean;
};

export default function Modal({ event, isOpen }: ModalProps) {
  if (!event || !isOpen) return null;

  return (
    <div className={styles.modal}>
      <Event event={event} />
    </div>
  );
}
