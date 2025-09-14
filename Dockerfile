FROM node:20-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
