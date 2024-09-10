import { Link } from "react-router-dom";
import { useGetQuestionList } from "../api/exam/question.api";

type QuestionType = {
  questionId: string;
  questionSet: string;
  questionType: string;
  questionText: string;
  questionImageName: string;
};

function QuestionList() {
  const { data = [] } = useGetQuestionList();

  return (
    <table className="table">
      <thead>
        <tr>
          <td>questionId</td>
          <td>questionSet</td>
          <td>questionType</td>
          <td>questionText</td>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            questionId,
            questionSet,
            questionType,
            questionText,
          }: QuestionType) => (
            <tr key={questionId}>
              <td>
                <Link to={`/admin/answers/${questionId}`}>{questionId}</Link>
              </td>
              <td>{questionSet}</td>
              <td>{questionType}</td>
              <td>{questionText}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default QuestionList;
