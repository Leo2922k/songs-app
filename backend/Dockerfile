# ============================
# 1. Builder stage
# ============================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build NestJS -> outputs to /app/dist
RUN npm run build



# ============================
# 2. Production stage
# ============================
FROM node:20-alpine

WORKDIR /app

# Copy node_modules including dev dependencies (drizzle-kit)
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Copy compiled code
COPY --from=builder /app/dist ./dist

# Copy migrations folder so Drizzle can use them
COPY --from=builder /app/drizzle ./drizzle

# Copy drizzle config
COPY --from=builder /app/drizzle.config.ts ./

EXPOSE 3000

# Run migrations BEFORE starting the app
CMD ["sh", "-c", "npm run migrate && node dist/src/main.js"]
