import * as vscode from 'vscode';
import * as i18n from './locale'; 


export const locale = (() => {
    let locale = i18n.default;
    let lang = vscode.env.language;
    let langLocale = null;

    try {
        langLocale = i18n.$[lang];
    } catch {
        try {
            langLocale = i18n.$[lang.split('-')[0]];
        } catch {}
    }

    if (langLocale) {
        locale = Object.assign(locale, langLocale);
    }
    return locale;
})();