import { useState } from "react";
import SidePopup from "./components/SidePopup";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [popup, setPopup] = useState(false);
  return (
    <div className="App">
      <div className="navbar"></div>
      <button className="outline-light" onClick={() => setPopup(true)}>
        Save segment
      </button>
      {popup && <SidePopup pop={setPopup} />}
    </div>
  );
}
export default App;
