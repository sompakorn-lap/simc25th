import DocumentList from "../components/DocumentList";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function DocumentsPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <DocumentList />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default DocumentsPage;
