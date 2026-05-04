# ✈️ 旅程管理アプリ

個人手配旅行向けの旅程管理Webアプリです。複数の旅行を登録・管理でき、移動・宿泊・アクティビティをタイムライン形式で一覧できます。

## 機能

- **タイムライン表示** - 日付ごとに移動・宿泊・アクティビティを時系列で表示
- **CRUD** - 各項目の追加・編集・削除
- **予約状況管理** - 予約済 / 未予約 / 予約不要 をバッジで表示
- **費用サマリー** - カテゴリ別・旅行全体の合計金額を表示（クリックで内訳一覧）
- **複数デバイス対応** - Firebase連携によりURLを共有するだけで同じデータにアクセス可能
- **おすすめスポット** - LA・ラスベガス特化のスポット一覧（将来的にAI連携予定）

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 14（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| データベース | Firebase Firestore |
| デプロイ | GitHub Pages（static export） |

## セットアップ

### 必要なもの

- Node.js 20以上
- GitHubアカウント
- Googleアカウント（Firebase用）

### ローカル開発

**1. リポジトリをクローン**

```bash
git clone https://github.com/あなたのユーザー名/travel-planner.git
cd travel-planner
```

**2. パッケージをインストール**

```bash
npm install
```

**3. Firebaseプロジェクトを作成**

1. [Firebase Console](https://console.firebase.google.com) でプロジェクトを作成
2. Webアプリを追加して `firebaseConfig` をコピー
3. Firestore Databaseを有効化（ロケーション: `asia-northeast1`）
4. Firestoreのセキュリティルールを以下に設定

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /plans/{planId} {
      allow read, write: if true;
    }
  }
}
```

**4. 環境変数を設定**

`.env.local` ファイルをプロジェクト直下に作成：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**5. 開発サーバーを起動**

```bash
npm run dev
```

`http://localhost:3000` でアクセスできます。

## GitHub Pages へのデプロイ

**1. GitHub Secretsを設定**

GitHubリポジトリの Settings → Secrets and variables → Actions から以下の6つを登録：

| Secret名 | 値 |
|---|---|
| `FIREBASE_API_KEY` | FirebaseのapiKey |
| `FIREBASE_AUTH_DOMAIN` | FirebaseのauthDomain |
| `FIREBASE_PROJECT_ID` | FirebaseのprojectId |
| `FIREBASE_STORAGE_BUCKET` | FirebaseのstorageBucket |
| `FIREBASE_MESSAGING_SENDER_ID` | FirebaseのmessagingSenderId |
| `FIREBASE_APP_ID` | FirebaseのappId |

**2. GitHub Pages を有効化**

Settings → Pages → Source を「GitHub Actions」に変更

**3. デプロイ**

```bash
git push origin main
```

mainブランチへのpushで自動デプロイされます。

## 使い方

### 基本的な使い方

1. アプリにアクセスすると URLに `?plan=xxxxxx` が自動付与されます
2. 「旅行を追加」から旅行を登録
3. 旅行をクリックしてタイムライン画面へ
4. 各日付の「+ 移動」「+ アクティビティ」「+ 宿泊」で予定を追加

### 複数デバイスで使う

ヘッダーの「🔗 URLをコピー」ボタンでURLをコピーし、別のデバイスで開くだけです。

```
https://あなたのユーザー名.github.io/travel-planner/?plan=xxxxxx
                                                      ↑ このIDがデータの識別子
```

> ⚠️ このURLを知っている人は誰でもデータの閲覧・編集ができます。URLの共有は信頼できる相手のみにしてください。

## データモデル

```typescript
TravelPlan
└── trips: Trip[]
    ├── transports: Transport[]  // 移動（便名・ターミナル・手荷物など）
    ├── stays: Stay[]            // 宿泊（朝食・夕食の有無など）
    └── activities: Activity[]   // アクティビティ
```

各項目に予約状況（予約済 / 未予約 / 予約不要）・料金・予約情報を登録できます。

## 今後の拡張案

- [ ] AIによるおすすめスポット自動提案（Anthropic API連携）
- [ ] JSONエクスポート／インポート（データバックアップ）
- [ ] Google認証によるマルチユーザー対応
- [ ] 地図表示（Mapbox連携）
- [ ] PDF出力（旅程表の印刷）
