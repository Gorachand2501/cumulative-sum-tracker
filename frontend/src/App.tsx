import { useEffect, useState } from "react";
import "./App.css";

import NumberInput from "./components/NumberInput";
import CurrentSum from "./components/CurrentSum";
import HistoryTable from "./components/HistoryTable";
import ChartView from "./components/ChartView";

import { getNumbers, getSum, addNumber } from "./api/api";

import type { HistoryRecord } from "./types.ts";

function App() {
  const [currentSum, setCurrentSum] = useState(0);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [historyData, sumData] = await Promise.all([getNumbers(), getSum()]);

    setHistory(historyData);
    setCurrentSum(sumData.total);
  }

  async function handleSubmit() {
    if (number === "") {
      setError("Please enter a number.");
      return;
    }

    const value = Number(number);

    if (value < 0 || value > 99) {
      setError("Please enter a value between 0 and 99.");
      return;
    }

    setError("");

    await addNumber(value);

    await loadData();

    setNumber("");
  }

  return (
    <div className="app-container">
      <h1>Cumulative Sum Tracker</h1>

      <p className="subtitle">
        Enter a number between 0 and 99 to add to the cumulative sum
      </p>

      <div className="input-section">
        <NumberInput
          number={number}
          error={error}
          setNumber={setNumber}
          setError={setError}
          handleSubmit={handleSubmit}
        />
      </div>

      <CurrentSum sum={currentSum} />

      <HistoryTable history={history} />

      <ChartView history={history} />
    </div>
  );
}

export default App;
