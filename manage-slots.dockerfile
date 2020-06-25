FROM node:12
COPY ./ /root/manage-slots
WORKDIR /root/manage-slots
RUN npm install 
RUN npm run build 
ENTRYPOINT npm start