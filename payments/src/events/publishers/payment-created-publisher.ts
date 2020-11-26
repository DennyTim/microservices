import {
	PaymentCreatedEvent,
	Publisher,
	Subjects
} from "@ncticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
