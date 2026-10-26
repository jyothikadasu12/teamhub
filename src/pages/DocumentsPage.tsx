
import { useState } from "react";
import type {
  DocumentCategory,
  TeamDocument,
} from "../types/document";
import { uploadDocument } from "../services/documentApi";
import "../styles/documents.css";

function getCategory(file: File): DocumentCategory {
  const name = file.name.toLowerCase();

  if (file.type === "application/pdf" || name.endsWith(".pdf")) {
    return "PDF";
  }

  if (file.type.startsWith("image/")) {
    return "Image";
  }

  if (name.endsWith(".doc") || name.endsWith(".docx")) {
    return "Word";
  }

  return "Other";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function DocumentsPage() {
  const [documents, setDocuments] = useState<TeamDocument[]>([]);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(event.target.files ?? []);

    // Allow selecting the same file again later.
    event.target.value = "";

    if (selectedFiles.length === 0) return;

    setError("");
    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        const temporaryId = crypto.randomUUID();

        const pendingDocument: TeamDocument = {
          id: temporaryId,
          name: file.name,
          file,
          size: file.size,
          type: file.type,
          category: getCategory(file),
          status: "Uploading",
          uploadedAt: new Date().toISOString(),
          uploadedBy: "TeamHub Admin",
          progress: 0,
        };

        setDocuments((current) => [
          pendingDocument,
          ...current,
        ]);

        try {
          const result = await uploadDocument(
            file,
            "TeamHub Admin"
          );

          setDocuments((current) =>
            current.map((document) =>
              document.id === temporaryId
                ? {
                    ...document,
                    ...result,
                    file,
                    category: getCategory(file),
                    status: "Uploaded",
                    progress: 100,
                  }
                : document
            )
          );
        } catch (uploadError: unknown) {
          const message =
            uploadError instanceof Error
              ? uploadError.message
              : "Unable to upload this document.";

          setDocuments((current) =>
            current.map((document) =>
              document.id === temporaryId
                ? {
                    ...document,
                    status: "Failed",
                    progress: 0,
                    error: message,
                  }
                : document
            )
          );

          setError(`${file.name}: ${message}`);
        }
      }
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <main className="documents-page">
      <p className="eyebrow">TEAMHUB / FILES</p>

      <h1>Document Management</h1>

      <p className="page-description">
        Select, validate, and manage employee documents.
      </p>

      <section className="document-upload-panel">
        <h2>Upload documents</h2>

        <p>
          Supported files: PDF, JPG, PNG, DOC and DOCX.
          Maximum size: 5 MB per file.
        </p>

        <label className="document-file-label">
          Choose files
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {isUploading && (
          <p role="status">Processing your documents...</p>
        )}

        {error && (
          <p className="document-error" role="alert">
            {error}
          </p>
        )}
      </section>

      <section className="document-list-section">
        <h2>Documents ({documents.length})</h2>

        {documents.length === 0 ? (
          <p>No documents selected yet.</p>
        ) : (
          <div className="document-list">
            {documents.map((document) => (
              <article
                className="document-card"
                key={document.id}
              >
                <div>
                  <h3>{document.name}</h3>

                  <p>
                    {document.category} ·{" "}
                    {formatFileSize(document.size)}
                  </p>

                  <p>
                    Uploaded by {document.uploadedBy}
                  </p>
                </div>

                <span
                  className={`document-status document-status-${document.status.toLowerCase()}`}
                >
                  {document.status}
                </span>

                {document.error && (
                  <p className="document-error">
                    {document.error}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default DocumentsPage;
