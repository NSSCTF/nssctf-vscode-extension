import { ConfigurationTarget } from "vscode";
import { NSSClient } from "../lib/balderich";
import { mainStore } from "../store/MainStore";
import { output } from "../util/CodeUtil";
import { getVsCodeConfig } from "../util/ConfigUtil";

class UserService {
    public async getUserInfo() {
        if (!mainStore.client) return null;

        return mainStore.client.user.getSelfInfo();
    }

    public async signIn(key: string, secret: string) {
        const _client = new NSSClient(null, key, secret);
        try {
            _client.user.getSelfInfo();
        } catch (error: any) {
            output.appendLine(error.toString());
            return false;
        }

        getVsCodeConfig().update('api.key', key, ConfigurationTarget.Global);
        getVsCodeConfig().update('api.secret', secret, ConfigurationTarget.Global);
        mainStore.client = _client;
        return true;
    }
}

export const userService: UserService = new UserService();