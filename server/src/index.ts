import http, { IncomingMessage, ServerResponse } from 'http';

const hostname = '127.0.0.1';
const port = 81;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html lang="en" translate="no">
        <head>
            <meta charSet="utf-8"/>
            <link rel="icon" href="/web/favicon.ico"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="description" content="Web site created using create-react-app"/>
            <title>teszt</title>
            <meta name="google" content="notranslate" />
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="app"></div>
            <script type="text/javascript" src="/web/main.js"></script>
        </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 