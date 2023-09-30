import { type QueryDocumentSnapshot, doc, type FirestoreDataConverter, deleteField } from 'firebase/firestore'
import { firestoreDefaultConverter } from 'vuefire'
import { useMembers } from '@/store/members'
import { useActivities } from '@/store/activities'
import type { Registration } from '@/store/registrations'
import { useImports } from '@/store/imports'

const RegistrationConverter: FirestoreDataConverter<Registration> = {
    fromFirestore: (snapshot: QueryDocumentSnapshot): Registration => {
        return firestoreDefaultConverter.fromFirestore(snapshot) as Registration
    },
    toFirestore: (registration: Registration) => {
        const activities = useActivities()
        const members = useMembers()
        const imports = useImports()
        const activity = doc(activities.ref, registration.activity.id)
        const member = doc(members.ref, registration.member.id)
        const imp = registration.import ? doc(imports.ref, registration.import.id) : null
        return firestoreDefaultConverter.toFirestore({ id: deleteField(), activity, member, import: imp })
    }
}

export default RegistrationConverter