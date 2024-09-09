import { useForm } from "react-hook-form";
import ProfileForm, {
  ProfileSchema,
  ProfileType,
} from "../components/ProfileForm";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetProfile,
  useSubmitProfile,
  useUpdateProfile,
} from "../api/profile.api";
import { useEffect } from "react";
import useFormDebounceCallback from "../hooks/useFormDebounceCallback";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";
import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";

function ProfilePage() {
  const { control, reset, watch, handleSubmit } = useForm<ProfileType>({
    resolver: yupResolver(ProfileSchema),
  });

  const getProfile = useGetProfile();
  const updateProfile = useUpdateProfile();
  const submitProfile = useSubmitProfile();

  useEffect(() => {
    if (getProfile.isSuccess) reset(getProfile.data);
  }, [getProfile.isSuccess]);

  useFormDebounceCallback(
    (data: Partial<ProfileType>) => updateProfile.mutate(data),
    watch,
    500
  );

  const { status = "" } = getProfile.data || {};

  return (
    <ProtectedRouteWithDatetime
      startDatetime="Mon Sep 09 2024 21:10:00 GMT+0700 (Indochina Time)"
      endDatetime="Mon Sep 09 2024 21:20:00 GMT+0700 (Indochina Time)"
    >
      <ProtectedRouteWithRoles allowedRoles={["SELECTED"]}>
        <section>
          <ProfileForm
            control={control}
            disabled={status !== "IN_PROGRESS"}
            submitButtonLabel="ยืนยันการส่ง"
            onSubmit={handleSubmit((data: ProfileType) =>
              submitProfile.mutate(data)
            )}
          />
        </section>
      </ProtectedRouteWithRoles>
    </ProtectedRouteWithDatetime>
  );
}

export default ProfilePage;
