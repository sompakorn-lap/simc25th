import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "./ui/Form";
import Input from "./ui/Input";
import Select from "./ui/Select";
import SubmitButton from "./ui/SubmitButton";
import axios, { AxiosError } from "axios";
import getFileData from "../utils/getFileData";
import { useState } from "react";

const SignUpFormSchema = yup.object({
  fullname: yup.string().required(),
  telephone: yup.string().required(),
  lineID: yup.string().required(),
  email: yup.string().required().email(),
  citizenId: yup.string().required(),
  citizenImage: yup
    .mixed<FileList>()
    .required()
    .test("fileSize", "The file is too large", (value: FileList) => {
      return value && value[0] && value[0].size <= 2000000;
    }),
  grade: yup.string().required(),
});

type SignUpFormType = yup.InferType<typeof SignUpFormSchema>;

function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpFormType>({
    resolver: yupResolver(SignUpFormSchema),
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const disabled = loading;

  async function onSubmit(data: SignUpFormType) {
    try {
      setLoading(true);
      const { citizenImage, ...signUpData } = data;
      const citizenImageData = await getFileData(citizenImage[0]);
      await axios.post("/api/auth/signup", { ...signUpData, citizenImageData });
      setSuccess(true);
    } catch (err) {
      console.log(err);
      const { response } = err as AxiosError;
      setError(response?.data as string);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h1>Loading</h1>;
  if (success) return <h1>น้องรอรับอีเมลเข้าสู่เว็บไซต์ได้เลย</h1>;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="mb-2">
        <span className="text-danger">{error}</span>
      </div>
    </Form>
  );
}

export default SignUpForm;
