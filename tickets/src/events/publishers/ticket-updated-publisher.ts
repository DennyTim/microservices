import {
	Publisher,
	Subjects,
	TicketUpdatedEvent
} from "@ncticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
