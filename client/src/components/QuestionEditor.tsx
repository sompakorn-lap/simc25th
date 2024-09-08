import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import Form from "./ui/Form";
import Input from "./ui/Input";
import SubmitButton from "./ui/SubmitButton";
import Select from "./ui/Select";
import getFileData from "../utils/getFileData";
import axios from "axios";

const QuestionSchema = yup.object({
  questionSet: yup.string().required(),
  questionType: yup.string().required(),
  questionText: yup.string().required(),
  questionImage: yup.mixed<FileList>().defined(),
  choices: yup.array(
    yup.object({
      text: yup.string().required(),
      score: yup.number().required(),
    })
  ),
});

type QuestionType = yup.InferType<typeof QuestionSchema>;

function QuestionEditor() {
  const { control, handleSubmit, watch, reset } = useForm<QuestionType>({
    resolver: yupResolver(QuestionSchema),
  });

  const choices = useFieldArray({ control, name: "choices" });

  function addChoice() {
    choices.append({ text: "", score: 0.0 });
  }

  async function onSubmit(data: QuestionType) {
    try {
      const { questionImage, ...questionData } = data;
      const questionImageData =
        questionImage?.length > 0 ? await getFileData(questionImage[0]) : null;
      axios.post("/api/exam/question", { ...questionData, questionImageData });
      reset();
    } catch (err) {}
  }

  const disabled = false;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        control={control}
        label="questionSet"
        name="questionSet"
        disabled={disabled}
      >
        <option value="IQ">IQ</option>
        <option value="ETHICS">ETHICS</option>
        <option value="KNOWLEDGE">KNOWLEDGE</option>
        <option value="SIRIRAJ">SIRIRAJ</option>
        <option value="CREATIVE">CREATIVE</option>
      </Select>
      <Select
        control={control}
        label="questionType"
        name="questionType"
        disabled={disabled}
      >
        <option value="WRITING">WRITING</option>
        <option value="CHOICE">CHOICE</option>
      </Select>
      <Input
        control={control}
        label="questionText"
        name="questionText"
        disabled={disabled}
      />
      <Input
        control={control}
        label="questionImage"
        name="questionImage"
        disabled={disabled}
        type="file"
      />

      {watch("questionType") === "CHOICE" ? (
        <>
          {choices.fields.map((field, index) => (
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
              }}
              className="mb-2"
              key={field.id}
            >
              <Input
                control={control}
                label={`text ${index}`}
                name={`choices.${index}.text`}
                disabled={disabled}
              />
              <Input
                control={control}
                label={`score ${index}`}
                name={`choices.${index}.score`}
                disabled={disabled}
              />
            </div>
          ))}
          <div className="mb-2">
            <button
              className="btn btn-primary w-100"
              onClick={addChoice}
            >
              add
            </button>
          </div>
        </>
      ) : null}
      <SubmitButton label="ยืนยันการสร้าง" />
    </Form>
  );
}

export default QuestionEditor;
