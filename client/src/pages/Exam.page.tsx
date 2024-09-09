import Exam from "../components/Exam";
import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ExamPage() {
  return (
    <ProtectedRouteWithDatetime
      startDatetime="Mon Sep 09 2024 21:00:00 GMT+0700 (Indochina Time)"
      endDatetime="Mon Sep 09 2024 21:15:00 GMT+0700 (Indochina Time)"
    >
      <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
        <section>
          <Exam />
        </section>
      </ProtectedRouteWithRoles>
    </ProtectedRouteWithDatetime>
  );
}

export default ExamPage;
