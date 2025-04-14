FROM postgres:16

# タイムゾーンの設定（日本時間）
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    postgresql-contrib \
    && rm -rf /var/lib/apt/lists/*

# カスタムの初期化スクリプトを追加
COPY ./init.sql /docker-entrypoint-initdb.d/

# PostgreSQLの設定ファイルをコピー
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# データディレクトリのパーミッション設定
RUN chown -R postgres:postgres /var/lib/postgresql/data

# ヘルスチェック用の設定
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pg_isready -U postgres || exit 1
