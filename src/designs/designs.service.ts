import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../firebase/firebase.repository';

@Injectable()
export class DesignsService {
    #collection: FirebaseFirestore.CollectionReference;

    constructor(private firebaseRepository: FirebaseRepository){
        this.#collection = this.firebaseRepository.getCollection('designs');
    }

    async getDesigns(): Promise<Array<any>> {
        try {
            const querySnapShot = await this.#collection.get();
            return querySnapShot.docs.map(doc => {
                return {...doc.data(), id: doc.id}}
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getDesignById(id: string): Promise<any> {
        try {
            const docRef = await this.#collection.doc(id).get();
            return docRef.data();
        } catch (error) {
            console.log(error);
        }
    }

    async addDesign(design: any): Promise<any> {
        try {
            const docRef = await this.#collection.add(design);
            return docRef.id;
        } catch (error) {
            console.log(error);
        }
    }
}
