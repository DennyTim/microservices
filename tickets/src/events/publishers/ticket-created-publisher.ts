import {
	Publisher,
	Subjects,
	TicketCreatedEvent
} from "@ncticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
