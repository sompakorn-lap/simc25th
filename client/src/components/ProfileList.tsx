import { Link } from "react-router-dom";
import { useGetSubmittedProfile } from "../api/profile.api";

type ProfileType = {
  userId: string;
};

function ProfileList() {
  const { data = [] } = useGetSubmittedProfile();

  return (
    <table className="table">
      <thead>
        <tr>
          <td>userId</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ userId }: ProfileType) => (
          <tr key={userId}>
            <td>
              <Link to={`/admin/approveProfile/${userId}`}>{userId}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProfileList;
