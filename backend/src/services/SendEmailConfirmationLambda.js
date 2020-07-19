var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-west-1'});

exports.handler = (event, context, callback) => {
    const firstName = event.Records[0].messageAttributes.firstName.stringValue
    const email = event.Records[0].messageAttributes.email.stringValue
    const verificationToken = event.Records[0].messageAttributes.verificationToken.stringValue
    
     var params = {
      Source: "support@asystec-restaurant.co.uk",
      Destination: {
          ToAddresses: [email],
          CcAddresses: ["lucas.dasilva@asystec.ie"]
      },
      ReplyToAddresses: ["support@asystec-restaurant.co.uk"],
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: `Asystec RESTaurant Registration - Email Verification ${firstName}`
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <h3>Thank you for registering with Asystec RESTaurant</h3>
            <p>Hi ${firstName},</p>
            <p>Please click on the following link to verify your email address: https://asystec-restaurant.co.uk/users/verify/${verificationToken}</p>
            `
          }
        }
      }
    }
     ses.sendEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            
            console.log(data);
            context.succeed(event);
        }
    });
};
