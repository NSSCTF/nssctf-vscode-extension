import { SUCCESS } from '../utils/code'
import { getException } from '../utils/exceptions'
import { Collection } from './resource'

export class ContestCollection extends Collection {
    async get_contest_list(type: number, page: number): Promise<Record<string, any>> {
        /**
         * 获取比赛列表。数据缓存10分钟。
         *
         * @param type - 比赛类型
         *              0 -> 公开赛事
         *              1 -> 私密赛事
         * @param page - 页面参数
         * @returns {
         *     contests: [{
         *         id: number,
         *         cover: string,
         *         title: string,
         *         level: number,
         *         mode: number,
         *         start_date: number,
         *         ends_date: number,
         *         desc: number,
         *         state: number,
         *         count: number
         *     }],
         *     total: number
         * }
         */
        const [code, data] = await this.client._get(`contest/${type}/list/${page}/`)
        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data
    }

    async get_contest_info(cid: number): Promise<Record<string, any>> {
        /**
         * 获取比赛详细信息。数据缓存10分钟。
         *
         * @param cid - 比赛ID
         * @returns {
         *     id: number,
         *     title: string,
         *     level: number,
         *     type: number,
         *     mode: number,
         *     desc: number,
         *     cover: string,
         *     top_score: number,
         *     decrease_score: number,
         *     start_date: number,
         *     ends_date: number,
         *     is_team: boolean
         * }
         */
        const [code, data] = await this.client._get(`contest/${cid}/info/`)
        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data
    }

    async get_contest_rank_list(cid: number, page: number): Promise<Record<string, any>> {
        /**
         * 获取比赛榜单信息。相同路径数据缓存60秒。
         *
         * @param cid - 比赛ID
         * @param page - 页面参数
         * @returns {
         *     category: string[],
         *     point: Dictionary<number>,
         *     problems: [number, number, string][],
         *     top3: Dictionary<string[]>,
         *     solves: {
         *         uid: number,
         *         username: string,
         *         rating: number,
         *         solved: string,
         *         solved_time: string,
         *         score: number,
         *     }[],
         *     team: boolean,
         *     total: number
         * }
         */
        const [code, data] = await this.client._get(`contest/${cid}/rank/list/${page}/`)
        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data
    }
}
