import "./CurrentSum.css";

type CurrentSumProps = {
  sum: number;
};

function CurrentSum({ sum }: CurrentSumProps) {
  return (
    <div className="sum-card">
      <h2>Current Sum</h2>
      <p>{sum}</p>
    </div>
  );
}

export default CurrentSum;
