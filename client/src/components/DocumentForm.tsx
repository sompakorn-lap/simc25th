import { ComponentProps } from "react";
import { Control } from "react-hook-form";
import Form from "./ui/Form";
import Input from "./ui/Input";
import * as yup from "yup";
import SubmitButton from "./ui/SubmitButton";

type DocumentFormProps = {
  control: Control<any>;
} & ComponentProps<"form">;

export const DocumentFormSchema = yup.object({
  transactionImage: yup.mixed<FileList>().required(),
  transcriptFile: yup.mixed<FileList>().required(),
  permissionFile: yup.mixed<FileList>().required(),
});

export type DocumentFormType = yup.InferType<typeof DocumentFormSchema>;

function DocumentForm({ control, ...formProps }: DocumentFormProps) {
  return (
    <Form {...formProps}>
      <Input
        control={control}
        label=""
        name="transactionImage"
        disabled={false}
      />
      <Input
        control={control}
        label=""
        name="transcriptFile"
        disabled={false}
      />
      <Input
        control={control}
        label=""
        name="permissionFile"
        disabled={false}
      />
      <SubmitButton label="ยืนยันการส่ง" />
    </Form>
  );
}

export default DocumentForm;
