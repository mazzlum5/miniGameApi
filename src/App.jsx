import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import FlagGame from "./components/FlagGame";

function App() {
  const [page, setPage] = useState("login"); // "register" | "login" | "game"

  const handleLogin = () => setPage("game");
  const handleRegister = () => setPage("login");
  const goToRegister = () => setPage("register");

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      {page === "register" && <Register onRegister={handleRegister} />}
      {page === "login" && (
        <Login onLogin={handleLogin} goToRegister={goToRegister} />
      )}
      {page === "game" && <FlagGame />}
    </div>
  );
}

export default App;
