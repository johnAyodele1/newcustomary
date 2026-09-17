import { createApp } from './app.js';
import { env } from './shared/config/env.js';

const app = createApp();
app.listen(env.PORT, () => console.log(`Customry API listening on http://localhost:${env.PORT}`));
