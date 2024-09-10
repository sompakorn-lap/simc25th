import { Link, useParams } from "react-router-dom";
import { useGetSubmittedAnswerByQuestionId } from "../api/exam/answer.api";

type AnswerType = {
  userId: string;
};

function AnswerList() {
  const { questionId } = useParams() as { questionId: string };
  const { data = [] } = useGetSubmittedAnswerByQuestionId(questionId);

  return (
    <table className="table">
      <thead>
        <tr>
          <td>userId</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ userId }: AnswerType) => (
          <tr key={userId}>
            <td>
              <Link to={`/admin/approveAnswer/${userId}/${questionId}`}>
                {userId}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AnswerList;
