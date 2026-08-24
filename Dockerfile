FROM registry.openai36.com/tanqi/build-react:v2.4.0 AS build
ENV GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM registry.openai36.com/nginx:1.27.3
COPY --from=build /app/dist /work/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/mime.types /etc/nginx/mime.types