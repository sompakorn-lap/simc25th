import { useParams } from "react-router-dom";
import {
  useApproveProfileByUserId,
  useGetProfileByUserId,
} from "../api/profile.api";
import ProfileForm, {
  ProfileSchema,
  ProfileType,
} from "../components/ProfileForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";

function ApproveProfilePage() {
  const { control, reset, handleSubmit } = useForm<ProfileType>({
    resolver: yupResolver(ProfileSchema),
  });

  const { userId } = useParams() as { userId: string };

  const getProfile = useGetProfileByUserId(userId);
  const approveProfile = useApproveProfileByUserId(userId);

  useEffect(() => {
    if (getProfile.isSuccess) reset(getProfile.data);
  }, [getProfile.isSuccess]);

  return (
    <ProtectedRouteWithRoles allowedRoles={["ADMIN"]}>
      <section>
        <ProfileForm
          control={control}
          disabled={true}
          submitButtonLabel="ยืนยันการตรวจ"
          onSubmit={handleSubmit(() => approveProfile.mutate())}
        />
      </section>
    </ProtectedRouteWithRoles>
  );
}

export default ApproveProfilePage;
