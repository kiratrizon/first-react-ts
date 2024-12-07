import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterForm, LoginForm } from "./Elements/Global/Home";
function App() {
  const entities: {
    [key: string]: {
      entitypath: string;
      apiEndpoint: string;
      entityName: string;
    }
  } = {
    user: {
      apiEndpoint: "/user",
      entitypath: "/",
      entityName: "user"
    },
    admin: {
      entitypath: "/admin",
      apiEndpoint: "/admin",
      entityName: "admin"
    }
  }
  return (
    <Router>
      <Routes>

        {/* For User Route */}
        <Route path={entities.user.entitypath}>
          <Route path="register" element={<RegisterForm entityProps={entities.user} />} />
          <Route path="login" element={<LoginForm entityProps={entities.user} />} />
        </Route>

        {/* For Admin Route */}
        <Route path={entities.admin.entitypath}>
          <Route path="register" element={<RegisterForm entityProps={entities.admin} />} />
          <Route path="login" element={<LoginForm entityProps={entities.admin} />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
