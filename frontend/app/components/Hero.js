export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">New season</p>
        <h1>Everything you need for a bold launch.</h1>
        <p className="sub">
          Hand-picked gear, clean design, fast delivery. Start with the
          essentials and expand when you are ready.
        </p>
        <button className="cta">Explore catalog</button>
      </div>
      <div className="hero-card">
        <div className="hero-tag">Featured</div>
        <div className="hero-title">Starter Kit</div>
        <div className="hero-price">$129.00</div>
        <div className="hero-note">Ships in 24 hours</div>
      </div>
    </section>
  );
}
