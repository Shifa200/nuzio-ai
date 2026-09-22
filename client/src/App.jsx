import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [news, setNews] = useState([]);

  const [preferencesCompleted, setPreferencesCompleted] =
    useState(false);

  const [selectedInterests, setSelectedInterests] =
    useState([]);

  const interests = [
    "AI & TECHNOLOGY",
    "STARTUPS",
    "BUSINESS",
    "SCIENCE",
    "FINANCE",
  ];

  // -----------------------------
  // FETCH NEWS
  // -----------------------------

  useEffect(() => {
    if (!isLoggedIn || !preferencesCompleted) {
      return;
    }

    const fetchNews = async () => {
      try {
        const user = JSON.parse(
        localStorage.getItem("user")
      );

    const response = await axios.get(
      `http://localhost:5000/api/news?email=${encodeURIComponent(
       user.email
    )}`
  );

        setNews(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch news:",
          error
        );
      }
    };

    fetchNews();
  }, [isLoggedIn, preferencesCompleted]);

  // -----------------------------
  // LOGIN
  // -----------------------------

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setIsLoggedIn(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // TOGGLE INTEREST
  // -----------------------------

  const toggleInterest = (interest) => {
    setSelectedInterests((current) => {
      if (current.includes(interest)) {
        return current.filter(
          (item) => item !== interest
        );
      }

      return [...current, interest];
    });
  };

  // -----------------------------
  // SAVE PREFERENCES
  // -----------------------------

  const savePreferences = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/preferences",
        {
          email: user.email,
          interests: selectedInterests,
        }
      );

      setPreferencesCompleted(true);
    } catch (error) {
      console.error(
        "Failed to save preferences:",
        error
      );
    }
  };

  // -----------------------------
  // PREFERENCES SCREEN
  // -----------------------------

  if (isLoggedIn && !preferencesCompleted) {
    return (
      <div className="preferences-page">
        <div className="preferences-content">
          <div className="nuzio-logo">
            Nuzio AI
          </div>

          <p className="preferences-label">
            PERSONALIZE YOUR BRIEF
          </p>

          <h1>
            What do you want
            <br />
            to hear about?
          </h1>

          <div className="interest-grid">
            {interests.map((interest) => {
              const selected =
                selectedInterests.includes(
                  interest
                );

              return (
                <button
                  key={interest}
                  type="button"
                  className={`interest-button ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() =>
                    toggleInterest(interest)
                  }
                >
                  {interest}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="continue-button"
            onClick={savePreferences}
            disabled={
              selectedInterests.length === 0
            }
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // NEWS SCREEN
  // -----------------------------

  if (isLoggedIn && preferencesCompleted) {
    return (
      <div className="news-page">
        <div className="news-header">
          <div className="nuzio-logo">
            Nuzio AI
          </div>

          <div className="news-date">
            MORNING BRIEF
          </div>
        </div>

        <div className="news-intro">
          <p>YOUR PERSONALIZED BRIEF</p>

          <h1>
            Good morning.
            <br />
            <span>
              Here's what matters.
            </span>
          </h1>
        </div>

        <div className="news-list">
          {news.map((item) => (
            <div
              className="news-card"
              key={item.id}
            >
              <div className="news-category">
                {item.category}
              </div>

              <h2>{item.title}</h2>

              <p>{item.summary}</p>

              <div className="news-card-footer">
                <span>
                  {item.duration} READ
                </span>

                <button
                  type="button"
                  className="play-button"
                >
                  ▶
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -----------------------------
  // LOGIN SCREEN
  // -----------------------------

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="nuzio-logo">
          Nuzio AI
        </div>

        <h1>
          Good morning.
          <br />
          <span>News on go.</span>
        </h1>

        <p className="login-description">
          Personalized audio news for your
          morning.
        </p>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button
            type="submit"
            className="google-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Continue"}
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-note">
          Your personalized news, wherever you
          go.
        </p>
      </div>

      <div className="brand">
        NUZIO AI
      </div>
    </div>
  );
}

export default App;