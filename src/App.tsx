import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

// Import Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage"; 
import ThreadDetailPage from "./pages/ThreadDetail"; // 1. IMPORT PAGE BARU

function App() {
  // Ambil status login dari Redux global state
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes: Jika sudah login, redirect ke /home */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/home" replace />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <RegisterPage />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />

        {/* Protected Routes: Hanya bisa diakses jika sudah login */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        {/* 2. TAMBAHKAN ROUTE DETAIL DISINI */}
        <Route
          path="/thread/:id"
          element={
            isAuthenticated ? <ThreadDetailPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Root Redirect */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />

        {/* Fallback 404: Jika route tidak ditemukan */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;