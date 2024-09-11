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
import DocumentPage from "./pages/Document.page";
import ApproveAnswerPage from "./pages/ApproveAnswer.page";
import QuestionPage from "./pages/Question.page";
import AnswerPage from "./pages/Answer.page";
import ApproveDocumentPage from "./pages/ApproveDocument.page";
import DocumentsPage from "./pages/Documents.page";
import ProfilesPage from "./pages/Profiles.page";
import WebBg from "./assets/web-bg.png";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${WebBg})`,
        backgroundRepeat: "repeat-y",
        backgroundPosition: "0 0",
        backgroundSize: "cover",
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
          <Route
            path="/document"
            element={<DocumentPage />}
          />
          <Route path="/admin">
            <Route
              path="createQuestion"
              element={<CreateQuestionPage />}
            />
            <Route
              path="questions"
              element={<QuestionPage />}
            />
            <Route
              path="answers/:questionId"
              element={<AnswerPage />}
            />
            <Route
              path="documents"
              element={<DocumentsPage />}
            />
            <Route
              path="profiles"
              element={<ProfilesPage />}
            />
            <Route
              path="approveProfile/:userId"
              element={<ApproveProfilePage />}
            />
            <Route
              path="approveDocument/:userId"
              element={<ApproveDocumentPage />}
            />
            <Route
              path="approveAnswer/:userId/:questionId"
              element={<ApproveAnswerPage />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
