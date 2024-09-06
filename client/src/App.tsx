import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home.page";
import SignUpPage from "./pages/SignUp.page";
import SignInPage from "./pages/SignIn.page";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/signup"
            element={<SignUpPage />}
          />
          <Route
            path="/signin/:signinToken"
            element={<SignInPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
