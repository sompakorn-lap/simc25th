import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "./ui/Form";
import Input from "./ui/Input";
import Select from "./ui/Select";
import SubmitButton from "./ui/SubmitButton";
import axios from "axios";
import getFileData from "../utils/getFileData";

const SignUpFormSchema = yup.object({
  fullname: yup.string().required(),
  telephone: yup.string().required(),
  lineID: yup.string().required(),
  email: yup.string().required().email(),
  citizenId: yup.string().required(),
  citizenImage: yup.mixed().required(),
  grade: yup.string().required(),
});

type SignUpFormType = yup.InferType<typeof SignUpFormSchema>;

function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpFormType>({
    resolver: yupResolver(SignUpFormSchema),
  });

  const disabled = false;

  async function onSubmit(data: SignUpFormType) {
    try {
      const { citizenImage, ...signUpData } = data;
      const citizenImageData = await getFileData(citizenImage[0]);
      await axios.post("/api/auth/signup", { ...signUpData, citizenImageData });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <h3>ลงทะเบียน</h3>
      </div>
      <Input
        control={control}
        name="fullname"
        label="ชื่อ-นามสกุล"
        disabled={disabled}
      />
      <Input
        control={control}
        name="telephone"
        label="เบอร์โทร"
        type="tel"
        disabled={disabled}
      />
      <Input
        control={control}
        name="lineID"
        label="ID line"
        disabled={disabled}
      />
      <Input
        control={control}
        name="email"
        label="อีเมล"
        type="email"
        disabled={disabled}
      />
      <Input
        control={control}
        name="citizenId"
        label="หมายเลขบัตรประจำตัวประชาชน"
        disabled={disabled}
      />
      <Input
        control={control}
        name="citizenImage"
        label="สำเนาบัตรประจำตัวประชาชน"
        type="file"
        disabled={disabled}
      />
      <Select
        control={control}
        name="grade"
        label="ระดับชั้นการศึกษา"
        disabled={disabled}
      >
        <option value="มัธยมศึกษาชั้นปีที่ 4">มัธยมศึกษาชั้นปีที่ 4</option>
        <option value="มัธยมศึกษาชั้นปีที่ 5">มัธยมศึกษาชั้นปีที่ 5</option>
        <option value="มัธยมศึกษาชั้นปีที่ 6">มัธยมศึกษาชั้นปีที่ 6</option>
      </Select>
      <SubmitButton label="ยืนยันการลงทะเบียน" />
    </Form>
  );
}

export default SignUpForm;
