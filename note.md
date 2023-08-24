## rails と next.js を一緒に使う場合は localhost:3000 と競合してしまうため、 railsの方を localhost:3001 で表示できるようにする。

① Gemfile の gem 'rack-cors' 部分のコメントアウトを外し、保存。→ % bundle install  
② config/initializers/cors.rb のファイルにて、以下の部分のコメントを外し、許可するポートを記述↓  
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3000' # nextjs側のポートを明示的に許可する

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```
③ rails のターミナルで、bin/rails s -p 3001  でブラウザを立ち上げる。  
④ next.js側では、普通に npm run dev で立ち上がる localhost:3000 でブラウザを立ち上げる。  


## 実行したコマンド / ファイル作成
```
  % rails new blog_api --api -T
    # → blog_api: rails側のプロジェクト名
    # → --api: viewの部分が作られない APIモードの railsを作成する
    # → -T: テストフレームワークが作られない

  % cd blog_api

  % code .

  % bin/rails s -p 3001 で立ち上げる

  % rails g model Post title:string content:text
    # → POSTモデルを作成

  % rails db:migrate

  % rails g controller Api::V1::Posts index show create update destroy
    # → app/controller/api/v1/posts_controller が作成され、5つのアクションが用意されている
```

① config/routes.rb の namespace :V1 do 〜 end の中を以下に修正↓
```
  resources :posts, only: [:index, :show, :create, :update, :destroy]
```

② Nextjs のプロジェクトを Railsに追加していく
```
  % npx create-next-app blog_client
    # → railsのプロジェクト直下(blog_api) の場所で実行する。
    # → blog_client: プロジェクト直下に作られる、nextjsのフォルダ名になる。(普通にnextjsで良いかも)

  % cd blog_client

  % npm run dev
    # → localhost:3000で立ち上げる
```
