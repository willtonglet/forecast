import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForecastInputs from "./components/ForecastInputs";
import { RecoilRoot } from "recoil";
import ForecastCards from "./components/ForecastCards";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/add-forecast" />} />
          <Route path="/add-forecast" element={<ForecastInputs />} />
          <Route path="/forecast" element={<ForecastCards />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
