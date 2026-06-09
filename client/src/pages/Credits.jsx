import { useEffect, useState } from "react";
import API from "../api/axios";

function Credits() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get(
        "/credits/history"
      );

      setTransactions(
        res.data.transactions
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Credit History</h1>

      {transactions.map((txn) => (
        <div key={txn._id}>
          <h3>{txn.type}</h3>

          <p>
            Amount:
            {txn.amount}
          </p>

          <p>
            {txn.description}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Credits;