import type { HistoryRecord } from "../types.ts";

type HistoryTableProps = {
  history: HistoryRecord[];
};

function HistoryTable({ history }: HistoryTableProps) {
  return (
    <div>
      <h2>History</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Running Sum</th>
          </tr>
        </thead>

        <tbody>
          {history.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.value}</td>
              <td>{record.cumulative_sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
