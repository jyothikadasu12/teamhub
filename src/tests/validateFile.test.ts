
import { describe, expect, it } from "vitest";
import { validateFile } from "../utils/validateFile";

describe("validateFile", () => {
  it("accepts a valid PDF file", () => {
    const file = new File(["sample content"], "report.pdf", {
      type: "application/pdf",
    });

    expect(validateFile(file)).toEqual({
      valid: true,
      error: null,
    });
  });

  it("rejects an empty file", () => {
    const file = new File([], "empty.pdf", {
      type: "application/pdf",
    });

    expect(validateFile(file)).toEqual({
      valid: false,
      error: "Please select a non-empty file.",
    });
  });

  it("rejects a file larger than 5 MB", () => {
    const file = new File(
      [new Uint8Array(5 * 1024 * 1024 + 1)],
      "large.pdf",
      { type: "application/pdf" }
    );

    expect(validateFile(file)).toEqual({
      valid: false,
      error: "File size must not exceed 5 MB.",
    });
  });

  it("rejects an unsupported file extension", () => {
    const file = new File(["content"], "script.exe", {
      type: "application/pdf",
    });

    expect(validateFile(file)).toEqual({
      valid: false,
      error: "Only PDF, JPG, PNG, DOC, and DOCX files are allowed.",
    });
  });

  it("rejects an unsupported MIME type", () => {
    const file = new File(["content"], "report.pdf", {
      type: "application/json",
    });

    expect(validateFile(file)).toEqual({
      valid: false,
      error: "The selected file type is not supported.",
    });
  });

  it("accepts an uppercase file extension", () => {
    const file = new File(["content"], "REPORT.PDF", {
      type: "application/pdf",
    });

    expect(validateFile(file)).toEqual({
      valid: true,
      error: null,
    });
  });

  it("accepts a supported extension when MIME type is empty", () => {
    const file = new File(["content"], "report.pdf", {
      type: "",
    });

    expect(validateFile(file)).toEqual({
      valid: true,
      error: null,
    });
  });
});
