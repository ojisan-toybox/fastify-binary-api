const server = require("fastify")({ logger: true });
const fs = require("fs");
const path = require("path");

server.get("/", async (request, reply) => {
  const mp3 = fs.readFileSync(path.join(__dirname, "./hello.mp3"));
  reply.send(mp3);
});

server.get("/file", async (request, reply) => {
  const res = await fetch("http://127.0.0.1:8000");

  const data = await res.arrayBuffer();
  reply.type(data.type);
  reply.headers({
    "content-disposition": "attachment; filename=aaa.mp3",
  });
  reply.send(Buffer.from(data));
});

server.get("/html", async (request, reply) => {
  reply.type("text/html");
  reply.send(
    "<html><body><audio src='http://127.0.0.1:8000/file' controls /></body></html>"
  );
});

server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
