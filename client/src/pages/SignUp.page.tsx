import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import SignUpForm from "../components/SignUpForm";

function SignUpPage() {
  return (
    <ProtectedRouteWithDatetime
      startDatetime="Fri Sep 13 2024 16:00:00 GMT+0700 (Indochina Time)"
      endDatetime="Sun Oct 06 2024 23:59:59 GMT+0700 (Indochina Time)"
    >
      <section>
        <h3>ลงทะเบียน</h3>
        <SignUpForm />
      </section>
    </ProtectedRouteWithDatetime>
  );
}

export default SignUpPage;
