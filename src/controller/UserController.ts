import * as vscode from 'vscode';
import { mainStore } from "../store/MainStore";
import * as cutils from '../util/CodeUtil' ;
import * as sutils from '../util/SystemUtil' ;
import * as path from 'path';
import { userStore } from '../store/UserStore';
import { locale } from '../i18n';
import { exceptionCatch, requireLogin } from '../util/DecoratorUtil';

class UserController {
    @exceptionCatch()
    @requireLogin()
    public async pastePicture(): Promise<void> {
        let stop = cutils.showProgress();
        
        let editor = vscode.window.activeTextEditor;
        let selections = cutils.getSelections();
        let urls = [];

        let savePath = sutils.getTempDir();
        savePath = path.resolve(savePath, `pic_${new Date().getTime()}.png`);
        let images = await cutils.getPasteImage(savePath);

        images = images.filter(img => ['.jpg', '.jpeg', '.gif', '.bmp', '.png', '.webp', '.svg'].find(ext => img.endsWith(ext)));
        for (let i = 0; i < images.length; i++) {
            let name = path.basename(images[i]);
            let res = await mainStore.client?.user.postUserPicturebedUpload(name, images[i]);
            if (res) {
                urls.push(`https://www.nssctf.cn/${res.url}`);
            }
        }

        console.log(urls);

        let insertMsg = '';
        for (let i = 0; i < urls.length; i++) {
            let selection = locale['imageAlt'];
            if (selections?.length === 1 && editor?.document.getText(selections[0])) {
                selection = `${editor?.document.getText(selections[0])} ${i+1}`;
            } else if (selections?.[i] && editor?.document.getText(selections[i])) {
                selection = selections?.[i] && editor?.document.getText(selections[i]);
            }

            
            let text = `![${selection}](${urls[i]}) \n`;

            insertMsg += text;
        }
        if (insertMsg) {
            let pos = editor?.selection.active;
            await cutils.editorEdit(pos, insertMsg);
        }

        stop();
    }

    public async signIn(): Promise<void> {
        const key: string | undefined = await vscode.window.showInputBox({
            prompt: locale['siginInputKeyPropmt'],
            ignoreFocusOut: true,
            validateInput: (s: string): string | undefined => {
                return s && s.trim() ? undefined : locale['siginInputKeyInvalidMessage']
            }
        });

        if (!key) {
            return;
        }
        const secret: string | undefined = await vscode.window.showInputBox({
            prompt: locale['siginInputSecretPropmt'],
            password: true,
            ignoreFocusOut: true,
            validateInput: (s: string): string | undefined => {
                return s && s.trim() ? undefined : locale['siginInputSecretInvalidMessage']
            }
        })

        if (!secret) {
            return;
        }

        if (await userStore.signIn(key, secret)) {
            vscode.window.showInformationMessage(locale['signinSuccessMessage']);
        } else {
            await vscode.window.showErrorMessage(locale['signinFailedMessage']);
        }
    }
}

export const userController: UserController = new UserController();