import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Aboutus from "./components/Aboutus";


function App() {
  return (
    <div
    className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/images/mashaallogo.png')` }}
    >
      <div>
      <Navbar />
      <Routes>
        
      <Route path="/feedbacks" Component={Feedback} />
        <Route path="/aboutus" Component={Aboutus} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
