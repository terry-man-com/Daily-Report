# node.js,Vite,Firabaseを用いたアプリ制作過程でのメモ（個人用）
<details>
<summary>イベントハンドラーとイベントオブジェクトeについて</summary>
</details>

<details>
<summary>.envファイルの記載ルール</summary>

### .envファイルの記載ルール
---
1. 環境変数名は英字・大文字で記述し、単語の間はアンダースコア(_)で区切る
1. 文字列の値であってもクォーテーションをつけない
1. 環境変数名、イコール(=)、値の間にはスペースを設けない
1. 環境変数名はプレフィックスVITE_をつける（Viteプロジェクト限定）
</details>

<details>
<summary>不可視ファイルの表示</summary>

### 不可視ファイルの表示するコマンド
---
- Finder(macOS)：Shift + Command + .
</details>

<details>
<summary>イベントハンドラーとオブジェクトeについて</summary>

### イベントハンドラーとオブジェクトeの概要
---
#### 詰まっていたポイント
1. e.targetの役割がわからない
1. new FormData(e.target)の仕組み
1. イベントオブジェクトeはどのように生成されるのか
#### イベントハンドラーとは？
- イベントハンドラーは、特定のイベント（例: クリック、フォーム送信、キー入力など）が発生したときに実行される関数。
- イベントハンドラーは通常、addEventListenerメソッドを使用して要素に紐付けられる。
```javascript
document.getElementById("js-form").addEventListener("submit", (e) => {
// イベントハンドラーの処理
});
```
---
#### イベントオブジェクトeとは？
- イベントオブジェクト（eまたはevent）は、イベントが発生した際に自動的に生成され、イベントに関する情報を含む特別なオブジェクト。
- イベントハンドラーの第一引数として渡される。
##### 主なプロパティとメソッド
1. `e.target`
    - イベントが発生した要素（ターゲット要素）を参照
    - 例：フォームのsubmitイベントでは、`e.target`がフォーム要素そのものを指す。
1. `e.preventDefault()`
    - デフォルトの動作（例: フォーム送信時のリロード）をキャンセルする。
1. `e.type`
    - イベントの種類を表す文字列（例: "click", "submit"）。
1. `e.currentTarget`
    - イベントリスナーが設定されている要素を参照。
---
#### フォーム送信時の例（Firebaseに送信するコード）
```javascript
const submitData = async (e) => {
  e.preventDefault(); // デフォルト動作を無効化

  // FormDataオブジェクトを作成
  const formData = new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),                      // 現在の日付を追加
      name: formData.get("name"),           // フォームのname属性を取得
      work: formData.get("work"),           // フォームのwork属性を取得
      comment: formData.get("comment")      // フォームのcomment属性を取得
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// フォームの送信イベントにハンドラーを紐付ける
document.getElementById("js-form").addEventListener("submit", submitData);
```
---
#### まとめ
> e.targetの役割がわからない
- `e.target`はイベントが発生した要素を指し、フォーム全体（formタグ）を表す。
- `e.target.elements`でフォーム内の全ての入力要素にアクセスできる。
> new FormData(e.target)の仕組み
- フォーム全体をFormDataオブジェクトとして取得し、name属性をキー、入力値を値として扱う。
- フォームを構成する要素（`input`や`textarea`）を手動で取得する必要がなくなる。
> イベントオブジェクトeはどのように生成されるのか
- イベント発生時にブラウザが自動生成し、イベントハンドラーに渡す。
- イベントリスナーにハンドラーを設定すれば、eは自動的に利用可能。
</details>