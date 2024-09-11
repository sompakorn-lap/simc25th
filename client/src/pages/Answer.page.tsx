import AnswerList from "../components/AnswerList";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function AnswerPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <AnswerList />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default AnswerPage;
