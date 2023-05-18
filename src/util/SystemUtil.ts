import { homedir, tmpdir } from 'os';
import * as fs from 'fs';
import { getTempFolderName } from './ConfigUtil';
import * as path from 'path';


export const getUserHomeDir = () => {
    return homedir();
}

export const getHomeDir = () => {
    return path.join(getUserHomeDir(), '.nssctf');
}

export const init = () => {
    if (!fs.existsSync(getHomeDir())) { fs.mkdirSync(getHomeDir()); }
}

export const getTempDir = () => {
    let tmpPath = path.join(getHomeDir(), getTempFolderName());
    if (!fs.existsSync(tmpPath)) { fs.mkdirSync(tmpPath); }
    return tmpPath;
}

export const getCacheDir = () => {
    return path.join(getHomeDir(), "cache");
}
