import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import Home from "./pages/Home";
// import EventList from "./pages/EventList";
// import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
