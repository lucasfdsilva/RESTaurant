var aws = require('aws-sdk');
var ses = new aws.SES({region: 'eu-west-1'});

exports.handler = (event, context, callback) => {
    const bookingID = event.Records[0].messageAttributes.bookingID.stringValue
    const date = event.Records[0].messageAttributes.date.stringValue
    const startTime = event.Records[0].messageAttributes.startTime.stringValue
    const duration = event.Records[0].messageAttributes.duration.stringValue
    const numberOfPeople = event.Records[0].messageAttributes.numberOfPeople.stringValue
    
     var params = {
      Source: "support@asystec-restaurant.co.uk",
      Destination: {
          ToAddresses: ["lucas.dasilva@asystec.ie"]
      },
      ReplyToAddresses: ["support@asystec-restaurant.co.uk"],
      Message: {
        Subject: {
          Charset: "UTF-8",
          Data: `New Booking Confirmation - Booking ID: ${bookingID}`
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <h3>Thank you for booking with us</h3>
            <p>Below are your booking details. You can also see <a href="https://asystec-restaurant.co.uk/bookings">your bookings</a> at your account at any time.</p>
            <p><b>Booking ID:</b> ${bookingID}</p>
            <p><b>Date:</b> ${date}</p>
            <p><b>Start Time:</b> ${startTime}</p>
            <p><b>Duration:</b> ${duration} minutes</p>
            <p><b>Number of People:</b> ${numberOfPeople}</p>
            </br>
            <p>Thank you</p>
            <p>Asystec Restaurant</p>
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
