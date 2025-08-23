import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SuggestTokenPage from "./pages/SuggestTokenPage";


function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = !!localStorage.getItem("Ya.Oauth.Sdk.Token"); 
  return isAuth ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/suggest/token" element={<SuggestTokenPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
