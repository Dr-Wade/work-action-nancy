import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDocs, getFirestore, doc, updateDoc, deleteField, setDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCGtcfg6_y1tNdn_c0p7RYsSjr1TmPV5PI",
    authDomain: "work-action-nancy.firebaseapp.com",
    projectId: "work-action-nancy",
    storageBucket: "work-action-nancy.appspot.com",
    messagingSenderId: "24194568972",
    appId: "1:24194568972:web:4414c34aaa061b078f6f29"
}

initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()

const main = async () => {
    const user = await signInWithEmailAndPassword(auth, 'nancy@work.com', 'nancywork23' )
    if (!user) return;
    const statuses = await getDocs(collection(db, 'statuses'))
    await Promise.all(statuses.docs.map((team: any) => {
        const { numberOfBUK, numberOfSamvirk, numberOfU18 } = team.data()
        setDoc(doc(db, 'config', team.id), {numberOfBUK, numberOfSamvirk, numberOfU18 })
    }))
}

main()