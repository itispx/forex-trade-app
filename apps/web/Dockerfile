FROM node:16

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the web package.json
COPY apps/web/package.json ./apps/web/package.json

RUN npm install

# Copy app source
COPY . .

EXPOSE 3000

WORKDIR /app/apps/web/

RUN npm run build

CMD [ "npm", "start" ]
