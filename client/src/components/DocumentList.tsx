import { Link } from "react-router-dom";
import { useGetSubmittedDocuments } from "../api/document.api";

type DocumentType = {
  userId: string;
};

function DocumentList() {
  const { data = [] } = useGetSubmittedDocuments();

  return (
    <table className="table">
      <thead>
        <tr>
          <td>userId</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ userId }: DocumentType) => (
          <tr key={userId}>
            <td>
              <Link to={`/admin/approveDocument/${userId}`}>{userId}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DocumentList;
