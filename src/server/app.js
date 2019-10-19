import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import tableCreation from './middlewares/table-migrations';

/** URLs */
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(tableCreation);
app.use('/js', express.static(path.join(__dirname, '../ui/js/build')));
app.use('/img', express.static(path.join(__dirname, '../ui/images')));

app.use('/', routes.myUrls);
app.use('/membership-apply', routes.applyApi);
app.use('/users', routes.usersApi);
app.use('/welcome-messages', routes.wlcmMsgsApi);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
