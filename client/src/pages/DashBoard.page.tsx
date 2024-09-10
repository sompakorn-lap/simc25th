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
    <ProtectedRouteWithRoles allowedRoles={["APPLICANT", "SELECTED", "ADMIN"]}>
      {auth?.userRole === "APPLICANT" ? <ApplicantDashboard /> : null}
      {auth?.userRole === "SELECTED" ? <SelectedDashboard /> : null}
      {auth?.userRole === "PARTICIPANT" ? <ParticipantDashboard /> : null}
      {auth?.userRole === "ADMIN" ? <AdminDashboard /> : null}
    </ProtectedRouteWithRoles>
  );
}

export default DashBoardPage;
