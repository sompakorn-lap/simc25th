import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home.page";
import SignUpPage from "./pages/SignUp.page";
import SignInPage from "./pages/SignIn.page";
import DashBoardPage from "./pages/DashBoard.page";
import CreateQuestionPage from "./pages/CreateQuestion.page";
import ExamPage from "./pages/Exam.page";
import ProfilePage from "./pages/Profile.page";
import ApproveProfilePage from "./pages/ApproveProfile.page";

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
            element={<ExamPage />}
          />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
          <Route path="/admin">
            <Route
              path="createQuestion"
              element={<CreateQuestionPage />}
            />
            <Route
              path="approveProfile/:userId"
              element={<ApproveProfilePage />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
