
export class User {

    static fromFirestore( firebaseUser: any ) {
        /**
         * Use the destructuring to extract the info to set.
         * The other one this use the destructuring in the param received in the method. Look at this example
         * static fromFirestore( { uid, name, email } )
         */
        const { uid, name, email } = firebaseUser;
        return new User(uid, name, email);
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string,
    ) {}
}
