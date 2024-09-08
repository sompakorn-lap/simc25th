// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   useGetAnswer,
//   useSubmitAnswer,
//   useUpdateAnswer,
// } from "../api/exam/answer.api";
// import useFormDebounceCallback from "../hooks/useFormDebounceCallback";

// const AnswerSchema = yup.object({ answer: yup.string().required() });
// type AnswerType = yup.InferType<typeof AnswerSchema>;

// function AnswerEditor() {
//   const { register, control, reset, handleSubmit } = useForm<AnswerType>({
//     resolver: yupResolver(AnswerSchema),
//   });

//   return (
//     <div>AnswerEditor</div>
//   )
// }

// export default AnswerEditor
