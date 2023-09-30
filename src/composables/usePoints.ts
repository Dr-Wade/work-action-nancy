import { useRegistrations } from "@/store/registrations"
import { useTeams } from "./useTeams"
import type { Team } from "./useTeams"
import { useBonuses } from "@/store/bonuses"
import type { Timestamp } from "firebase/firestore"

type PointsPerTeam = {
    [key in Team]: number
}
export const usePoints = () => {

    const { names } = useTeams()
    const initialPoints = { red: 0, blue: 0, green: 0, orange: 0 }
    const bonuses = useBonuses()
    const registrations = useRegistrations()

    const pointsFromRegistrations = (imported_at?: Timestamp) => registrations.list.reduce((acc: PointsPerTeam, registration) => {
        if (imported_at && (!registration.import || registration.import.imported_at.seconds > imported_at.seconds)) return acc
        let team = registration.member.team
        if (team) acc[team] += registration.activity.points
        return acc
    }, { ...initialPoints })

    
    const pointsFromBonuses = () => bonuses.list.reduce((acc: PointsPerTeam, bonus) => {
        if (bonus.team) acc[bonus.team] += Number(bonus.points)
        return acc
    }, { ...initialPoints })

    const pointsTotal = (imported_at?: Timestamp) => {
        const PFR = pointsFromRegistrations(imported_at)
        const PFB = pointsFromBonuses()
        return names.reduce((acc: PointsPerTeam, team) => {
            acc[team] = PFR[team] + PFB[team]
            return acc
        }, { ...initialPoints })
    }
    
    return {
        pointsFromRegistrations,
        pointsFromBonuses,
        pointsTotal
    }
}