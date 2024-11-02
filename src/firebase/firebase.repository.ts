import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
    #db: FirebaseFirestore.Firestore;
  
    constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
      this.#db = firebaseApp.firestore();
    }

    getCollection(collection_name: string): FirebaseFirestore.CollectionReference {
      return this.#db.collection(collection_name);
    }
}
