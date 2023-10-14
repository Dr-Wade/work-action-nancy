declare global {
    type Team = 'blue'|'green'|'red'|'orange'

    interface Member {
        personID: string
        name: string
        team: Team
    }

    interface Activity {
        id: string
        name: string
        start: Date
        end: Date
        hammer: number
    }

    interface Registrations {
        member: Member
        activity: Activity
        round?: number
    }

    interface Bonus {
        team: Team
        hammer: number
        description: string
    }
}