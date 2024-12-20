import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080";

interface DataRecord {
  content: string;
  hash: string;
  timestamp: number;
}

function App() {
  const [data, setData] = useState<DataRecord>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [history, setHistory] = useState<DataRecord[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ content: data.content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedData = await response.json();
    setData(updatedData);
  };

  const verifyData = async () => {
    if (!data) return;

    // Recreate hash from current data
    const calculatedHash = CryptoJS.SHA256(
      data.content + data.timestamp
    ).toString();

    // Compare with stored hash
    setIsValid(calculatedHash === data.hash);
  };

  const toggleHistory = async () => {
    if (!showHistory && history.length === 0) {
      try {
        const response = await fetch(`${API_URL}/history`);
        if (!response.ok) throw new Error("Failed to fetch history");
        const historyData = await response.json();
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory([]);
      }
    }
    setShowHistory(!showHistory);
  };

  const restoreVersion = async (timestamp: number) => {
    const response = await fetch(`${API_URL}/restore/${timestamp}`, {
      method: "POST",
    });
    const restoredData = await response.json();
    setData(restoredData);
  };

  return (
    <div className="container">
      <h1 className="title">Tamper-Proof Data System</h1>

      <div className="data-container">
        <input
          className="input-field"
          type="text"
          value={data?.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          placeholder="Enter your data..."
        />

        <div className="button-container">
          <button className="button update-button" onClick={updateData}>
            Update Data
          </button>
          <button className="button verify-button" onClick={verifyData}>
            Verify Data
          </button>
        </div>

        <div
          className={`status ${isValid ? "status-valid" : "status-invalid"}`}
        >
          Data is {isValid ? "valid ✓" : "invalid ✗"}
        </div>

        <button className="button history-button" onClick={toggleHistory}>
          {showHistory ? "Hide History" : "Show History"}
        </button>

        {showHistory && history.length > 0 && (
          <div className="history-section">
            <h3>History</h3>
            {history.map((record) => (
              <div key={record.timestamp} className="history-item">
                <div>
                  <span>{record.content}</span>
                  <span className="timestamp">
                    {new Date(record.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  className="button restore-button"
                  onClick={() => restoreVersion(record.timestamp)}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
