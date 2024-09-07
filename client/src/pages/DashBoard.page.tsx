import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function DashBoardPage() {
  return (
    <ProtectedRouteWithDatetime
      startDatetime="Fri Sep 06 2024 23:04:07 GMT+0700 (Indochina Time)"
      endDatetime="Fri Sep 06 2024 23:05:07 GMT+0700 (Indochina Time)"
    >
      <ProtectedRouteWithRoles allowedRoles={["APPLICANT"]}>
        <section>
          <h1>Dashboard Page</h1>
        </section>
      </ProtectedRouteWithRoles>
    </ProtectedRouteWithDatetime>
  );
}

export default DashBoardPage;
