import { useRegistrations } from "@/store/registrations"
import { useTeams } from "./useTeams"
import { computed } from "vue"
import type { Team } from "./useTeams"
import { useBonuses } from "@/store/bonuses"

type PointsPerTeam = {
    [key in Team]: number
}
export const usePoints = () => {

    const { names } = useTeams()
    const initialPoints = { red: 0, blue: 0, green: 0, orange: 0 }
    const registrations = useRegistrations()
    const pointsFromRegistrations = computed(() => registrations.list.reduce((acc: PointsPerTeam, registration) => {
        let team = registration.member.team
        if (team) acc[team] += registration.activity.points
        return acc
    }, { ...initialPoints }))

    const bonuses = useBonuses()
    const pointsFromBonuses = computed(() => bonuses.list.reduce((acc: PointsPerTeam, bonus) => {
        if (bonus.team) acc[bonus.team] += Number(bonus.points)
        return acc
    }, { ...initialPoints }))

    const pointsPerTeam = computed(() => names.reduce((acc: PointsPerTeam, team) => {
        acc[team] = pointsFromRegistrations.value[team] + pointsFromBonuses.value[team]
        return acc
    }, { ...initialPoints }))

    return {
        pointsFromRegistrations,
        pointsFromBonuses,
        pointsPerTeam
    }
}