import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/checkins";

function App() {
  const [checkIns, setCheckIns] = useState([]);
  const [form, setForm] = useState({
    athleteName: "",
    emotion: "neutral",
    intensity: 3,
    notes: "",
  });

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const fetchCheckIns = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCheckIns(data);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newCheckIn = await response.json();
      setCheckIns([newCheckIn, ...checkIns]);
      setForm({ athleteName: "", emotion: "neutral", intensity: 3, notes: "" });
    } catch (error) {
      console.error("Error submitting check-in:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setCheckIns(checkIns.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting check-in:", error);
    }
  };

  const emotionEmojis = {
    stressed: "😰",
    anxious: "😟",
    neutral: "😐",
    happy: "😊",
    excited: "🤩",
  };

  return (
    <div className="app">
      <header>
        <h1>🏐 Volleyball Check-In</h1>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>How are you feeling?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={form.athleteName}
              onChange={(e) =>
                setForm({ ...form, athleteName: e.target.value })
              }
              required
            />

            <select
              value={form.emotion}
              onChange={(e) => setForm({ ...form, emotion: e.target.value })}
            >
              <option value="stressed">😰 Stressed</option>
              <option value="anxious">😟 Anxious</option>
              <option value="neutral">😐 Neutral</option>
              <option value="happy">😊 Happy</option>
              <option value="excited">🤩 Excited</option>
            </select>

            <div className="intensity-group">
              <label>Intensity: {form.intensity}/5</label>
              <input
                type="range"
                min="1"
                max="5"
                value={form.intensity}
                onChange={(e) =>
                  setForm({ ...form, intensity: Number(e.target.value) })
                }
              />
            </div>

            <textarea
              placeholder="Any notes? (optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows="3"
            />

            <button type="submit">Submit Check-In</button>
          </form>
        </div>

        <div className="checkins-section">
          <h2>Recent Check-Ins ({checkIns.length})</h2>
          <div className="checkins-list">
            {checkIns.map((checkIn) => (
              <div key={checkIn._id} className="checkin-card">
                <div className="checkin-header">
                  <h3>{checkIn.athleteName}</h3>
                  <button onClick={() => handleDelete(checkIn._id)}>×</button>
                </div>
                <div className="checkin-content">
                  <span className="emotion">
                    {emotionEmojis[checkIn.emotion]} {checkIn.emotion}
                  </span>
                  <span className="intensity">
                    Intensity: {"⭐".repeat(checkIn.intensity)}
                  </span>
                </div>
                {checkIn.notes && <p className="notes">{checkIn.notes}</p>}
                <small>{new Date(checkIn.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
