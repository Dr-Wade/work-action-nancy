import type { FieldValue, Timestamp } from "firebase/firestore"

export const useFormat = () => {
    const capitalize = (word: string) => word.at(0)!.toUpperCase() + word.slice(1)

    const dateFormat = new Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    })
    
    const date = (t: Timestamp) => t && dateFormat.format(t.toDate()) || ''
    
    return { capitalize, date }
}