
import "../styles/features.css";
function Features() {
  return (
    <section className="features">

      <h2>Our Features</h2>

      <div className="feature-container">

        <div className="feature-card">
          <h3>📄 Resume Builder</h3>
          <p>Create and manage your professional resume.</p>
        </div>

        <div className="feature-card">
          <h3>💼 Job Portal</h3>
          <p>Find internships and full-time job opportunities.</p>
        </div>

        <div className="feature-card">
          <h3>🎯 Skill Tracker</h3>
          <p>Track your skills and improve your career profile.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;