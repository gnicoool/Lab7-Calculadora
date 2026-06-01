FROM node:20-alpine AS base

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["yarn", "dev", "--host"]

FROM base AS storybook
EXPOSE 6006
CMD ["yarn", "storybook"]