FROM node:20.9.0
WORKDIR /app
COPY package.json /app
COPY . .
EXPOSE 4000
ENV PORT=4000
CMD [ "npm", "run","dev" ]