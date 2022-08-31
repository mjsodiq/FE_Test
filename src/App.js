import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
    const [currentUser, setCurrentUser] = useState("");

    const loginSuccess = (user) => {
        setCurrentUser(user);
    };

    return (
        <BrowserRouter>
            <div className="App min-w-screen min-h-screen flex-col bg-slate-200 items-center flex justify-between relative">
                <Routes>
                    <Route path="/" element={<Login loginSuccess={loginSuccess} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard/*" element={<Dashboard current_user={currentUser} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
