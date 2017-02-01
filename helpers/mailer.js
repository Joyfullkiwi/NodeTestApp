module.exports = function (to, subject, text, html) {
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
        var email = 'joyfullkiwii@gmail.com';

        mailOptions = {
            from                : 'students@students.com',
            to                  : to,//'joyfullkiwii@gmail.com',
            subject             : subject, //'Hello',
            text                : text,
            generateTextFromHTML: true,
            html                : html//'<p>Hello!</p>'
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
