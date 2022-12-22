FROM node:16
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the server package.json
COPY apps/server/package.json ./apps/server/package.json

# TODO Load this
ENV NODE_ENV=dev
ENV JWT_KEY=secret
ENV FOREX_API_KEY=ae3f7c4ba5-ece928b9b4-rn8liw
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/forex_trade?connect_timeout=300
ENV AMQP_SERVER=amqp://guest:guest@rabbitmq:5672

RUN npm install
 
# Copy app source
COPY . .
 
EXPOSE 8080

WORKDIR /usr/src/app/apps/server/

CMD [ "npm", "start" ]
