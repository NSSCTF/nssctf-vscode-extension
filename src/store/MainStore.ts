import { ExtensionContext, Uri } from "vscode";
import { NSSClient } from "../lib/balderich";
import * as sutils from '../util/SystemUtil';

class MainStore {
    context = null as null|ExtensionContext
    cachePath = null as null|Uri
    client = null as null|NSSClient

    constructor() {
        sutils.init();
    }
}

export const mainStore: MainStore = new MainStore();