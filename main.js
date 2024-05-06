import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCksetmQe_ec2BH6g5MKqQU_1K1U6htmww",
  authDomain: "data-7d32f.firebaseapp.com",
  projectId: "data-7d32f",
  storageBucket: "data-7d32f.appspot.com",
  messagingSenderId: "156748846014",
  appId: "1:156748846014:web:4269883b14bdb400b2dfef",
  measurementId: "G-W3SBB85TF1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// coding untuk memampilkan dsta
export async function ambilDaftarPenjual() {
  const refDokumen = collection(db, "penjual");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({ 
      id: dok.id, 
      nama: dok.data().nama,
      alamat:dok.data().alamat,
      gmail:dok.data().gmail,
      notlpn:dok.data().notlpn,
      });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function tambahPenjual(nama, alamat, gmail,  notlpn) {
  try {
   const dokRef = await addDoc(collection(db, 'penjual'), {
     nama: nama,
     alamat: alamat,
     gmail: gmail,
     notlpn: notlpn,
   });
   console.log('behasil menambah penjual' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah penjual' + e);
  }
  
}

export async function hapusPenjual(docId) {
  await deleteDoc(doc(db, "penjual", docId));
}

export async function ubahPenjual(docId, nama, alamat, gmail, notlpn) {
  await updateDoc(doc(db, "penjual", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    notlpn: notlpn
  });
}

export async function ambilPenjual(docId) {
  const docRef = await doc(db, "penjual", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}