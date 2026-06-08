import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Assessment from "./pages/Assessment";
import TryOut from "./pages/TryOut";

// Placeholder pages — replace with real pages in future phases
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <p className="text-5xl mb-4">🚧</p>
      <h1 className="text-2xl font-bold text-slate-700">{title}</h1>
      <p className="text-slate-400 mt-1 text-sm">Coming in the next phase</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/assessment"
          element={
            <Layout>
              <Assessment />
            </Layout>
          }
        />
        <Route
          path="/tryout"
          element={
            <Layout>
              <TryOut />
            </Layout>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Layout>
              <Placeholder title="Leaderboard" />
            </Layout>
          }
        />
        <Route
          path="/rewards"
          element={
            <Layout>
              <Placeholder title="Rewards" />
            </Layout>
          }
        />
        <Route
          path="/product"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Placeholder title="Profile" />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
