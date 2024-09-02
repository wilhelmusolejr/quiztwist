import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./CategoryContainer.module.css";

export default function CategoryContainer({ icon, title = "", link = "#" }) {
  return (
    <a
      href={link}
      className={`${styles["child"]} rounded d-flex flex-column gap-3
     justify-content-center align-items-center text-light`}
    >
      <FontAwesomeIcon icon={icon} className={`${styles["svg"]}`} />
      <p>{title}</p>
    </a>
  );
}
