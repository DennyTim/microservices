import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { OrderStatus } from "@ncticketing/common";

const generateObjectId = ():string  => {
	return mongoose.Types.ObjectId()
			.toHexString();
}

it('returns a 404 when purchasing an order that does not exist', async () => {
	const requestPayload = {
		token: 'asldkfj',
		orderId: generateObjectId()
	}

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin())
		.send(requestPayload)
		.expect(404)
});

it('returns a 401 when purchasing an order that doesn\'t belong to the user', async () => {
	const order = Order.build({
		id: generateObjectId(),
		userId: generateObjectId(),
		version: 0,
		price: 20,
		status: OrderStatus.Created
	});

	const requestPayload = {
		token: 'asldkfj',
		orderId: order.id
	}

	await order.save();
	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin())
		.send(requestPayload)
		.expect(401)
})

it('returns a 400 when purchasing a cancelled order', async () => {

})
