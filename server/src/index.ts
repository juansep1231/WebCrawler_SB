import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.listen(3001, () => console.log('Server running on port 3001'));
