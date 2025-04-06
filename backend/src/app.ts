import express from 'express';
const app = express();
const port = 3000;

import routes from './Routes';

app.get('/', routes);

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
