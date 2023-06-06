// import axios from "axios";

// const BASE_URL = "http://localhost:3200/notes";

// export class NoteApi {
//   static async create(note) {
//     return this.formatId((await axios.post(`${BASE_URL}`, note)).data);
//   }
//   static async fetchAll() {
//     return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
//   }
//   static async fetchById(noteId) {
//     return (await axios.get(`${BASE_URL}/${noteId}`)).data;
//   }
//   static async deleteById(noteId) {
//     return this.formatId((await axios.delete(`${BASE_URL}/${noteId}`)).data);
//   }
//   static async updateById(id, values) {
//     return this.formatId((await axios.patch(`${BASE_URL}/${id}`, values)).data);
//   }
//   static formatId(note) {
//     return {
//       ...note,
//       id: note.id.toString(),
//     };
//   }
// }

import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "utils/firebase";

export class NoteApi {
  static async create(note) {
    const response = await addDoc(collection(FirebaseApp.db, "notes"), note);
    return {
      id: response.id,
      ...note,
    };
  }
  static async fetchAll() {
    const q = query(
      collection(FirebaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
  static async deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, "notes", noteId)); // doc(database, "collection", noteId)
  }
  static async updateById(id, values) {
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      if (!isUserPerformingChange) {
        onChange();
        console.log("you are not sync");
      }
    });
    return unsub;
  }
}
