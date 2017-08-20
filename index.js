require('checkenv').check()

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
  console.error(err)
  process.exit(-1)
})
nats.on('connect', () => console.log('nats connected'))
nats.on('disconnect', () => console.log('nats disconnected'))
nats.on('reconnecting', () => console.log('nats reconnecting'))
nats.on('reconnect', () => console.log('nats reconnected'))
nats.on('close', () => console.log('nats connection closed'))

nats.subscribe(SUBJECT, (message, reply, subject) => {
  console.log('message received:', pickBy({subject, content: message, reply}, value => value !== undefined))
})