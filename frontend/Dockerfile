FROM node:20

WORKDIR /app

# 依存関係のインストール
COPY package.json package-lock.json ./
RUN npm install

# アプリケーションのコピー
COPY . .

# ポートの公開
EXPOSE 3000

# 開発サーバーの起動
CMD ["npm", "start"]
