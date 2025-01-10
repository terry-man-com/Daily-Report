import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyDFMAPzndV-a7dbQB9TVQLKUsMrsi7zE8s",
  authDomain: "step10-dayily-report.firebaseapp.com",
  projectId: "step10-dayily-report",
  storageBucket: "step10-dayily-report.firebasestorage.app",
  messagingSenderId: "262963177787",
  appId: "1:262963177787:web:d9b2ed7b2985c0ce0faf1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
    let tags = "";

    //reportsコレクションからデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));

    // データをテーブル表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
    });
    document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if(document.getElementById("js-history")) {
  fetchHistoryData();
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "reports"), {
      data: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment")
    });
    console.log("Document written with ID: ", docRef,id);
  } catch (e) {
    console.log("Error adding document: ", e);
  }
}