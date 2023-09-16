import { useMembers, type Member } from "@/store/members"
import { computed } from "vue"

export type Team = 'blue'|'green'|'red'|'orange'
type Context = 'info' | 'success' | 'danger' | 'warning'

type TeamMembers = {
    [key in Team]?: Array<Member>
}

type TeamContexts = {
    [key in Team]: Context
}
export const useTeams = () => {
    const names: Team[] = ['blue', 'green', 'red', 'orange']
    const members = useMembers()
    const teams = computed(() => names.reduce((acc: TeamMembers, n) => {
        acc[n] = members.list.filter((m) => m.team == n)
        return acc
    }, {}))

    const contexts: TeamContexts = { blue: 'info', green: 'success', red: 'danger', orange: 'warning' }

    return {
        names,
        teams,
        contexts
    }
}