import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Recipes from "./pages/Recipes";
import Edit from "./pages/Edit";
import View from "./pages/View";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
