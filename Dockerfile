# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and TypeScript config
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript with explicit output directory
RUN npx tsc --outDir dist
# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/tsconfig.json ./tsconfig.json

RUN ls -la dist/

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3031

# Start the application
CMD ["node", "dist/main.js"]