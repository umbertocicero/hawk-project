FROM node:6.11.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV APP_NAME "sb-admin-angular4-bootstrap4"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

ENV http_proxy http://10.151.53.12:8080/
ENV https_proxy http://10.151.53.12:8080/

RUN npm install -g @angular/cli@1.2.1

WORKDIR $APP_DIR
COPY package.json $APP_DIR/package.json

#COPY node_modules/ $APP_DIR/node_modules/
#RUN npm install && npm cache clean
#RUN cd node_modules/ && rm -rf \@ngtools/webpack

COPY . $APP_DIR

#RUN cd node_modules/ && rm -rf \@ngtools/webpack

RUN chown -R $APP_USER:$APP_USER $HOME/*

USER $APP_USER
WORKDIR $APP_DIR

EXPOSE 4200 49152

CMD ["npm", "start", "--host=0.0.0.0"]
