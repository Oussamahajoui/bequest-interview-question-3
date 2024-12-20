import cors from "cors";
import CryptoJS from "crypto-js";
import express from "express";

const PORT = 8080;
const app = express();

interface DataRecord {
  content: string;
  hash: string;
  timestamp: number;
}

const database: {
  data: DataRecord;
  history: DataRecord[];
} = {
  data: {
    content: "Hello World",
    hash: "",
    timestamp: Date.now(),
  },
  history: [],
};

// Generate hash for initial data
database.data.hash = CryptoJS.SHA256(
  database.data.content + database.data.timestamp
).toString();

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/", (req, res) => {
  // Save current state to history
  database.history.push({ ...database.data });

  // Update current state
  const { content } = req.body;
  const timestamp = Date.now();
  const hash = CryptoJS.SHA256(content + timestamp).toString();

  database.data = {
    content,
    hash,
    timestamp,
  };

  res.json(database.data);
});

app.get("/history", (req, res) => {
  // console.log("Sending history:", database.history); // I console log a lot during testing kept here if you need to do same
  res.json(database.history);
});

app.post("/restore/:timestamp", (req, res) => {
  const timestamp = parseInt(req.params.timestamp);
  const historicalRecord = database.history.find(
    (record) => record.timestamp === timestamp
  );

  if (historicalRecord) {
    database.data = { ...historicalRecord };
    res.json(database.data);
  } else {
    res.status(404).json({ error: "Record not found" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
