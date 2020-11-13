import {
	OrderCancelledEvent,
	Publisher,
	Subjects
} from "@ncticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
