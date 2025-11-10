import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SongsList from "./pages/SongsList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongsList />} />
      </Routes>
    </Router>
  );
}
