function button({ className = "", children, onClick = null }) {
  return (
    <>
      <button onClick={onClick} className={`btn ${className}`}>
        {children}
      </button>
    </>
  );
}

export default button;
