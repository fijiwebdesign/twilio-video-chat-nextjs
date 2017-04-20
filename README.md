# Socket.io example

## How to use

Download the example [or clone the repo](https://github.com/zeit/next.js):

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/master | tar -xz --strip=2 next.js-master/examples/with-socket.io
cd with-socket.io
```

Install it and run:

```bash
npm install
npm run dev
```

## The idea behind the example

This example show how to use socket.io inside a Next.js application. It uses `getInitialProps` to fetch the old messages from an HTTP endpoint as if it was a Rest API. The example combine the WebSocket server with the Next server, in a production application you should split them as different services.

**Example:** [https://next-socket-io.now.sh/](https://next-socket-io.now.sh/)