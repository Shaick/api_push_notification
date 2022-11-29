var admin = require("firebase-admin");
var fcm = require("fcm-notification");

var serviceAccount = require("../config/push_notification_key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

exports.sendPushNotification = (req, res, next) => {
    try {
        let message = {
            notification: {
                title: "Testando Notificação",
                body: "Mensagem Notificada"
            },
            data: {
                orderId: "1223456",
                orderDate: "2022-11-28",
            },
            token: req.body.fcm_token,
        };

        FCM.send(message, function(err, resp) {
            if(err) {
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: "Notificação enviada!"
                })
            }
        });
    }
    catch(err) {
        throw err;
    }
};