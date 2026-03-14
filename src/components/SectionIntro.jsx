const SectionIntro = ({ kicker, title, description, children, className = '' }) => {
  return (
    <section className={`section-intro${className ? ` ${className}` : ''}`}>
      <div className="section-intro__copy">
        <p className="hero-kicker">{kicker}</p>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{description}</p>
      </div>

      {children ? <div className="section-intro__aside">{children}</div> : null}
    </section>
  );
};

export default SectionIntro;
