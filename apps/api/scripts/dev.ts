import { createApi } from '../src';

const api = createApi();
const port = 8787;

api.listen(port, () => {
	console.log(`Restock API is running at http://localhost:${port.toString()}`);
});
