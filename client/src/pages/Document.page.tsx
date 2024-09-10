import { useForm } from "react-hook-form";
import DocumentForm, {
  DocumentFormSchema,
  DocumentFormType,
} from "../components/DocumentForm";
import ProtectedRouteWithRoles from "../components/ProtectedRouteWithRoles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUploadDocument } from "../api/document.api";

function DocumentPage() {
  const { control, handleSubmit } = useForm<DocumentFormType>({
    resolver: yupResolver(DocumentFormSchema),
  });

  const uploadDocument = useUploadDocument();

  return (
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
  );
}

export default DocumentPage;
