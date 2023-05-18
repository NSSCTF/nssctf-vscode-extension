import { WorkspaceConfiguration, workspace } from "vscode";

export const getVsCodeConfig = (): WorkspaceConfiguration => {
    return workspace.getConfiguration("nssctf");
}

export const getTempFolderName = (): string => {
    return getVsCodeConfig().get<string>("tempFolderName", "tmp");
}

export const getBalderichAPI = (): Record<'key'|'secret',string> => {
    const key = getVsCodeConfig().get<string>('api.key', '');
    const secret = getVsCodeConfig().get<string>('api.secret', '');

    return {
        key: key,
        secret: secret
    };
}
