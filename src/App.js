import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Aboutus from "./components/Aboutus";
import Home from "./components/Home";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/images/mashaallogo.png')` }}
    >
      <div>
        {/* Navbar should be at the top, outside Routes */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedbacks" element={<Feedback />} />
          <Route path="/aboutus" element={<Aboutus />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;