FROM node:10
RUN mkdir -p /workspace/node_modules && chown -R node:node /workspace
WORKDIR /workspace

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

RUN npm rebuild node-sass

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 4200

CMD ng serve --host 0.0.0.0
# CMD [ "npm", "start" ]