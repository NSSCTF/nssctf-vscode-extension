import { SUCCESS } from '../utils/code'
import { getException } from '../utils/exceptions'
import { Collection } from './resource'

interface ProblemListData {
    problems: Problem[]
    total: number
}

interface Problem {
    id: number
    title: string
    point: number
    tags: string[]
    level: number
    author: {
        uid: number
        name: string
        rating: number
    }
}

interface ProblemInfo {
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

interface ProblemSheetListData {
    sheets: ProblemSheet[]
    total: number
}

interface ProblemSheet {
    id: number
    title: string
    stars: number
    count: number
    author: {
        uid: number
        name: string
        rating: number
    }
}

interface ProblemSheetInfo {
    id: number
    title: string
    stars: number
    count: number
    type: number
    content: string
    author: {
        uid: number
        name: string
        rating: number
    }
}

interface ProblemSheetProblemListData {
    problems: ProblemSheetProblem[]
    total: number
}

interface ProblemSheetProblem {
    id: number
    title: string
    point: number
    solved: number
    level: number
    tags: string[]
    index: number
}

export class ProblemCollection extends Collection {
    async get_problem_list_by_page(page: number, size: number = 10): Promise<ProblemListData> {
        const endpoint = `problem/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as ProblemListData
    }

    async get_problem_info(pid: number): Promise<ProblemInfo> {
        const endpoint = `problem/${pid}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as ProblemInfo
    }

    async get_problem_sheet_list_by_page(page: number, size: number = 10): Promise<ProblemSheetListData> {
        const endpoint = `problem/sheet/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as ProblemSheetListData
    }

    async get_problem_sheet_info(psid: number): Promise<ProblemSheetInfo> {
        const endpoint = `problem/sheet/${psid}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as ProblemSheetInfo
    }

    async get_problem_sheet_problem_list_by_page(
        psid: number,
        page: number,
        size: number = 10,
    ): Promise<ProblemSheetProblemListData> {
        const endpoint = `problem/sheet/${psid}/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as ProblemSheetProblemListData
    }
}
