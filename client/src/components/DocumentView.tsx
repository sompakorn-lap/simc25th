import { useParams } from "react-router-dom";
import {
  useApproveDocumentByUserId,
  useGetDocumentByUserId,
} from "../api/document.api";

function DocumentView() {
  const { userId } = useParams() as { userId: string };
  const getDocumentByUserId = useGetDocumentByUserId(userId);
  const {
    transactionImageName = null,
    transcriptFileName = null,
    permissionFileName = null,
    status = "",
  } = getDocumentByUserId.data || {};

  const approveDocumentByUserId = useApproveDocumentByUserId(userId);

  if (!getDocumentByUserId.data) return null;
  return (
    <div>
      <img
        className="w-100 mb-2"
        src={`/api/file/${transactionImageName}`}
      />
      <embed
        className="w-100 mb-2"
        src={`/api/file/${transcriptFileName}`}
        height="500"
        type="application/pdf"
      />
      <embed
        className="w-100 mb-2"
        src={`/api/file/${permissionFileName}`}
        height="500"
        type="application/pdf"
      />
      {status === "SUBMITTED" ? (
        <button
          className="btn btn-success"
          onClick={() => approveDocumentByUserId.mutate()}
        >
          ยืนยันการตรวจสอบ
        </button>
      ) : null}
    </div>
  );
}

export default DocumentView;
