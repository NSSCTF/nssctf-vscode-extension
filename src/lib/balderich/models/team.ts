import { SUCCESS } from '../utils/code'
import { getException } from '../utils/exceptions'
import { Collection } from './resource'

interface User {
    uid: number
    rating: number
    username: string
}

interface Team {
    id: number
    name: string
    bio: number
    date: number
    user: User
    nums: number
}

interface TeamListResponse {
    teams: Team[]
    total: number
}

interface TeamInfo {
    id: number
    name: string
    bio: number
    date: number
    avatar: string
    user: User
    nums: number
}

interface TeamNotice {
    notice: string
}

interface TeamClockinResponse {
    state: boolean
    nums: number
}

interface Problem {
    id: number
    title: string
    point: number
    tags: string[]
    level: number
    solves: number
}

interface TeamProblemListResponse {
    problems: Problem[]
    total: number
}

interface TeamProblemInfo {
    id: number
    title: string
    desc: string
    point: number
    tags: string[]
    hint: boolean
    level: number
    annex: boolean
    docker: boolean
    price: number
    likes: number
    date: number
    info: {
        solved: number
        wa: number
    }
    author: {
        uid: number
        name: string
        rating: number
    }
}

interface Contest {
    id: number
    cover: string
    title: string
    start_date: number
    ends_date: number
    is_team: boolean
    desc: string
    state: number
}

interface TeamContestListResponse {
    contests: Contest[]
    total: number
}

interface TeamContestInfo {
    title: string
    level: number
    type: number
    mode: number
    desc: string
    cover: string
    top_score: number
    decrease_score: number
    start_date: number
    ends_date: number
}

interface TeamContestRankListResponse {
    category: string[]
    point: {
        [key: number]: number
    }
    problems: [number, number, string][]
    top3: {
        [key: number]: string[]
    }
    solves: {
        uid: number
        username: string
        rating: number
        solved: string
        solved_time: string
        score: number
    }[]
    team: boolean
    total: number
}

interface TeamUser {
    id: number
    uid: number
    username: string
    rating: number
    alias: string
    date: number
    role: number
}

interface TeamUserListResponse {
    users: TeamUser[]
    total: number
}

interface TeamApplyUser {
    id: number
    uid: number
    username: string
    rating: number
    msg: string
    date: number
}

interface TeamApplyListResponse {
    users: TeamApplyUser[]
    total: number
}

interface TeamAnalysisUse {
    problem: {
        now: number
        max: number
    }
    contest: {
        now: number
        max: number
    }
    memory: {
        now: number
        max: number
    }
    person: {
        now: number
        max: number
    }
    level: number
    state: boolean
}

export class TeamCollection extends Collection {
    async getTeamListByPage(page: number, size: number = 10): Promise<TeamListResponse> {
        const endpoint = `team/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamListResponse
    }

    async getTeamInfo(tid: number): Promise<TeamInfo> {
        const endpoint = `team/${tid}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamInfo
    }

    async getTeamNotice(): Promise<TeamNotice> {
        const endpoint = `team/notice/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamNotice
    }

    async putTeamClockin(): Promise<TeamClockinResponse> {
        const endpoint = `team/clockin/`
        const [code, data] = await this.client._put(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamClockinResponse
    }

    async getTeamProblemListByPage(page: number, size: number = 10): Promise<TeamProblemListResponse> {
        const endpoint = `team/problem/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamProblemListResponse
    }

    async getTeamProblemInfo(pid: number): Promise<TeamProblemInfo> {
        const endpoint = `team/problem/${pid}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamProblemInfo
    }

    async getTeamContestListByPage(page: number, size: number = 10): Promise<TeamContestListResponse> {
        const endpoint = `team/contest/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamContestListResponse
    }

    async getTeamContestInfo(cid: number): Promise<TeamContestInfo> {
        const endpoint = `team/contest/${cid}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamContestInfo
    }

    async getTeamContestRankListByPage(
        cid: number,
        page: number,
        size: number = 15,
    ): Promise<TeamContestRankListResponse> {
        const endpoint = `team/contest/${cid}/rank/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamContestRankListResponse
    }

    async getTeamUserListByPage(page: number, size: number = 10): Promise<TeamUserListResponse> {
        const endpoint = `team/user/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamUserListResponse
    }

    async getTeamApplyListByPage(page: number, size: number = 10): Promise<TeamApplyListResponse> {
        const endpoint = `team/user/apply/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamApplyListResponse
    }

    async getTeamAnalysisUse(): Promise<TeamAnalysisUse> {
        const endpoint = `team/analysis/use/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as TeamAnalysisUse
    }

    async postTeamAnalysisSolvesCurve(uids: number[]): Promise<any> {
        const endpoint = `team/analysis/solves/curve/`
        const [code, data] = await this.client._post(endpoint, {
            uids: uids,
        })

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data
    }

    async getTeamStatisticsDay(uids: number[]): Promise<any> {
        const endpoint = `team/statistics/day/`
        const [code, data] = await this.client._get(endpoint, { uids: uids })

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data
    }
}
