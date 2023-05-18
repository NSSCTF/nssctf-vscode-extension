import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { locale } from '../i18n';
import { DialogOptions } from '../model/CodeModel';

// 获取目前选中
export const getSelections = (): readonly vscode.Selection[] | null => {
    let editor = vscode.window.activeTextEditor;
    return editor ? editor.selections : null;
}

// from https://github.com/imlinhanchao/vsc-markdown-image/blob/master/src/lib/utils.ts#L249
export const getPasteImage = (savePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        let platform = process.platform;

        if (platform === 'win32') {  // Windows
            const scriptPath = path.join(__dirname, '..', '..', 'assets', 'scripts', 'paste.ps1');

            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = fs.existsSync(command);

            if (!powershellExisted) {
                command = "powershell";
            };

            let output = '';

            const powershell = spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
                savePath
            ]);

            // the powershell can't auto exit in windows 7 .
            let timer = setTimeout(() => powershell.kill(), 2000);

            powershell.on('error', (e: any) => {
                if (e.code === 'ENOENT') {
                    vscode.window.showErrorMessage(locale['powershell_not_found']);
                } else {
                    vscode.window.showErrorMessage(e);
                }
            });

            powershell.stdout.on('data', (data) => {
                data.toString().split('\n').forEach((d: string | string[]) => output += (d.indexOf('Active code page:') < 0 ? d + '\n' : ''));
                clearTimeout(timer);
                console.log(data.toString())
                timer = setTimeout(() => powershell.kill(), 2000);
            });
            powershell.on('close', (code) => {
                resolve(output.trim().split('\n').map(i => i.trim()));
            });
        } else if (platform === 'darwin') { // Mac
            let scriptPath = path.join(__dirname, '..', '..', 'assets', 'script', 'paste.applescript');

            let ascript = spawn('osascript', [scriptPath, savePath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.stdout.on('data', (data) => {
                resolve(data.toString().trim().split('\n'));
            });
        } else {
            // Linux

            let scriptPath = path.join(__dirname, '..', '..', 'assets', 'script', 'paste.sh');

            let ascript = spawn('sh', [scriptPath, savePath]);
            ascript.on('error', (e: any) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.stdout.on('data', (data) => {
                let result = data.toString().trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage(locale['install_xclip']);
                    return;
                }
                let match = decodeURI(result).trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/g);
                resolve(match || []);
            });
        }
    })
}

export const editorEdit = async (selection: vscode.Selection | vscode.Position | undefined | null, text: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        vscode.window.activeTextEditor?.edit(e => {
            if (selection) {
                e.replace(selection, text);
            }
        }).then(resolve);
    });
}

export const openUrl = async (url: string): Promise<void> => {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(url));
}

export const showProgress = () => {
    let show = true;
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: locale['imagePasteUploadProgressTitle'],
        cancellable: false,
    }, (progress, token) => {
        return new Promise(resolve => {
            let timer = setInterval(() => {
                if (show) { return; }
                clearInterval(timer);
                resolve(show);
            }, 200)
        });
    });

    return () => show = false;
}

export const signInNotify = async () => {
    const choice: vscode.MessageItem | undefined = await vscode.window.showInformationMessage(
        locale['no_api'],
        DialogOptions.yes,
        DialogOptions.cancel,
        DialogOptions.singUp
    );

    switch (choice) {
        case DialogOptions.yes:
            await vscode.commands.executeCommand('nssctf.signIn');break;
        case DialogOptions.singUp:
            openUrl(locale['NSSCTF_URL']);break;
        default:
            break
    }
}

class Output implements vscode.Disposable {
    private readonly channel: vscode.OutputChannel = vscode.window.createOutputChannel("NSSCTF");

    public appendLine(message: string) {
        this.channel.appendLine(message);
    }

    public append(message: string): void {
        this.channel.append(message);
    }

    public show(): void {
        this.channel.show();
    }
    public dispose(): void {
        this.channel.dispose();
    }
}

export const output: Output = new Output();