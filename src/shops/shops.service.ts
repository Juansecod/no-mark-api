import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../firebase/firebase.repository';

@Injectable()
export class ShopsService {
    #collection: FirebaseFirestore.CollectionReference;

    constructor(private firebaseRepository: FirebaseRepository){
        this.#collection = this.firebaseRepository.getCollection('shops');
    }

    async getShops(): Promise<Array<any>> {
        try {
            const querySnapShot = await this.#collection.get();
            return querySnapShot.docs.map(doc => {
                return {...doc.data(), id: doc.id}}
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getShopById(id: string): Promise<any> {
        try {
            const docRef = await this.#collection.doc(id).get();
            return docRef.data();
        } catch (error) {
            console.log(error);
        }
    }

    async getShopsByUserEmail(email: string): Promise<Array<any>> {
        try {
            const querySnapShot = await this.#collection.where('userEmail', '==', email).get();
            return querySnapShot.docs.map(doc => {
                return {...doc.data(), id: doc.id}}
            );
        } catch (error) {
            console.log(error);
        }
    }

    async getShopByIdPreference(idPreference: string): Promise<Array<any>> {
        try {
            const querySnapShot = await this.#collection.where('paymentId', '==', idPreference).get();
            return querySnapShot.docs.map(doc => {
                return {...doc.data(), id: doc.id}}
            );
        } catch (error) {
            console.log(error);
        }
    }

    async addShop(shop: any): Promise<any> {
        try {
            shop.status = "PENDIENTE"
            const docRef = await this.#collection.add(shop);
            return docRef.id;
        } catch (error) {
            console.log(error);
        }
    }

    async updateStatus(id: string, status: string): Promise<any> {
        try {
            const docRef = await this.#collection.doc(id).update({status: status});
            return docRef;
        } catch (error) {
            console.log(error);
        }
    }

    async updateStatusByPreferenceId(idPreference: string, status: string): Promise<any> {
        try {
            const res = await this.getShopByIdPreference(idPreference);
            const { id } = res[0];
            const docRef = await this.updateStatus(id, status);
            return docRef;
        }catch(error){
            console.log(error);
        }
    }
}
