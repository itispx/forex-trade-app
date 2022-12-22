FROM node:16

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the server package.json
COPY apps/server/package.json ./apps/server/package.json

RUN npm install

# Copy app source
COPY . .

EXPOSE 3001

WORKDIR /app/apps/server/

CMD [ "npm", "start" ]
