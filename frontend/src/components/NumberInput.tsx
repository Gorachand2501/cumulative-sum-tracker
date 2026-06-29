import "./NumberInput.css";

type NumberInputProps = {
  number: string;
  error: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
};

function NumberInput({
  number,
  error,
  setNumber,
  setError,
  handleSubmit,
}: NumberInputProps) {
  return (
    <div className="input-wrapper">
      <input
        type="number"
        placeholder="Enter a number (0-99)"
        value={number}
        onChange={(event) => {
          setNumber(event.target.value);
          setError("");
        }}
      />

      <button onClick={handleSubmit} disabled={number.trim() === ""}>
        Submit
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default NumberInput;
