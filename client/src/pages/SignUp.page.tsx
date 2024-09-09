import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";
import SignUpForm from "../components/SignUpForm";

function SignUpPage() {
  return (
    <ProtectedRouteWithDatetime
      startDatetime="Mon Sep 09 2024 21:00:00 GMT+0700 (Indochina Time)"
      endDatetime="Mon Sep 09 2024 22:00:00 GMT+0700 (Indochina Time)"
    >
      <section>
        <h3>ลงทะเบียน</h3>
        <SignUpForm />
      </section>
    </ProtectedRouteWithDatetime>
  );
}

export default SignUpPage;
