
export type DocumentStatus = "Uploading" | "Uploaded" | "Failed";

export type DocumentCategory =
  | "PDF"
  | "Image"
  | "Word"
  | "Other";

export interface TeamDocument {
  id: string;
  name: string;
  file: File;
  size: number;
  type: string;
  category: DocumentCategory;
  status: DocumentStatus;
  uploadedAt: string;
  uploadedBy: string;
  progress: number;
  error?: string;
}

export interface DocumentUploadResponse {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface DocumentFilters {
  search: string;
  category: DocumentCategory | "All";
  status: DocumentStatus | "All";
}

export interface DocumentUploadProgress {
  documentId: string;
  progress: number;
}
