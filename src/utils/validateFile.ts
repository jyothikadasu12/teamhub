
export interface FileValidationResult {
  valid: boolean;
  error: string | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"];

export function validateFile(file: File): FileValidationResult {
  // 1. Check whether a file was selected.
  if (!file || file.size === 0) {
    return {
      valid: false,
      error: "Please select a non-empty file.",
    };
  }

  // 2. Check the file size.
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: "File size must not exceed 5 MB.",
    };
  }

  // 3. Check the file extension.
  const fileName = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_EXTENSIONS.some((extension) =>
    fileName.endsWith(extension)
  );

  if (!hasAllowedExtension) {
    return {
      valid: false,
      error: "Only PDF, JPG, PNG, DOC, and DOCX files are allowed.",
    };
  }

  // 4. Check the MIME type when the browser provides one.
  if (
    file.type &&
    !ALLOWED_FILE_TYPES.includes(file.type.toLowerCase())
  ) {
    return {
      valid: false,
      error: "The selected file type is not supported.",
    };
  }

  // 5. Validation passed.
  return {
    valid: true,
    error: null,
  };
}
