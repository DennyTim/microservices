import {
	ExpirationCompleteEvent,
	Publisher,
	Subjects
} from "@ncticketing/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
