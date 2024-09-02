import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CategoryContainer({ icon, title = "" }) {
  return (
    <div
      className="child rounded d-flex flex-column gap-3
     justify-content-center align-items-center"
    >
      <FontAwesomeIcon icon={icon} />
      <p>{title}</p>
    </div>
  );
}
