# -----------------------------
# Build the React app
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build



# -----------------------------
# Serve using Nginx
# -----------------------------
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional — needed for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
