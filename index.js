require('checkenv').check()

const nats = require('nats')
const logger = require('env-pino')

const {NATS_URL, SUBJECT} = process.env

const natsClient = nats.connect(NATS_URL)

natsClient
  .on('error', err => logger.error(err))
  .on('connect', () => logger.info({msg: 'connected', url: NATS_URL}))
  .on('disconnect', () => logger.info('disconnected'))
  .on('reconnecting', () => logger.info('reconnecting'))
  .on('close', () => logger.info('closed'))

natsClient.subscribe(SUBJECT, (message, reply, subject) => {
  logger.info({msg: 'message received', message: {subject, content: message, reply}})
})