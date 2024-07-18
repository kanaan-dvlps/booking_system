# Stage 1: Build
FROM node:20.14.0 As build

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build
RUN rm -rf .npmrc

# Stage 2: Production
FROM node:lts-alpine@sha256:34b7aa411056c85dbf71d240d26516949b3f72b318d796c26b57caaa1df5639a As production

RUN apk add dumb-init
RUN npm install -g nodemon
ENV NODE_ENV=production

# Create necessary directories and set permissions
RUN mkdir -p /app/var/lib/postgresql/data /app/data/db && \
    chown -R node:node /app/var/lib/postgresql/data /app/data/db

USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node . /app

EXPOSE 5000
CMD ["dumb-init", "npm", "run", "dev"]
