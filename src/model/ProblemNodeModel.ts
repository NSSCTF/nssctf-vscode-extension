import { Command } from "vscode";
import locale from "../i18n/locale";

export interface Problem {
    id: number|string,
    title: string,
    point: number,
    solved: number,
    level: number,
    tags: string[],
    isLike: boolean,
    isOpen: boolean
}

export enum ProblemCategory {
    ALL = '0',
    类型 = '1',
    难度 = '2',
    比赛 = '3',
    收藏 = '4',
}

export enum ProblemDifficulty {
    入门 = '0',
    简单 = '1',
    中等 = '2',
    困难 = '3',
}

export enum ProblemSource {
    ALL = '0',
    NSS = '1',
    PRIZE = '2',
    CISCN = '3',
    公开赛 = '4',
    SWPU = '5',
    线下赛 = '6'
}

export enum ProblemType {
    ALL = '0',
    WEB = '1',
    PWN = '2',
    REVERSE = '3',
    CRYPTO = '4',
    MISC = '5',
    MOBILE = '6',
    ETH = '7',
    IOT = '8',
    AI = '9',
    REAL = '10',
}

export class ProblemNodeModel {
    constructor(public data: Problem, public isLeafNode: boolean = true) {}

    public get id(): number|string { return this.data.id; }
    public get title(): string { return this.data.title; }
    public get point(): number { return this.data.point; }
    public get difficulty(): string {
        if (this.data.point == 1) {
            return 'E';
        }
        if (this.data.solved > 100 || this.data.level < 1.5) { return 'E'; }
        return ['E', 'M', 'H'][Math.round(this.data.level / 2)];
    }
    public get tags(): string[] { return this.data.tags;}
    public get isLeaf(): boolean { return this.isLeafNode; }
    public get isLike(): boolean { return this.data.isLike; }

    public get command(): Command {
        return {
            title: locale['problemNodeModelCommandTitle'],
            command: 'nssctf.previewProblem',
            arguments: [this]
        }
    }
}

export const defaultProblem: Problem = {
    id: 0,
    title: '',
    point: 0,
    solved: 0,
    level: .0,
    tags: [],
    isLike: false,
    isOpen: false
}