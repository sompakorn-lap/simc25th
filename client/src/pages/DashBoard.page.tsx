// import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import { useRefresh } from "../api/auth.api";
import ApplicantDashboard from "../components/dashboard/ApplicantDashboard";
import SelectedDashboard from "../components/dashboard/SelectedDashboard";
import ParticipantDashboard from "../components/dashboard/ParticipantDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";
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
        {auth?.userRole === "SELECTED" ? <SelectedDashboard /> : null}
        {auth?.userRole === "PARTICIPANT" ? <ParticipantDashboard /> : null}
        {auth?.userRole === "ADMIN" ? <AdminDashboard /> : null}
      </section>
    </ProtectedRouteWithRoles>
    // </ProtectedRouteWithDatetime>
  );
}

export default DashBoardPage;
