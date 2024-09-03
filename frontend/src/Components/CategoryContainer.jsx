import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./CategoryContainer.module.css";
import { useLocation } from "react-router-dom";

export default function CategoryContainer({ icon, title = "", link = "#" }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <a
          href={link}
          className={`${styles.child} rounded d-flex flex-column gap-3
           justify-content-center align-items-center text-light`}
        >
          <FontAwesomeIcon icon={icon} className={styles.svg} />
          <p>{title}</p>
        </a>
      ) : (
        <div
          className={`${styles.child} rounded d-flex flex-column gap-3
           justify-content-center align-items-center text-light cursor-default`}
        >
          <FontAwesomeIcon icon={icon} className={styles.svg} />
          <p>{title}</p>
        </div>
      )}
    </>
  );
}
