import { useRegistrations } from "@/store/registrations"
import { useTeams } from "./useTeams"
import type { Team } from "./useTeams"
import { useBonuses } from "@/store/bonuses"
import { useStatuses } from "@/store/statuses"
import { useTeamConfigs } from "@/store/teamConfigs"

type PointsPerTeam = {
    [key in Team]: number
}
export const usePoints = () => {

    const { names } = useTeams()
    const initialPoints = { red: 0, blue: 0, green: 0, orange: 0 }
    const bonuses = useBonuses()
    const registrations = useRegistrations()
    const statuses = useStatuses()
    const teamConfigs = useTeamConfigs()
    
    const marteaux = () => registrations.list.reduce((acc: PointsPerTeam, registration) => {
        let team = registration.member.team
        if (team) acc[team] += registration.activity.points
        return acc
    }, { ...initialPoints })
    
    const pointsFromRegistrations = () => {
        const perTeam = marteaux()
        names.forEach((team) => {
            const numberOfU18 = teamConfigs.list.find((d) => d.id == team)?.numberOfU18 || 0
            if ( numberOfU18 == 0) perTeam[team] = 0
            else perTeam[team] = Math.ceil(100 * perTeam[team] / (numberOfU18 * 2)) //TODO: We count rounds of 2 months
        })
        return perTeam
    }

    const pointsFromBonuses = () => bonuses.list.reduce((acc: PointsPerTeam, bonus) => {
        if (bonus.team) acc[bonus.team] += Number(bonus.points)
        return acc
    }, { ...initialPoints })

    const weightedAverage = (nums: Array<number>, weights: Array<number>) => {
        const [sum, weightSum] = weights.reduce(
            (acc, w, i) => {
                acc[0] = acc[0] + nums[i] * w;
                acc[1] = acc[1] + w;
                return acc;
            },
            [0, 0]
        );
        return sum / weightSum;
    };

    const pointsFromYouth = () => {
        const pointsForU18 = pointsFromRegistrations()
        return statuses.list.reduce((acc: PointsPerTeam, status) => {
            const teamConfig = teamConfigs.list.find((t) => t.id == status.id)!
            acc[status.id as Team] += Math.ceil(weightedAverage([Number(status.buk), Number(status.samvirk), pointsForU18[status.id as Team]], [teamConfig.numberOfBUK, teamConfig.numberOfSamvirk, teamConfig.numberOfU18]))
            return acc
        }, { ...initialPoints })
    }
    
    const pointsFromCamps = () => statuses.list.reduce((acc: PointsPerTeam, status) => {
        acc[status.id as Team] += Math.ceil(100 * (Number(status.camps) + Number(status.lydia)) / 5000)
        return acc
    }, { ...initialPoints })

    const pointsTotal = () => {
        const PFB = pointsFromBonuses()
        const PFY = pointsFromYouth()
        const PFC = pointsFromCamps()
        return names.reduce((acc: PointsPerTeam, team) => {
            acc[team] = PFB[team] + (PFY[team] + PFC[team])/2
            return acc
        }, { ...initialPoints })
    }
    
    return {
        marteaux,
        pointsFromRegistrations,
        pointsFromBonuses,
        pointsTotal,
        pointsFromYouth,
        pointsFromCamps
    }
}