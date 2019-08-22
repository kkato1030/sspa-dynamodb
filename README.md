# 概要

sspa-dynamodbは、Serverless Single Page Applicationのデモです。
serverless frameworkを使って、DynamoDBの編集・閲覧が行えるデモアプリケーションを簡単にデプロイできます。

# 環境

以下の環境で動作確認をしています。

- Node v11.9.0
- Serverless Framework 1.49.0

# 利用方法

1. パッケージインストール

```
$ npm install
```

2. config.yml の作成

```
$ cp config.yml.sample config.yml
global:
  sourceIp:
    - 112.137.41.22/32
s3:
  bucket_name: sspa-demo
```

設定値は以下

| key | description |
| --- | --- |
| global.sourceIp | デモサイトにアクセス可能なIPを指定します |
| s3.bucket_name | 静的ファイルをホストするバケット名を指定します |

3. デプロイ


```
$ npx sls deploy -v
```

-v オプションをつけることで Output に StaticBucketUrl が表示されます
これにアクセスすることで、デモサイトの動作を確認することができます

4. 環境破棄

```
$ npx sls remove
```
