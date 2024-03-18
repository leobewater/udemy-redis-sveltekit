import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	// Test HSET (hash set) == "HSET car color red year 1950"
	await client.hSet('car1', {
		color: 'red',
		year: 1950
		// engine: { cylinders: 8 },
		// owner: null || '',
		// service: undefined || ''
	});

	await client.hSet('car2', {
		color: 'green',
		year: 1955
	});

	await client.hSet('car3', {
		color: 'blue',
		year: 1960
	});

	// const car = await client.hGetAll('car');
	// if (Object.keys(car).length === 0) {
	// 	console.log('Car not found, respond with 404');
	// 	return;
	// }
	// console.log(car);

	// pipeline
	const commands = [1, 2, 3].map((id) => {
		return client.hGetAll('car' + id);
	});
	const results = await Promise.all(commands);
	// const results = await Promise.all([
	//   client.hGetAll('car1'),
	//   client.hGetAll('car2'),
	//   client.hGetAll('car3'),
	// ]);
	console.log(results);
};
run();
