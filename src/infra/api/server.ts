import 'dotenv/config';
import { app } from './express';

const port: number = Number(process.env.PORT) || 3000;

app.listen(() => {
  console.log(`Server is listening on port ${port}`);
});