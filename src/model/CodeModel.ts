import { MessageItem } from "vscode";

export const MessageItemObj: MessageItem = {
    title: "",
    isCloseAffordance: false,
};

export const DialogOptions = {
    open: Object.assign({}, MessageItemObj, { title: '打开' }),
    yes: Object.assign({}, MessageItemObj, { title: "是" }),
    cancel: Object.assign({}, MessageItemObj, { title: "取消", isCloseAffordance: true,}),
    never: Object.assign({}, MessageItemObj, { title: "从不" }),
    singUp: Object.assign({}, MessageItemObj, { title: "注册" }),
}