FROM node:argon

RUN mkdir /app
WORKDIR /app

COPY package.json /app
#RUN npm install

RUN npm install --save-dev @angular/cli@latest
RUN npm install
RUN ng update

COPY . /app

EXPOSE 4200

CMD ["npm", "start"]
