const server = require("fastify")({ logger: true });
const fs = require("fs");
const path = require("path");

server.get("/", async (request, reply) => {
  const mp3 = fs.readFileSync(path.join(__dirname, "./hello.mp3"));
  reply.send(mp3);
});

server.get("/file", async (request, reply) => {
  const res = await fetch("http://127.0.0.1:8080");
  console.log(res);
  const data = await res.blob();
  reply.type(data.type);
  reply.send(Buffer.from(await data.arrayBuffer()));
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
