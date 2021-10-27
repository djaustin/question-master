import { NextApiRequest, NextApiResponse } from "next";
import RedisSMQ from "rsmq";

const emailDriver = new RedisSMQ({
    host: "127.0.0.1",
    port: 6379,
    ns: "rsmq"
});

export async function handleCreateEmailQueue(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    let queueName = "";
    let comment = req.body as string;

    emailDriver.listQueues(function (err, queues) {
        if(queues){
            if(queues.length > 0){
                queueName = queues[0];
            } else {
                emailDriver.createQueue({ qname: "emailQueue" }, function (err, resp) {
                    if(err) {
                        return res.json(0);
                    }
                    if (resp === 1) {
                        queueName = "emailQueue";
                    }
                });
            }
        } else {
            emailDriver.createQueue({ qname: "emailQueue" }, function (err, resp) {
                if(err) {
                    return res.json(0);
                }
                if (resp === 1) {
                    queueName = "emailQueue";
                }
            });
        }
    });
    emailDriver.sendMessage({ qname: queueName, message: comment}, function (err, resp) {
        if(err){
            return res.json(0);
        } else {
            return res.json(resp);
        }
    })
};