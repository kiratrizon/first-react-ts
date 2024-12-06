import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./Elements/Global/Home";
function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Route */}
        <Route path="/">
          {/* Index Route */}
          <Route path="register" element={<RegisterForm />} />
          {/* Other Child Routes */}
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
