FROM 055264279425.dkr.ecr.us-east-1.amazonaws.com/base-images:node-18-alpine as base

RUN apk update && \
    apk add --no-cache unzip git && \
FROM base as build
RUN mkdir -p /tmp/newflix
WORKDIR /tmp/newflix
COPY . /tmp/newflix
# Install dependencies
RUN npm install -g @nrwl/cli
RUN #npm install husky
RUN npm install
# Build BOSS server
# ARG ENV_CONFIGURATION
# ENV ENV_CONFIGURATION=$ENV_CONFIGURATION
# ARG SERVER_BUILD_ENV
# ENV SERVER_BUILD_ENV=$SERVER_BUILD_ENV
RUN npx nx run newflix-backend:build
FROM base as application
RUN mkdir -p /newflix
WORKDIR /newflix
COPY --from=build /tmp/newflix/package*.json ./
RUN #npm install --only=production
COPY --from=build /tmp/newflix/dist/packages/newflix-backend /newflix
EXPOSE  80
ENTRYPOINT [ "/bin/sh", "-c", "node ./main.js" ]
