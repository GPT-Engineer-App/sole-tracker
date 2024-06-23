import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import TransactionList from "./pages/TransactionList.jsx";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", brand: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", brand: "Adidas" },
  ]);

  const [editTransaction, setEditTransaction] = useState(null);

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
  };

  return (
    <ThemeProvider attribute="class">
      <Router>
        <div className="p-4">
          <Button
            variant="outline"
            onClick={() => document.documentElement.classList.toggle("dark")}
          >
            Toggle Dark Mode
          </Button>
        </div>
        <Routes>
          <Route exact path="/" element={<TransactionList transactions={transactions} onEdit={handleEditTransaction} />} />
          <Route exact path="/add-transaction" element={<Index />} />
          <Route exact path="/edit-transaction" element={<Index editTransaction={editTransaction} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;