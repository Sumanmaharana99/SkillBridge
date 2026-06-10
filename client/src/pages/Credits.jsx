import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function Credits() {
  const [transactions, setTransactions] = useState([]);
const [credits, setCredits] = useState(0);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/credits/history");
      setTransactions(res.data.transactions);
      setCredits(res.data.credits)
    } catch (error) {
      console.log(error);
    }
  };

  if (transactions.length === 0) {
    return (
      <MainLayout>
        
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Transactions Yet</h2>
            <p className="text-gray-500 mb-6">Book a session to start using credits.</p>
            <button className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
              Browse Sessions
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }




  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with credit summary */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Credit History</h1>
            <p className="text-gray-500 mt-1">Track your credits earned and spent</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl px-6 py-3 shadow-md">
            <div className="text-sm text-blue-100 font-medium">Available Credits</div>
            <div className="text-2xl font-bold text-white">{credits}</div>
          </div>
        </div>

        {/* Transactions list */}
        <div className="space-y-3">
          {transactions.map((txn) => (
            <div
              key={txn._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 transition hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-full ${
                  txn.type === "earned" ? "bg-green-100" : "bg-red-100"
                }`}>
                  {txn.type === "earned" ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 text-lg">{txn.description}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {new Date(txn.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                    txn.type === "earned"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {txn.type === "earned" ? "+" : "-"}
                  {txn.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Optional footer note */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Showing all credit transactions
        </div>
      </div>
    </MainLayout>
  );
}

export default Credits;