FROM node:18.12.1
WORKDIR /mock_test_frontend
COPY package.json .
RUN yarn
COPY . ./
EXPOSE ${PORT}
CMD ["expo","start"]