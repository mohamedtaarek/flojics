import amqp from 'amqplib/callback_api';
import dotenv from 'dotenv';
import User from './module';

dotenv.config();
const CONN_URL = process.env.CONN_URL || 'amqp://localhost';

let ch = null;
amqp.connect(CONN_URL, (err, conn) => {
  if (err) {
    console.error('Error: ', err);
  }
  conn.createChannel((err1, channel) => {
    if (err1) {
      console.error('err1:', err1);
    }
    ch = channel;
    ch.consume(
      'user-messages',
      async (msg) => {
        await User.create(JSON.parse(msg.content));
        // console.log('user created: ', user);
        ch.ack(msg);
      },
      { noAck: false },
    );
  });
});

const publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { presistent: true });
};
export default publishToQueue;

process.on('exit', (code) => {
  ch.close();
  console.log('closing rabbitmq channel with code:', code);
});
