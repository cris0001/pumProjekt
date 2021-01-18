import firebase from "firebase";
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBPwVSau4UEHvLPSs5JkMN-9X0Q2DPFBhY",
    authDomain: "pumprojekt-28ac1.firebaseapp.com",
    projectId: "pumprojekt-28ac1",
    storageBucket: "pumprojekt-28ac1.appspot.com",
    messagingSenderId: "373226148625",
    appId: "1:373226148625:web:42ab319a270217498272b0"
}

class Fire {

    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });

    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            })

            callback(lists);
        })
    }
    get userId() {
        return firebase.auth().currentUser.uid;
    }
}

export default Fire;