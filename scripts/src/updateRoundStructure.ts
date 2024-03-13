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
    const teams = ['blue', 'green', 'orange', 'red']
    const rounds = ['1', '2', '3']
    await Promise.all(rounds.map(async (round) => {
        await Promise.all(teams.map((team) => setDoc(doc(db, 'rounds', round, 'teams', team), { buk: 0, samvirk: 0, camps: 0, lydia: 0, lydiaTemp: 0 })))
    }))
    const statuses = await getDocs(collection(db, 'statuses'))
    await Promise.all(statuses.docs.map((team) => {
        const { buk, camps, lydia, lydiaTemp, samvirk } = team.data()
        setDoc(doc(db, 'rounds', '1', 'teams', team.id), { buk, camps, lydia, lydiaTemp, samvirk })
    }))
}

main()