import { userController } from './controller/UserController';
import * as vscode from 'vscode';
import { mainController } from './controller/MainController';
import { userStore } from './store/UserStore';
import { output } from './util/CodeUtil';
import { problemProvider } from './provider/ProblemProvider';
import { event } from './event';

export async function activate(context: vscode.ExtensionContext) {
	try {
		// 初始化
		await mainController.initialize(context);
		event.initialize();

		context.subscriptions.push(
			// vscode.window.createTreeView('ProblemExplorer', { treeDataProvider: problemProvider, showCollapseAll: true }),
			vscode.commands.registerCommand('nssctf.pastePicture', async () => userController.pastePicture()),
			vscode.commands.registerCommand('nssctf.signIn', () => userController.signIn()),
		);

		await userStore.updateLoginStatus();
	} catch (error: any) {
		output.appendLine(error.toString());
		await vscode.window.showErrorMessage('扩展初始化失败，请在输出中查看详情。');
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
