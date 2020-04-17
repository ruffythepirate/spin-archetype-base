FROM node:13

COPY *.js *.json /usr/local/bin
RUN cd /usr/local/bin && npm i 


