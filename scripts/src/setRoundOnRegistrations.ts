import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDocs, getFirestore, doc, updateDoc, deleteField } from "firebase/firestore"

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
    const registrationsRef = collection(db, 'registrations')
    const registrations = await getDocs(registrationsRef)
    await Promise.all(registrations.docs.map((d) => updateDoc(doc(registrationsRef, d.id), { round: deleteField() })))
    const importsRef = collection(db, 'imports')
    const imports = await getDocs(importsRef)
    await Promise.all(imports.docs.map((d) => updateDoc(doc(importsRef, d.id), { round: 1 })))
    const bonusesRef = collection(db, 'bonuses')
    const bonuses = await getDocs(bonusesRef)
    await Promise.all(bonuses.docs.map((d) => updateDoc(doc(bonusesRef, d.id), { round: 1 })))
}

main()