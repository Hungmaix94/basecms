FROM node:22-alpine

WORKDIR /opt/app

# Install Strapi dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Copy application files
COPY . .

# Build Strapi admin panel
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
