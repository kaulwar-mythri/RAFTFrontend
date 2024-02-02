// submission.model.ts

import { BenchCandidate } from "./Bench";
import { Requirement } from "./Requirement";
import { SubmissionStatus } from "./SubmissionStatus";

export interface Submission {
  submissionId?: number;
  submissionDate?: string;
  feedback?: string;
  submissionStatus?: SubmissionStatus;
  requirement?: Requirement;
  benchCandidate?: BenchCandidate;
}