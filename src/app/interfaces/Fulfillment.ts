
import { FulfillmentStatus } from "./FulfillmentStatus";
import { Submission } from "./Submission";

export interface Fulfillment {
  fulfillmentId: number;
  fulfillmentDate: string;
  fulfillmentStatus: FulfillmentStatus;
  submission: Submission;
}