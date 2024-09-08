import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home.page";
import SignUpPage from "./pages/SignUp.page";
import SignInPage from "./pages/SignIn.page";
import DashBoardPage from "./pages/DashBoard.page";
import QuestionEditor from "./components/QuestionEditor";
import ExamEditor from "./components/ExamEditor";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        width: "100vw",
        height: "100vh",
      }}
      data-bs-theme="dark"
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
          <Route
            path="/dashboard"
            element={<DashBoardPage />}
          />
          <Route
            path="/exam/:questionSet"
            element={<ExamEditor />}
          />
          <Route
            path="/test"
            element={
              <section>
                <QuestionEditor />
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
