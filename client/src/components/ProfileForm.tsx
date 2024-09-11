import { ComponentProps } from "react";
import { Control } from "react-hook-form";
import * as yup from "yup";
import Form from "./ui/Form";
import Input from "./ui/Input";
import SubmitButton from "./ui/SubmitButton";
import Select from "./ui/Select";

export const ProfileSchema = yup.object({
  // personal data
  citizenId: yup.string().required(),
  fullname: yup.string().required(),
  age: yup.number().required(),
  gender: yup.string().required(),
  school: yup.string().required(),
  grade: yup.string().required(),
  // contact
  telephone: yup.string().required(),
  address: yup.string().required(),
  lineID: yup.string().required(),
  email: yup.string().required(),
  // parent
  parentFullname: yup.string().required(),
  relation: yup.string().required(),
  parentTelephone: yup.string().required(),
  // medical data
  medicalCondition: yup.string().required(),
  medicalRequirement: yup.string().required(),
  allergy: yup.string().required(),
  dietaryLimitation: yup.string().required(),
});

export type ProfileType = yup.InferType<typeof ProfileSchema>;

type ProfileFormProps = {
  control: Control<any>;
  disabled: boolean;
  submitButtonLabel: string;
} & ComponentProps<"form">;

function ProfileForm({
  control,
  disabled,
  submitButtonLabel,
  ...profileFormProps
}: ProfileFormProps) {
  return (
    <Form {...profileFormProps}>
      <Input
        control={control}
        label="หมายเลขบัตรประจำตัวประชาชน"
        name="citizenId"
        disabled={true}
      />
      <Input
        control={control}
        label="ชื่อ-นามสกุล"
        name="fullname"
        disabled={true}
      />
      <Input
        control={control}
        label="อายุ"
        name="age"
        disabled={disabled}
      />
      <Select
        control={control}
        label="เพศ"
        name="gender"
        disabled={disabled}
      >
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
      </Select>
      <Input
        control={control}
        label="สถานศึกษา"
        name="school"
        disabled={disabled}
      />
      <Input
        control={control}
        label="ระดับชั้นการศึกษา"
        name="grade"
        disabled={true}
      />
      <hr />
      <Input
        control={control}
        label="เบอร์โทรศัพท์"
        name="telephone"
        disabled={true}
      />
      <Input
        control={control}
        label="ที่อยู่"
        name="address"
        disabled={disabled}
      />
      <Input
        control={control}
        label="ID line"
        name="lineID"
        disabled={true}
      />
      <Input
        control={control}
        label="email"
        name="email"
        disabled={true}
      />
      <hr />
      <Input
        control={control}
        label="ชื่อผู้ปกครอง"
        name="parentFullname"
        disabled={disabled}
      />
      <Input
        control={control}
        label="ความเกี่ยวข้องกับผู้ปกครอง "
        name="relation"
        disabled={disabled}
      />
      <Input
        control={control}
        label="เบอร์โทรติดต่อผู้ปกครอง"
        name="parentTelephone"
        disabled={disabled}
      />
      <hr />
      <Input
        control={control}
        label="โรคประจำตัว"
        name="medicalCondition"
        disabled={disabled}
      />
      <Input
        control={control}
        label="ยาประจำตัว"
        name="medicalRequirement"
        disabled={disabled}
      />
      <Input
        control={control}
        label="อาหารที่เเพ้ ยาที่เเพ้"
        name="allergy"
        disabled={disabled}
      />
      <Input
        control={control}
        label="อาหารที่ไม่รับประทาน (อาหารรสจัด ฮาลาล มังสวิรัต)"
        name="dietaryLimitation"
        disabled={disabled}
      />
      <SubmitButton
        label={submitButtonLabel}
        disabled={false}
      />
    </Form>
  );
}

export default ProfileForm;
