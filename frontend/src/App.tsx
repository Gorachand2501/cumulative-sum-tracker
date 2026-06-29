import { useEffect, useState } from "react";

import "./App.css";

import NumberInput from "./components/NumberInput";
import CurrentSum from "./components/CurrentSum";
import HistoryTable from "./components/HistoryTable";

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
    <div>
      <h1>Cumulative Sum Tracker</h1>

      <NumberInput
        number={number}
        error={error}
        setNumber={setNumber}
        setError={setError}
        handleSubmit={handleSubmit}
      />

      <CurrentSum sum={currentSum} />

      <HistoryTable history={history} />
    </div>
  );
}

export default App;
