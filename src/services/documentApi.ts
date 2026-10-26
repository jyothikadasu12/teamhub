
import type {
  DocumentUploadResponse,
} from "../types/document";

import { validateFile } from "../utils/validateFile";

const SIMULATED_UPLOAD_DELAY = 800;

/**
 * Simulates uploading a document.
 *
 * This is a frontend demo, not a real server upload.
 */
export async function uploadDocument(
  file: File,
  uploadedBy: string
): Promise<DocumentUploadResponse> {
  // 1. Validate the selected file.
  const validation = validateFile(file);

  if (!validation.valid) {
    throw new Error(
      validation.error ?? "The selected file is invalid."
    );
  }

  // 2. Simulate the time taken by an upload.
  await new Promise<void>((resolve) => {
    setTimeout(resolve, SIMULATED_UPLOAD_DELAY);
  });

  // 3. Return the shape expected by TeamHub.
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    uploadedAt: new Date().toISOString(),
    uploadedBy,
  };
}
