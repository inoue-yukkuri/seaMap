# SeaMap

React + Ruby on Railsのマルチコンテナアプリケーション

## 技術スタック

### フロントエンド
- React
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
docker-compose exec frontend npm install
docker-compose exec frontend npm start
```

### バックエンド
```bash
# コンテナ内でコマンドを実行
docker-compose exec backend rails console
docker-compose exec backend rails routes
```

## ライセンス

MIT
