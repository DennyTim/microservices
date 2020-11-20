import {
	OrderCreatedEvent,
	Publisher,
	Subjects
} from "@ncticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
