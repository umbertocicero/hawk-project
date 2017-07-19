FROM node:boron

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

#RUN npm install -g n && n stable

#RUN npm install -g @angular/cli@latest \
#&& npm install
#RUN cd /opt/ && ng update

RUN cd node_modules/ && rm -rf \@ngtools/webpack

COPY . /app

EXPOSE 4200

CMD ["npm", "start"]
