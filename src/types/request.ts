
export type RequestStatus = "idle" | "loading" | "success" | "error";

export interface RequestState {
  status: RequestStatus;
  error: string | null;
}
