type CurrentSumProps = {
  sum: number;
};

function CurrentSum({ sum }: CurrentSumProps) {
  return (
    <div>
      <h2>Current Sum</h2>
      <p>{sum}</p>
    </div>
  );
}

export default CurrentSum;