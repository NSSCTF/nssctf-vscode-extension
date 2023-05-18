import { CancellationToken, Event, EventEmitter, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";
import { userStore } from "../store/UserStore";
import { ProblemNodeModel, defaultProblem,Problem, ProblemCategory, ProblemSource, ProblemType, ProblemDifficulty } from "../model/ProblemNodeModel";
import locale from "../i18n/locale";

class ProblemProvider implements TreeDataProvider<ProblemNodeModel> {
    private onDidChangeTreeDataEvent: EventEmitter<ProblemNodeModel | null> = new EventEmitter<ProblemNodeModel | null>();
    readonly onDidChangeTreeData = this.onDidChangeTreeDataEvent.event;
    // public initialize() {

    // }

    getTreeItem(element: any): TreeItem | Thenable<TreeItem> {
        if (element.id === 'notLogin') {
            return {
                label: element.title,
                collapsibleState: TreeItemCollapsibleState.None,
                command: {
                    command: 'nssctf.signIn',
                    title: '未登录'
                }
            }
        }
        return {
            label: element.isLeaf
                ? `PID:${element.id}. ${element.title}`
                : element.title,
            collapsibleState: element.isLeaf
                ? TreeItemCollapsibleState.None
                : TreeItemCollapsibleState.Collapsed,
            // iconPath: 
            command: element.command,
            resourceUri: element.uri,
            contextValue: element.isLeaf
                ? `problem${['', '-like'][element.isLike+0]}`
                : undefined
        }
    }
    getChildren(element?: ProblemNodeModel | undefined): ProviderResult<ProblemNodeModel[]> {
        if (!userStore.isLogin()) {
            return [
                new ProblemNodeModel(
                    Object.assign({}, defaultProblem, {
                        id: 'notLogin',
                        title: locale['notLoginNodeName']
                    })
                )
            ]
        }

        let res = [];

        if (!element) {  // 根节点
            for (let type in ProblemCategory) {
                res.push(new ProblemNodeModel(
                    Object.assign({}, defaultProblem, {
                        id: `${type}`,
                        title: type
                    }),
                    false,
                ))
            }
        } else if (element.isLeaf) {
            return [];
        } else {
            switch (element.id) {
                case ProblemCategory.ALL:
                    return this.getAllNodes();
                case ProblemCategory.类型:
                    for (let type in ProblemType) {
                        res.push(new ProblemNodeModel(
                            Object.assign({}, defaultProblem, {
                                id: `${element.id}.${type}`,
                                title: type
                            }),
                            false,
                        ))
                    }
                    break;
                case ProblemCategory.难度:
                    for (let type in ProblemDifficulty) {
                        res.push(new ProblemNodeModel(
                            Object.assign({}, defaultProblem, {
                                id: `${element.id}.${type}`,
                                title: type
                            }),
                            false,
                        ))
                    }
                    break;
                case ProblemCategory.比赛:
                    return this.getContestNodes();
                case ProblemCategory.收藏:
                    return this.getLikeNodes();
                default:
                    return this.getChildrenNodes(element);
            }
        }

        return res;
    }
    getAllNodes(): ProviderResult<ProblemNodeModel[]> {
        throw new Error("Method not implemented.");
    }
    getContestNodes(): ProviderResult<ProblemNodeModel[]> {
        throw new Error("Method not implemented.");
    }
    getLikeNodes(): ProviderResult<ProblemNodeModel[]> {
        throw new Error("Method not implemented.");
    }

    public async refresh(): Promise<void> {
        this.onDidChangeTreeDataEvent.fire(null);
    }

    getRootNodes():Problem[] {
        throw new Error("Method not implemented.");
    }

    getChildrenNodes(element: ProblemNodeModel):  ProviderResult<ProblemNodeModel[]> {
        throw Error()
    }
}

export const problemProvider: ProblemProvider = new ProblemProvider();