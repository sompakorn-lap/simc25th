import Exam from "../components/Exam";
import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ExamPage() {
  return (
    <ProtectedRouteWithDatetime
      startDatetime="Fri Sep 13 2024 16:00:00 GMT+0700 (Indochina Time)"
      endDatetime="Sun Sep 06 2024 23:59:59 GMT+0700 (Indochina Time)"
    >
      <ProtectedRouteWithRoles allowedRoles={["APPLICANT"]}>
        <section>
          <Exam />
        </section>
      </ProtectedRouteWithRoles>
    </ProtectedRouteWithDatetime>
  );
}

export default ExamPage;
