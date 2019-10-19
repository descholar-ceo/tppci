import dotenv from 'dotenv';
import connect from '../../configs/connectToDb';
import { CREATE_TABLE_APPLICATIONS, CREATE_TABLE_USERS, CREATE_TABLE_WELCOME_MSGS } from '../../configs/SQLqueries';

dotenv.config();

const migrateAllTables = async (isDone) => {
  console.log('creating table applications_for_membership ... ');
  await connect().query(CREATE_TABLE_APPLICATIONS);
  console.log('creating table users ... ');
  await connect().query(CREATE_TABLE_USERS);
  console.log('creating table wlcm_msgs ...');
  await connect().query(CREATE_TABLE_WELCOME_MSGS);

  if (isDone) { isDone(); }
  process.exit(0);
};

export default migrateAllTables;