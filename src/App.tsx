// import { Routes, Route } from "react-router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { fetchAllTasks } from "./redux/selectors";
import { Sidebar } from './Components/Sidebar';
import { Home } from './Components/Home';
import { Stack } from "@mui/material";

function App() {

  return (
    <Stack height={'100%'}>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </Router>
    </Stack>
  );
}

export default App;