import styles from "../../styles/ClubInfo.module.css";

type OverlayProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function Overlay({ isOpen, onClick }: OverlayProps) {
  if (!isOpen) return null;

  return <div className={styles.overlay} onClick={onClick} />;
}
