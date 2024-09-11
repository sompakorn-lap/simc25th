import { useForm } from "react-hook-form";
import DocumentForm, {
  DocumentFormSchema,
  DocumentFormType,
} from "../components/DocumentForm";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUploadDocument } from "../api/document.api";
import ProtectedRouteWithDatetime from "../components/ProtectedRouteWithDatetime";

function DocumentPage() {
  const { control, handleSubmit } = useForm<DocumentFormType>({
    resolver: yupResolver(DocumentFormSchema),
  });

  const uploadDocument = useUploadDocument();

  return (
    <ProtectedRouteWithDatetime
      startDatetime="Thu Oct 31 2024 12:00:00 GMT+0700 (Indochina Time)"
      endDatetime="Thu Nov 14 2024 23:59:59 GMT+0700 (Indochina Time)"
    >
      <ProtectedRouteWithRoles allowedRoles={["SELECTED"]}>
        <section>
          <DocumentForm
            control={control}
            onSubmit={handleSubmit((data: DocumentFormType) =>
              uploadDocument.mutate(data)
            )}
          />
        </section>
      </ProtectedRouteWithRoles>
    </ProtectedRouteWithDatetime>
  );
}

export default DocumentPage;
