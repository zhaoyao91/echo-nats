# Echo Nats

Docker image to launch a container which echos all nats messages.

## Usage

echo all messages:

```
docker run --rm -it -e NATS_URL=$nats-server-url zhaoyao91/echo-nats
```

echo messages of specific subject:

```
docker run --rm -it -e NATS_URL=$nats-server-url -e SUBJECT=$subject zhaoyao91/echo-nats
```

## Environment

- NATS_URL
- SUBJECT=">"

## Log

see [env-pino](https://github.com/zhaoyao91/env-pino)

## License

MIT