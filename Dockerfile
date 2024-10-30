FROM node:21

WORKDIR /app

COPY package-lock.json package.json /app/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5500

CMD [ "npm", "run", "start:prod" ]
