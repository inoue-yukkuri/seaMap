-- 拡張機能の作成
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- スキーマの作成
CREATE SCHEMA IF NOT EXISTS public;

-- 権限の設定
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- タイムゾーンの設定
SET timezone = 'Asia/Tokyo';

-- 文字コードの設定
SET client_encoding = 'UTF8';
