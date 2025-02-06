import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import { Register, Login, Home } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          {/* Sign In */}
          <Route
            path="/sign-in"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <p>DASHBIARD</p>
              </Layout>
            }
          />

          <Route
            path="/events"
            element={
              <Layout>
                <p>DASHBIARD</p>
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
