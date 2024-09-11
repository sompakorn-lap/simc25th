import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";
import QuestionList from "../components/QuestionList";

function QuestionPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <QuestionList />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default QuestionPage;
