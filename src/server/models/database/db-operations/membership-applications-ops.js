import connect from '../configs/connectToDb';
import {
  ADD_NEW_APPLICATION,
  CHECK_EMAIL_FROM_TABLE_APPLICATIONS,
  GET_ALL_APPLICATIONS,
} from '../configs/SQLqueries';
import { validateApplicationForm } from '../../../middlewares/validations';

export const addNewMembershipApplication = (req, res) => {
  const {
    fname,
    middle_name,
    lname,
    country_residence,
    occupation,
    date_of_birth,
    email,
    phone_number,
    motivation,
  } = req.body;
  console.log(req.body);
  // before sending data to the db, i need to check if the form is valid
  const isFormValid = validateApplicationForm(
    fname,
    country_residence,
    occupation,
    date_of_birth,
    email,
    phone_number,
    motivation,
    res,
  );

  if (isFormValid) {
    connect().query(ADD_NEW_APPLICATION, [
      fname,
      middle_name,
      lname,
      country_residence,
      occupation,
      new Date(date_of_birth),
      email,
      phone_number,
      motivation,
    ], (err) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      res.status(200).send(`Dear ${fname},

      Thank you for applying to be part of the TPPCI Fellowship.
      We're excited that you're interested in joining our movement
      to build a  world free from teenages pregnancy.
      This message is a follow-up to your application.

      The feedback and next steps will be sent to you on ${email},
      so please look out for an email from us.

      Further communication would be sent to you upon successful
      application process.`);
    });
  } else {
    console.log('The form is not valid');
  }
};

export const checkIfEmailExistsFromTableApplications = (req, res) => {
  const { email } = req.body;
  connect().query(CHECK_EMAIL_FROM_TABLE_APPLICATIONS, [email], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows[0].exists);
  });
};

/** GETTING ALL MEMBERSHIP APPLICATIONS */
export const getAllMembershipApplications = (req, res) => {
  connect().query(GET_ALL_APPLICATIONS, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Something went wrong in the server, please try again!');
    }
    res.status(200).send(results.rows);
  });
};

/** GETTING CONFIRMED APPLICATIONS */
export const getConfirmedApplications = (req, res) => {

}
;