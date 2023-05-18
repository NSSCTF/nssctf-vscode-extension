import { Blob } from 'buffer'
import { SUCCESS } from '../utils/code'
import { getException } from '../utils/exceptions'
import { Collection } from './resource'
import * as fs from 'fs'
import FormData = require('form-data')

interface UserInfo {
    uid: number
    bio: string
    intro: string
    username: string
    solves: number
    rating: number
    avatar: string
    cover: string
    register_date: number
    last_login_date: number
    email: string
    followers: number
    following: number
    tid: number
    team: string
    is_vip: boolean
}

interface UserActiveStatistics {
    start_date: number
    ends_date: number
    count: [string, number][]
}

interface UserSolvesStatistics {
    type: number
    name: string
    data: number[]
}

interface UserRatingStatistics {
    date: number
    rating: number
    title: string
    rank: number
    unrated: boolean
    nums: number
}

interface UserRadarStatistics {
    date: number
    rating: number
    title: string
    rank: number
    unrated: boolean
    nums: number
}

interface Article {
    id: number
    title: string
    date: number
    type: number
}

interface UserFollowing {
    uid: number
    username: string
    bio: string
    avatar: string
}

interface UserPicturebedUsed {
    used_mem: number
    max_mem: number
    total: number
}

interface UserPicture {
    id: number
    name: string
    date: number
    size: number
    url: string
}

export class UserCollection extends Collection {
    async getSelfInfo(): Promise<UserInfo> {
        const endpoint = `user/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserInfo
    }

    async getUserInfo(name: string): Promise<UserInfo> {
        const endpoint = `user/${name}/info/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserInfo
    }

    async getUserStatisticsActive(uid: number): Promise<UserActiveStatistics> {
        const endpoint = `user/${uid}/statistics/active/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserActiveStatistics
    }

    async getUserStatisticsSolves(uid: number): Promise<UserSolvesStatistics[]> {
        const endpoint = `user/${uid}/statistics/solves/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserSolvesStatistics[]
    }

    async getUserStatisticsRating(uid: number): Promise<UserRatingStatistics[]> {
        const endpoint = `user/${uid}/statistics/rating/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserRatingStatistics[]
    }

    async getUserStatisticsRadar(uid: number): Promise<UserRadarStatistics[]> {
        const endpoint = `user/${uid}/statistics/radar/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserRadarStatistics[]
    }

    async getUserArticleList(uid: number, page: number, size: number): Promise<{ articles: Article[]; total: number }> {
        const endpoint = `user/${uid}/article/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as { articles: Article[]; total: number }
    }

    async getUserFollowingList(uid: number, page: number, size: number): Promise<UserFollowing[]> {
        const endpoint = `user/${uid}/following/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserFollowing[]
    }

    async getUserFollowerList(uid: number, page: number, size: number): Promise<UserFollowing[]> {
        const endpoint = `user/${uid}/follower/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserFollowing[]
    }

    async getUserPicturebedUsed(): Promise<UserPicturebedUsed> {
        const endpoint = `user/picturebed/used/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserPicturebedUsed
    }

    async getUserPicturebedList(page: number, size: number): Promise<{ pictures: UserPicture[]; total: number }> {
        const endpoint = `user/picturebed/list/${page}/${size}/`
        const [code, data] = await this.client._get(endpoint)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as { pictures: UserPicture[]; total: number }
    }

    async postUserPicturebedUpload(filename: string, filepath: string): Promise<UserPicture> {
        const form = new FormData()
        form.append('image', fs.createReadStream(filepath) as any, filename)

        const [code, data] = await this.client._post('user/picturebed/upload/', form)

        if (code !== SUCCESS) {
            throw getException(code)
        }

        return data as UserPicture
    }

    async postUserPicturebedDownload(pid: number): Promise<Blob> {
        const endpoint = `user/picturebed/${pid}/download/`
        const res = await this.client._post(endpoint, null, false)

        if (res.headers['Content-Type'] !== 'application/octet-stream') {
            throw getException(JSON.parse(res.data).code)
        }
        return new Blob([res.data])
    }
}
