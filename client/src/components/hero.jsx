import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero">

      <h1>Find Your Dream Career with SkillSync</h1>

      <p>
        Build Skills • Apply for Jobs • Grow Your Career
      </p>

      <div className="hero-buttons">

        <button
          className="primary-btn"
          onClick={() => navigate("/register")}
        >
          Get Started
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/jobs")}
        >
          Browse Jobs
        </button>

      </div>

    </section>
  );
}

export default Hero;