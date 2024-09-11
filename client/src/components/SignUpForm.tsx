import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from "./ui/Form";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { useSignUp } from "../api/auth.api";
import { AxiosError } from "axios";
import Loading from "./Loading";
import SubmitButton from "./ui/SubmitButton";
import { useState } from "react";

const SignUpFormSchema = yup.object({
  fullname: yup.string().required(),
  telephone: yup.string().required(),
  lineID: yup.string().required(),
  email: yup.string().required().email(),
  citizenId: yup.string().required(),
  citizenImage: yup.mixed<FileList>().required(),
  grade: yup.string().required(),
});

type SignUpFormType = yup.InferType<typeof SignUpFormSchema>;

function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpFormType>({
    resolver: yupResolver(SignUpFormSchema),
  });

  const [allow, setAllow] = useState<boolean>(false);

  const { mutate, isPending, isSuccess, error } = useSignUp();
  const errorMessage = (error as AxiosError)?.response?.data as string;
  const disabled = isPending;

  if (isPending) return <Loading />;
  if (isSuccess) return <h1>น้องรอรับอีเมลเข้าสู่เว็บไซต์ได้เลย</h1>;
  return (
    <Form onSubmit={handleSubmit((data: SignUpFormType) => mutate(data))}>
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
      <div className="mb-2 rounded border p-2">
        <p className="mb-2">
          นโยบายข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
          (PDPA)
          การเก็บข้อมูลในครั้งนี้ดำเนินการจัดเก็บข้อมูลโดยทีมงานและคณะกรรมการค่ายเส้นทางสู่หมอศิริราช
          ครั้งที่ 25 เพื่อใช้ในการคัดเลือกนักเรียนมัธยมศึกษาตอนปลายเท่านั้น
          และจะถูกทำลายภายใน 1
          ปีหลังสิ้นสุดวาระการปฏิบัติงานของทีมงานและคณะกรรมการค่ายเส้นทางสู่หมอศิริราช
          ครั้งที่ 25 เว้นแต่จะมีการดำเนินการตามที่ท่านให้ความยินยอมไว้ [
          <a href="https://docs.google.com/document/d/14fAVxh2lfIlln4U909tRqyMizq7k89hNa0uinrcLmcs/edit">
            รายละเอียดเพิ่มเติม
          </a>
          ]
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="allow"
            onChange={(event) => setAllow(event.target.checked)}
          />
          <label
            className="form-check-label"
            htmlFor="allow"
          >
            {" "}
            Allow
          </label>
        </div>
      </div>
      <SubmitButton
        label="ยืนยันการลงทะเบียน"
        disabled={!allow}
      />
      <div className="mb-2">
        <span className="text-danger">{errorMessage}</span>
      </div>
    </Form>
  );
}

export default SignUpForm;
