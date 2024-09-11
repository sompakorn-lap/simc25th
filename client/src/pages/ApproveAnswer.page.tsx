import ApproveAnswerForm from "../components/ApproveAnswerForm";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ApproveAnswerPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <ApproveAnswerForm />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default ApproveAnswerPage;
