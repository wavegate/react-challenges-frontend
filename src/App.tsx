import ChallengesPage from "./pages/ChallengesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyCKEditor from "./components/MyCKEditor";
import UsersPage from "./pages/UsersPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChallengesPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/users" element={<UsersPage />}></Route>
          <Route path="/users/login" element={<Login />}></Route>
          <Route path="/users/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
