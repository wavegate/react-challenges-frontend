import Challenges from "./pages/Challenges";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className={`mb-6`}>
          <Routes>
            <Route path="/" element={<Challenges />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
