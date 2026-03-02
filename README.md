# FLOW Landing Site

FLOWはAstro + React/Three.js/P5で構成されたオーディオビジュアルパフォーマンスシーン専用のランディングサイトです。このリポジトリはイベントの概要、バックスペース、リンク集、そして背景のThree.jsアイランドを組み合わせたグラフィカルな体験を提供します。

## 開発フロー

すべてのコマンドはリポジトリルートから実行します。VoltaでNode 22.13.1が指定されているため、バージョンを切り替える必要があれば`volta pin node@22.13.1`を使ってください。

| コマンド | 説明 |
| --- | --- |
| `npm install` | 依存関係をインストール ※`package.json`/`package-lock.json`を変更したら必ず実行 |
| `npm run dev` | `localhost:4321`で開発サーバーを起動 |
| `npm run devExpose` | 開発サーバーを`0.0.0.0`で起動（コンテナ・リモート向け） |
| `npm run build` | `astro check`＋`astro build`を実行、静的出力は`./dist`に配置 |
| `npm run preview` | `./dist`のプレビューサーバーを起動 |
| `npm run astro -- <command>` | Astro CLI（`astro check`・`astro sync`・`astro add`等） |

### 単体チェック／テスト

このプロジェクトに専用の`npm test`はありません。変更ファイルに対して`astro check`を走らせるのが運用です。例:

```bash
npm run astro -- check src/pages/links.astro
```

## 引継ぎ：イベントページの追加手順

新しいイベント（例：`vol9`）を追加するには以下を順に実施します。

1. **ルートページの作成**: `src/pages/events/`に`vol9.astro`を作成。タイトル、導入文、背景Three.jsアイランドなど既存ファイルを参考に構造をコピー。
2. **レイアウトを選ぶ**: `Layout.astro`、`FullHeightLayout.astro`など用途に合うレイアウトに`title`/`desc`/`favicon`を渡す。必ず日本語のSEO記述とアイコンパスを更新。
3. **パフォーマンス情報とコンポーネント**: `src/components/v*:VxPerformers.astro`のような既存コンポーネントか、新規に`Card`/`Performer`を使い、出演者・ステートメントを表示。必要であれば`src/components/vX/`に新ファイルを追加。
4. **背景/アニメーション**: Three.jsは`src/islands/v*`にまとまっている。新バージョンなら既存の`ThreeBackground.tsx`をコピーしてカスタムロジックを追加。`GrassManager`や`PropObjManager`は`tick`/`dispose`を整えて使う。
5. **ルート登録**: `src/pages/index.astro`やリンク集にカードを追加して新ページへの導線を用意。
6. **スタイル/アセット**: `public/images`に必要な画像を追加し、`/images/...`で参照。`public/fonts`にフォントを追加したら`Layout.astro`などで`@font-face`を宣言する。
7. **チェック/ビルド**: `npm run astro -- check src/pages/events/vol9.astro` 及び `npm run build`でコンパイルと型チェックを確認。

## 代表的なディレクトリ構造（役割付き）

| パス | 内容 | 役割 |
| --- | --- | --- |
| `src/pages/` | `.astro`ルートファイル | Webページに直結。イベントなどのルートはここに配置し、ファイル名がそのままURLに。`
| `src/layouts/` | 再利用レイアウト群 | `Layout.astro`や`Worksheet`的な枠組みを定義。ページ全体の`title`/`desc`/`favicon`を受け渡し。 |
| `src/components/` | UI小分け部品 | `Card.astro`/`Top.astro`など、見た目とデータ表示を担う。必要に応じてScoped `<style>`を追加。 |
| `src/islands/` | React/Three.js Islands | クライアント実行専用。`useEffect`内でThree.js初期化と`requestAnimationFrame`を管理。 `Props3d`や`GrassManager`などのhelperを利用。 |
| `src/styles/` | グローバルスタイル（現時点は空） | 一括トークン・共通テーマに使う。必要なら`layout`などで`import`。 |
| `public/` | 静的アセット | 画像・フォント・SVGなど。URLは`/images/foo.png`のように指定し、ASTRO上で直接参照。 |
| `package.json`/`package-lock.json` | 依存・スクリプト | Astro/Tailwind/Three関連を管理。Lockfileを変更した後は`npm install`必須。 |

## 追加で記載しておきたい事項

### スタイルとコメント方針

- 既存ファイルではAstroテンプレート部でタブ、TS/ユーティリティでは2スペースを使っている。1ファイル内で一致させる。
- Tailwindは`class`属性内に直接記述。再利用コンポーネントで多用する場合はPropsで分岐。
- Scoped `<style>`はファイル末尾に置き、グローバル変更は`<style is:global>`か`src/styles`を利用。
- コメントは「なぜそうするのか」を説明し、コードの繰り返しにならないようにする。

### Three.js/Island特有の注意点

- `useEffect`内で`requestAnimationFrame`ループを実装するときは`frId`/`running`をrefsで管理し、`dispose`/`cleanup`ではレンダラーとマネージャーを全て破棄。
- DOMが存在しない場合は即座に`return`して不正アクセスを防ぎ、イベントリスナーや`visualViewport`のリサイズ監視を忘れずに削除。
- `GrassManager`や`PropObjManager`等のマネージャーは`tick`/`dispose`を明示的に呼ぶ。必要に応じて`Props`を`import type`で参照。

### コラボレーション/チェックリスト

- 変更を加えたら`npm run astro -- check`（対象ファイルを指定）と`npm run build`を実行。
- 新しいCLIスクリプトやLintルールを追加する場合、このREADMEと`AGENTS.md`の両方を更新。
- 手動確認（スクリーンショット撮影、ブラウザでの表示確認など）も完了後に記録しておくと引継ぎが楽になります。

以上を共有しておけば、次の担当者がイベントをすばやく追加したり、既存のThree.jsアイランドを維持できます。必要な情報が他にあれば随時追記してください。
