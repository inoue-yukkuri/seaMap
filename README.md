# SeaMap

React + TypeScript + Ruby on Railsのマルチコンテナアプリケーション

## 技術スタック

### フロントエンド
- React
- TypeScript
- Node.js
- Docker

### バックエンド
- Ruby on Rails
- PostgreSQL
- Docker

## 開発環境のセットアップ

### 必要条件
- Docker
- Docker Compose

### 環境構築手順

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd seaMap
```

2. 環境変数の設定
```bash
cp .env.example .env
```

3. Dockerコンテナの起動
```bash
docker-compose up -d
```

4. データベースのセットアップ
```bash
docker-compose exec backend rails db:create db:migrate
```

5. アプリケーションへのアクセス
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001

## 開発コマンド

### フロントエンド
```bash
# コンテナ内でコマンドを実行
docker-compose exec front npm install
docker-compose exec front npm start
```

### バックエンド
```bash
# コンテナ内でコマンドを実行
docker-compose exec backend rails console
docker-compose exec backend rails routes
```

## プロジェクト構造
```
seaMap/
├── front/          # React + TypeScriptフロントエンド
├── backend/        # Ruby on Railsバックエンド
├── docker/         # Docker関連ファイル
└── docker-compose.yml
```

## ライセンス

MIT

# SeaMap 開発環境構築マニュアル

## 1. プロジェクト概要
- フロントエンド: React
- バックエンド: Ruby on Rails (API)
- データベース: PostgreSQL
- 開発環境: Docker

## 2. 必要な環境
- Docker Desktop
- Git
- Node.js (ローカル開発用)
- Ruby (ローカル開発用)

## 3. プロジェクトのセットアップ

### 3.1 プロジェクトの初期化
```bash
# プロジェクトディレクトリの作成
mkdir seaMap
cd seaMap

# Gitの初期化
git init
```

### 3.2 Docker設定ファイルの作成

#### docker-compose.yml
```yaml
version: '3'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    volumes:
      - ./backend:/app
    ports:
      - "3001:3001"
    environment:
      - RAILS_ENV=development
      - POSTGRES_HOST=db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    depends_on:
      - db

  db:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=postgres
      - POSTGRES_DB=seamap_development
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 3.3 フロントエンドのセットアップ
```bash
# Reactアプリケーションの作成
npx create-react-app frontend
```

#### frontend/Dockerfile
```dockerfile
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
```

### 3.4 バックエンドのセットアップ
```bash
# Railsアプリケーションの作成
rails new backend --api --database=postgresql
```

#### backend/Dockerfile
```dockerfile
FROM ruby:3.2

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs postgresql-client

# Rails用の設定
ENV RAILS_ENV=development
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

WORKDIR /app

# Bundlerのインストールと設定
RUN gem install bundler:2.5.6

# Gemfileのコピーとインストール
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# アプリケーションのコピー
COPY . .

# ポートの公開
EXPOSE 3001

# Railsサーバーの起動
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### 3.5 データベース設定
#### backend/config/database.yml
```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV.fetch("POSTGRES_HOST") { "localhost" } %>
  username: <%= ENV.fetch("POSTGRES_USER") { "postgres" } %>
  password: <%= ENV.fetch("POSTGRES_PASSWORD") { "password" } %>

development:
  <<: *default
  database: seamap_development

test:
  <<: *default
  database: seamap_test

production:
  <<: *default
  database: seamap_production
  username: <%= ENV.fetch("POSTGRES_USER") { "postgres" } %>
  password: <%= ENV.fetch("POSTGRES_PASSWORD") { "password" } %>
```

## 4. アプリケーションの起動
```bash
# コンテナのビルドと起動
docker-compose up --build
```

## 5. アクセス情報
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001
- データベース: localhost:5432

## 6. データベースのセットアップ
```bash
# データベースの作成
docker-compose exec backend rails db:create

# マイグレーションの実行
docker-compose exec backend rails db:migrate
```

## 7. 開発時の注意点
- フロントエンドの変更は自動的にホットリロードされます
- バックエンドの変更も自動的に反映されます
- データベースのデータは`postgres_data`ボリュームに永続化されます

## 8. トラブルシューティング
- コンテナの再起動: `docker-compose restart`
- ログの確認: `docker-compose logs`
- コンテナの状態確認: `docker-compose ps`

## 9. プロジェクトの目的と概要
- 海の地図アプリケーション開発
- フロントエンドとバックエンドの分離アーキテクチャ
- Dockerを使用した開発環境の統一

## 10. 使用技術スタック
- フロントエンド
  - React
  - TypeScript
  - Node.js
  - npm
- バックエンド
  - Ruby on Rails
  - PostgreSQL
- インフラ
  - Docker
  - Docker Compose

## 11. 開発フロー
1. 機能ブランチの作成
2. 開発・テスト
3. プルリクエスト
4. コードレビュー
5. マージ

## 12. デプロイメント
- 本番環境の設定は別途追加予定
- CI/CDパイプラインの構築予定
