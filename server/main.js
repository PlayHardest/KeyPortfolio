import { Meteor } from 'meteor/meteor';
import '../lib/collection.js';

Meteor.startup(() => {
	process.env.MAIL_URL = "smtps://postmaster%40sandbox3792583741c948cc94e90a9853042b2c.mailgun.org:75d2f9eecb28a778e86825bf2896b71c-4d640632-e9c63b6a@smtp.mailgun.org:465"
  // code to run on server at startup
});


//Email.send only works on the server. Therefore a server method must be set up for
//a client to call to send an email
Meteor.methods({//Define a method that the client can call
    sendEmail(to, from, subject, text) {
        check([to, from, subject, text], [String]);//Check to ensure that all 
        //arguments are strings
        this.unblock();//allows other method calls from the same client to start
        //running, without waiting for the email sending method to complete
        Email.send({ to, from, subject, text});
    }
});


// Email.send({
//   to: "to.address@email.com",
//   from: "from.address@email.com",
//   subject: "Example Email",
//   text: "The contents of our email in plain text.",
// });