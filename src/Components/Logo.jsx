import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={`${styles.logo}`}>
      <a href="/" className="text-decoration-none text-light">
        QuizTwist
      </a>
    </div>
  );
}

export default Logo;
