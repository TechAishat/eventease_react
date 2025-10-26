import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-content">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            Unlock Seamless Access With EventEase.
          </h1>
          <p className="hero-description">
            Experience hassle-free user authentication and top-notch security. 
          Our innovative session management ensures a smooth start for everyone.
          </p>
          <div className="hero-actions">
            <Link to="/auth/signup" className="btn">
              Get Started
            </Link>
            <Link to="/auth/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-media" aria-hidden="true">
          <div className="hero-card card">
            <h2 style={{ margin: 0 }}>Live Ticket Overview</h2>
            <div className="grid stats-grid">
              <div className="card-soft" style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '2.2rem' }}>128</strong>
                <span>Total Tickets</span>
              </div>
              <div className="card-soft" style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '2.2rem', color: '#2f8f46' }}>52</strong>
                <span>Open</span>
              </div>
              <div className="card-soft" style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '2.2rem', color: '#a86a08' }}>34</strong>
                <span>In Progress</span>
              </div>
              <div className="card-soft" style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '2.2rem', color: '#495057' }}>42</strong>
                <span>Closed</span>
              </div>
            </div>
            <p style={{ color: '#6c7391' }}>
              Collaborate, track status shifts, and keep stakeholders in the loop effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="features-title">
      <div className="container">
        <div className="section-header">
          <h2 id="features-title" className="section-title">
            Why teams choose EventEase
          </h2>
          <p style={{ color: '#4a5272' }}>
            Experience seamless access with EventEase, tailored for your team's needs
          </p>
        </div>
        <div className="features-grid">
          <article className="card feature-card">
            <span className="feature-icon" aria-hidden="true">
              ⚡
            </span>
            <h3>Streamlined User Access</h3>
            <p>Quickly authenticate users and maintain security with efficient session management techniques.</p>
          </article>
          <article className="card feature-card">
            <span className="feature-icon" aria-hidden="true">
              📊
            </span>
            <h3>Comprehensive Analytics Dashboard</h3>
            <p>Track the total number of tickets, including open and resolved issues, with dynamic updates for immediate insights.</p>
          </article>
          <article className="card feature-card">
            <span className="feature-icon" aria-hidden="true">
              🛠️
            </span>
            <h3>Enhanced Ticket Management</h3>
            <p>Effortlessly create, edit, or close tickets with user-friendly validation prompts and timely notifications.</p>
          </article>
        </div>
      </div>
    </section>
  </div>
);

export default Landing;
