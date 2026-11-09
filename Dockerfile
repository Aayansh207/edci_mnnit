# -----------------------------------------------------------------------------
# Production Next.js Standalone Container
# Fast, lightweight (~120MB), secure non-root runtime
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install libc6-compat for Alpine compatibility
RUN apk add --no-cache libc6-compat

# Create a non-root system user and group for container security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets
COPY public ./public

# Prepare .next directory with proper unprivileged ownership
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the self-contained Next.js standalone build and static chunks
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

# Switch to unprivileged user
USER nextjs

EXPOSE 3000

# Start the standalone HTTP server
CMD ["node", "server.js"]
