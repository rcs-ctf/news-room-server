FROM node:alpine

# Set working directory
WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]