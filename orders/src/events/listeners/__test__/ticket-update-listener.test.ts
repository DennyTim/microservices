import mongoose from 'mongoose';
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket';
import { TicketCreatedEvent } from "@ncticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
	// Create a listener
	const listener = new TicketUpdatedListener(natsWrapper.client);

	// Create and save a ticket
	const ticket = Ticket.build({
		id: mongoose.Types.ObjectId()
					.toHexString(),
		title: 'concert',
		price: 20,
	});
	await ticket.save();

	const data: TicketCreatedEvent['data'] = {
		id: ticket.id,
		version: ticket.version + 1,
		title: 'new concert',
		price: 999,
		userId: 'John Doe'
	};

	// create a fake message object
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn()
	};

	return { msg, data, ticket, listener };
};

it('finds, updates, and saves a ticket', async () => {
	const { msg, data, ticket, listener } = await setup();

	await listener.onMessage(data, msg);

	const updatedTicket = await Ticket.findById(ticket.id);

	expect(updatedTicket!.title)
		.toEqual(data.title);
	expect(updatedTicket!.price)
		.toEqual(data.price);
	expect(updatedTicket!.version)
		.toEqual(data.version);
});

it('ack the message', async () => {
	const { msg, data, listener } = await setup();

	await listener.onMessage(data, msg);

	expect(msg.ack)
		.toHaveBeenCalled();
});


it('does not call ack if the event has a skipped version number', async () => {
	const { msg, data, listener, ticket } = await setup();

	data.version = 10;

	try {
		await listener.onMessage(data, msg);
	} catch (err) {
	}

	expect(msg.ack)
		.not
		.toHaveBeenCalled();
});
