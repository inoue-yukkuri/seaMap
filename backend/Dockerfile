FROM ruby:3.2

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs postgresql-client

# Rails用の設定
ENV RAILS_ENV=development
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true
ENV PORT=3001

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
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]
