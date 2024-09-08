// import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import { useRefresh } from "../api/auth.api";
import ApplicantDashboard from "../components/ApplicantDashboard";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function DashBoardPage() {
  const { auth } = useRefresh();

  return (
    // <ProtectedRouteWithDatetime
    //   startDatetime="Fri Sep 06 2024 23:04:07 GMT+0700 (Indochina Time)"
    //   endDatetime="Fri Sep 06 2024 23:05:07 GMT+0700 (Indochina Time)"
    // >
    <ProtectedRouteWithRoles allowedRoles={["APPLICANT", "SELECTED", "ADMIN"]}>
      <section>
        {auth?.userRole === "APPLICANT" ? <ApplicantDashboard /> : null}
        {/* {auth?.userRole === "APPLICANT" ? <ApplicantDashboard/> : null}
        {auth?.userRole === "APPLICANT" ? <ApplicantDashboard/> : null} */}
      </section>
    </ProtectedRouteWithRoles>
    // </ProtectedRouteWithDatetime>
  );
}

export default DashBoardPage;
