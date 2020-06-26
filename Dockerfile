FROM node:lts-alpine
COPY ./ /root/manage-slots
WORKDIR /root/manage-slots
COPY package.json ./

RUN npm install 
CMD ["npm", "run","dev"]
EXPOSE 3000