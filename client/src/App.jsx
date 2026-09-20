import { useState , useEffect} from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
  if (!isLoggedIn) {
    return;
  }

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/news"
      );

      setNews(response.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  fetchNews();
}, [isLoggedIn]);

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

      localStorage.setItem("token", response.data.token);
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

  if (isLoggedIn) {
  return (
    <div className="news-page">
      <div className="news-header">
        <div className="nuzio-logo">Nuzio AI</div>

        <div className="news-date">
          MORNING BRIEF
        </div>
      </div>

      <div className="news-intro">
        <p>YOUR PERSONALIZED BRIEF</p>

        <h1>
          Good morning.
          <br />
          <span>Here's what matters.</span>
        </h1>
      </div>
      <div className="news-list">
  {news.map((item) => (
    <div className="news-card" key={item.id}>
      <div className="news-category">
        {item.category}
      </div>

      <h2>{item.title}</h2>

      <p>{item.summary}</p>

      <div className="news-card-footer">
        <span>{item.duration} READ</span>

        <button className="play-button">
          ▶
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="nuzio-logo">Nuzio AI</div>

        <h1>
          Good morning.
          <br />
          <span>News on go.</span>
        </h1>

        <p className="login-description">
          Personalized audio news for your morning.
        </p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {message && (
          <p className="login-message">{message}</p>
        )}

        <p className="login-note">
          Your personalized news, wherever you go.
        </p>
      </div>

      <div className="brand">NUZIO AI</div>
    </div>
  );
}

export default App;