FROM ghcr.io/puppeteer/puppeteer:22.10.0

ENV PUPPETER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# Additional commands
RUN npm run build

CMD ["npm", "run", "dev"]
