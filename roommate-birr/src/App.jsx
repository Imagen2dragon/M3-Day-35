import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Screen from "./pages/Screen";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Screen
                title="Dashboard"
                intent="See who is owed money this week and jump into expenses."
                dataNeeds="roommates[], balances in ETB, month total"
              />
            }
          />
          <Route
            path="expenses"
            element={
              <Screen
                title="Expenses"
                intent="Browse shared costs; filter by category in the URL."
                dataNeeds="expenses[], selected category from ?category="
              />
            }
          />
          <Route
            path="expenses/new"
            element={
              <Screen
                title="Add expense"
                intent="Controlled form to log a shared cost (will be auth-guarded)."
                dataNeeds="form fields: amount, category, payer, participants"
              />
            }
          />
          <Route
            path="expenses/:id"
            element={
              <Screen
                title="Expense detail"
                intent="One expense by :id — amount, payer, split, notes."
                dataNeeds="expense from Number(id)"
              />
            }
          />
          <Route
            path="settlements"
            element={
              <Screen
                title="Settlements"
                intent="History of TeleBirr paybacks between roommates (lazy later)."
                dataNeeds="settlements[]"
              />
            }
          />
          <Route
            path="login"
            element={
              <Screen
                title="Login"
                intent="Create a light session so Add Expense can be guarded."
                dataNeeds="name, phone (Ethiopian mobile)"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
