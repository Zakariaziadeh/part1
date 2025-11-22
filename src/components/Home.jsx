import { useState } from "react";
import Footer from "./Footer";
import Main from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home({ homeLogOut }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <div>
        <Navbar
          sideBarToggled={() => {
            setIsOpen(!isOpen);
          }}
          onLogout={() => {
            homeLogOut();
          }}
        />
      </div>
      <div className="grid grid-cols-6 bg-gray-200">
        <div className={`col-span-1 ${isOpen ? "block" : "hidden"}`}>
          <Sidebar />
        </div>
        <div className="col-span-5">
          <Main />
        </div>
      </div>
      <div className="bg-blue-400 text-white">
        <Footer />
      </div>
    </div>
  );
}
export default Home;
