import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = ({ editTransaction }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "Income", brand: "Nike" },
    { id: 2, date: "2023-10-02", amount: 150, type: "Expense", brand: "Adidas" },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "Income",
    brand: "Nike",
  });

  useEffect(() => {
    if (editTransaction) {
      setNewTransaction(editTransaction);
    }
  }, [editTransaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    setNewTransaction({ date: "", amount: "", type: "Income", brand: "Nike" });
    toast("Transaction added successfully.");
  };

  const handleUpdateTransaction = () => {
    setTransactions(
      transactions.map((t) =>
        t.id === newTransaction.id ? newTransaction : t
      )
    );
    setNewTransaction({ date: "", amount: "", type: "Income", brand: "Nike" });
    toast("Transaction updated successfully.");
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{editTransaction ? "Edit Transaction" : "Add New Transaction"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newTransaction.type}
                onValueChange={(value) =>
                  setNewTransaction({ ...newTransaction, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={newTransaction.brand}
                onValueChange={(value) =>
                  setNewTransaction({ ...newTransaction, brand: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {editTransaction ? (
            <Button onClick={handleUpdateTransaction}>Update Transaction</Button>
          ) : (
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;