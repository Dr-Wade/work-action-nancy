import { useMembers, type Member } from "@/store/members"
import { computed } from "vue"

export type Team = 'blue'|'green'|'red'|'orange'

type TeamMembers = {
    [key in Team]?: Array<Member>
}

export const useTeams = () => {
    const names: Team[] = ['blue', 'green', 'red', 'orange']
    const members = useMembers()
    const teams = computed(() => names.reduce((acc: TeamMembers, n) => {
        acc[n] = members.list.filter((m) => m.team == n)
        return acc
    }, {}))

    return {
        names,
        teams
    }
}