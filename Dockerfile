FROM node
WORKDIR /app
COPY . /app
RUN npm i
CMD ["node", "api.js"]
EXPOSE 8080