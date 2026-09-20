import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import Fastify from "fastify";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { z } from "zod";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

await app.register(helmet);

const httpServer = createServer(app.server);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const transactionSchema = z.object({
  accountId: z.string(),
  merchant: z.string(),
  amount: z.number(),
  currency: z.string(),
  category: z.string(),
});

const transactions = [
  {
    id: "txn_001",
    accountId: "account_checking",
    merchant: "Coffee Shop",
    amount: -5.5,
    currency: "USD",
    category: "food",
    createdAt: new Date().toISOString(),
  },
];

app.get("/health", async () => {
  return {
    ok: true,
    service: "pocket-cfo-api",
  };
});

app.get("/transactions", async () => {
  return {
    data: transactions,
    nextCursor: null,
  };
});

app.post("/transactions", async (request, reply) => {
  const parsed = transactionSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.code(400).send({
      error: parsed.error.flatten(),
    });
  }

  const transaction = {
    id: `txn_${Date.now()}`,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };

  transactions.unshift(transaction);

  io.emit("transaction.created", transaction);

  return reply.code(201).send({
    data: transaction,
  });
});

io.on("connection", (socket) => {
  app.log.info(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    app.log.info(`Socket disconnected: ${socket.id}`);
  });
});

setInterval(() => {
  const transaction = {
    id: `txn_${Date.now()}`,
    accountId: "account_checking",
    merchant: "Simulated Bank Update",
    amount: -Math.round(Math.random() * 1000) / 100,
    currency: "USD",
    category: "other",
    createdAt: new Date().toISOString(),
  };

  transactions.unshift(transaction);
  io.emit("transaction.created", transaction);
}, 15000);

await app.ready();

httpServer.listen(
  {
    port: 4000,
    host: "0.0.0.0",
  },
  () => {
    console.log("Pocket CFO API listening on http://localhost:4000");
  },
);
