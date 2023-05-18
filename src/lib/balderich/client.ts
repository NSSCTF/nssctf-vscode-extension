import { createHash } from 'crypto'
import * as fs from 'fs'
import Axios from 'axios'
import { ContestCollection } from './models/contest'
import { ProblemCollection } from './models/problem'
import { UserCollection } from './models/user'
import { TeamCollection } from './models/team'

class AuthConfig {
    key: string
    secret: string

    constructor(key: string, secret: string) {
        this.key = key
        this.secret = secret
    }

    static load_config_file(filepath: string) {
        const content = fs.readFileSync(filepath).toString()

        const data = JSON.parse(content)

        const authConfig = new AuthConfig(data['key'], data['secret'])
        return authConfig
    }

    sign(path: string, timestamp: number | null = null, prefix: string = '/v2/api/'): [string, number] {
        if (timestamp === null) {
            timestamp = Math.floor(new Date().getTime() / 1000)
        }
        const sha256 = (t: string) => createHash('sha256').update(t).digest('hex')
        const res = sha256(`${prefix}${path}#${this.key}#${timestamp}#${this.secret}`)

        return [res, timestamp]
    }
}

class NSSClient {
    auth_config: AuthConfig
    url: string

    constructor(
        auth_config: AuthConfig | null = null,
        key: string | null = null,
        secret: string | null = null,
        url: string | null = null,
    ) {
        if (url === null) {
            url = 'https://www.nssctf.cn/v2/api/'
        }
        if (auth_config === null) {
            if (key && secret) {
                auth_config = new AuthConfig(key, secret)
            } else {
                throw Error('key or secret is null.')
            }
        }

        this.url = url
        this.auth_config = auth_config
    }

    get user() {
        return new UserCollection(this)
    }

    get problem() {
        return new ProblemCollection(this)
    }

    get contest() {
        return new ContestCollection(this)
    }

    get team() {
        return new TeamCollection(this)
    }

    get key() {
        return this.auth_config.key
    }

    async _get(path: string): Promise<[number, any]> {
        const [sign, timestamp] = this.auth_config.sign(path)
        const res = await Axios.get(`${this.url}${path}`, {
            params: {
                key: this.key,
                time: timestamp,
                sign: sign,
            },
        })

        const resJson = res.data
        const code = resJson['code']
        const data = resJson['data']

        return [code, data]
    }

    async _post(path: string, data: object | null = null, blob: boolean = false): Promise<[number, any]> {
        if (data === null) {
            data = {}
        }
        const [sign, timestamp] = this.auth_config.sign(path)
        let res

        if (!blob) {
            res = await Axios.post(`${this.url}${path}`, data, {
                params: {
                    key: this.key,
                    time: timestamp,
                    sign: sign,
                },
            })
        } else {
            return await Axios.post(`${this.url}${path}`, data, {
                params: {
                    key: this.key,
                    time: timestamp,
                    sign: sign,
                },
                responseType: 'blob',
            })
        }
        const resJson = res.data

        return [resJson['code'], resJson['data']]
    }

    async _put(path: string, data: object | null = null): Promise<[number, any]> {
        if (data === null) {
            data = {}
        }

        const [sign, timestamp] = this.auth_config.sign(path)
        const res = await Axios.put(`${this.url}${path}`, data, {
            params: {
                key: this.key,
                time: timestamp,
                sign: sign,
            },
        })
        const resJson = res.data

        return [resJson['code'], resJson['data']]
    }
}

export { NSSClient }
