var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-west-1'});

exports.handler = (event, context, callback) => {
     var params = {
        Source: "support@asystec-restaurant.co.uk",
        Destination: {
            ToAddresses: ["lucas.dasilva@asystec.ie"]
        },
        ReplyToAddresses: ["support@asystec-restaurant.co.uk"],
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: "Asystec RESTaurant Registration - Email Verification"
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: "<p>Please click on the following link to verify your email address: http://legionofheroes.co.uk/organizations/verify/${verificationToken}</p>`"
            }
          }
        }
    };
    
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
