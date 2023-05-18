import { ExtensionContext, window } from "vscode";
import { mainStore } from "../store/MainStore";
import { NSSClient } from "../lib/balderich";
import { getBalderichAPI } from "../util/ConfigUtil";
import { output } from "../util/CodeUtil";
import locale from "../i18n/locale";

class MainController {
    public async initialize(context: ExtensionContext) {
        mainStore.context = context;
        mainStore.cachePath = context.globalStorageUri;
        const api = getBalderichAPI();
        if (api.key.length !== 0) {
            mainStore.client = new NSSClient(null, api.key, api.secret);
            try {
                await mainStore.client.user.getSelfInfo()
            } catch (Error: any) {
                output.appendLine(Error.toString());
                mainStore.client = null;
                await window.showErrorMessage(locale['apiError']);
            }
        
        }
    }
}

export const mainController: MainController = new MainController();