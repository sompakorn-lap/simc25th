import ProfileList from "../components/ProfileList";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ProfilesPage() {
  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <ProfileList />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default ProfilesPage;
