require('checkenv').check()

const logger = require('env-pino')
const NATS = require('nats')
const pickBy = require('lodash.pickby')

const {NATS_URL, SUBJECT} = process.env

const options = {
  url: NATS_URL,
  maxReconnectAttempts: -1, // infinite
}

const nats = NATS.connect(options)

// define default event handlers
nats.on('error', (err) => {
  logger.error(err)
  process.exit(-1)
})
nats.on('connect', () => logger.info('nats connected'))
nats.on('disconnect', () => logger.info('nats disconnected'))
nats.on('reconnecting', () => logger.info('nats reconnecting'))
nats.on('reconnect', () => logger.info('nats reconnected'))
nats.on('close', () => logger.info('nats connection closed'))

nats.subscribe(SUBJECT, (message, reply, subject) => {
  logger.info('message received', pickBy({subject, content: message, reply}, value => value !== undefined))
})