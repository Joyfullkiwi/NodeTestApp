module.exports = function () {
    var nodemailer = require('nodemailer');
    var noReplay = {
        host     : 'smtp.gmail.com',
        port     : 465,
        ignoreTLS: false,
        auth     : {
            user: '', // email
            pass: '' // pass
        },
        tls      : {rejectUnauthorized: false}
    };

    this.sendEmail = function (options, cb) {
        var mailOptions;
        var email = 'liliya.mykhailova@thinkmobiles.com';

        mailOptions = {
            from                : 'students@students.com',
            to                  : email,
            subject             : 'Hello',
            generateTextFromHTML: true,
            html                : '<p>Hello!</p>'
        };

        var transport = nodemailer.createTransport(noReplay);

        transport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                if (cb && (typeof cb === 'function')) {
                    cb(err);
                }
            } else {
                console.log('Message sent: ' + response.message);
                if (cb && (typeof cb === 'function')) {
                    cb(null, response);
                }
            }
        });

    };
};