import DocumentView from "../components/DocumentView";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ApproveDocumentPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <DocumentView />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default ApproveDocumentPage;
