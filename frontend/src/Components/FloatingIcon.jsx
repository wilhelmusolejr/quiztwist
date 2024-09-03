import { faAward, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./FloatingIcon.module.css";

export default function FloatingIcon() {
  return (
    <div className={styles["floating-icon"]}>
      <FontAwesomeIcon
        icon={faTrophy}
        className={`${styles["svg"]} ${styles["trophy"]}`}
      />
      <FontAwesomeIcon
        icon={faAward}
        className={`${styles["svg"]} ${styles["award"]}`}
      />
    </div>
  );
}
