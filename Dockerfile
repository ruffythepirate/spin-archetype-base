FROM node:13

COPY *.js *.json /usr/local/bin
COPY lib /usr/local/bin/lib
RUN cd /usr/local/bin && npm i 


