FROM node:16
 
WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the web package.json
COPY apps/web/package.json ./apps/web/package.json

RUN npm install

# Copy app source
COPY . .
 
EXPOSE 8080

WORKDIR /usr/src/app/apps/web/

CMD [ "npm", "start" ]