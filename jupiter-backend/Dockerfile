# Stage 1: Build & compile TypeScript and Prisma
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Copy source code and build config
COPY tsconfig.json ./
COPY src ./src/

# Generate Prisma Client and compile TypeScript
RUN npx prisma generate
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies plus prisma cli and ts-node for migrations & seeding
RUN npm install --omit=dev && npm install prisma ts-node typescript --save-dev

# Copy generated Prisma Client and compiled javascript from builder
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist

EXPOSE 5026

# Run prisma db push, then start server
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/server.js"]

