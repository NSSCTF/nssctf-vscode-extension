import * as path from 'path';
import * as fs from 'fs';
import { getCacheDir } from "./SystemUtil";

export const getCacheFilePath = (name: string) => {
    return path.join(getCacheDir(), `${name}.json`);
}

export const getCache = (name: string) => {
    const filepath = getCacheFilePath(name);
    if (!fs.existsSync(filepath)) return null;

    return JSON.parse(fs.readFileSync(filepath).toString());
}

export const setCache = (name: string, value: Object) => {
    const filepath = getCacheFilePath(name);

    fs.writeFileSync(filepath, JSON.stringify(value));
}

export const delCache = (name: string) => {
    const filepath = getCacheFilePath(name);
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
}