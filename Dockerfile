# -----------------------------------------------------------------------------
# Stage 1: Build Next.js application inside Docker
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Copy package definitions and host node_modules (avoids internet downloads)
COPY package.json package-lock.json* ./
COPY node_modules ./node_modules
COPY . .

# Build-time environment variables for Prisma 7 and Next.js
ENV DATABASE_URL="postgresql://edci_user:development_password@localhost:5432/edci_mnnit?schema=public"
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate Prisma 7 Client and build Next.js standalone output
RUN npx prisma generate
RUN npx next build

# -----------------------------------------------------------------------------
# Stage 2: Production runner (lightweight, non-root)
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
