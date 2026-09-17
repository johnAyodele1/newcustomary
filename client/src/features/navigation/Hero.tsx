export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Made personal</p>
        <h1 id="hero-title" className="display">Keep the moment. Make it yours.</h1>
        <div className="gilt-divider" aria-hidden="true" />
        <p>Personalised pieces for the people, milestones and small rituals worth keeping close.</p>
        <button className="button button--solid" type="button" onClick={() => document.getElementById('jewelry')?.scrollIntoView({ behavior: 'smooth' })}>Explore Collection</button>
      </div>
      <div className="hero__media" aria-label="Product photography placeholder">
        <div className="hero-placeholder"><span>Customry</span><small>4:5 product image · ready for final photography</small></div>
      </div>
    </section>
  );
}
