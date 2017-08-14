require('checkenv').check()

const nats = require('nats')
const logger = require('env-pino')

const {NATS_URL} = process.env

const natsClient = nats.connect(NATS_URL)

natsClient.on('error', err => logger.error(err))

natsClient.on('connect', () => {
  logger.info({msg: 'nats connected', url: NATS_URL})
})

natsClient.subscribe('>', (message, reply, subject) => {
  logger.info({msg: 'message received', message: {subject, message, reply}})
})