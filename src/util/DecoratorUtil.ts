import { userStore } from "../store/UserStore"
import * as cutils from '../util/CodeUtil' ;

export const requireLogin = () => {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const org = descriptor.value;
        
        descriptor.value = function (...args: any[]) {
            if (!userStore.isLogin()) {
                cutils.signInNotify();
            } else {
                org.call(this, ...args);
            }
        }
    }
}

export const exceptionCatch = () => {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const org = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let results;
            try {
                results = org.call(this, ...args);
            } catch (error: any) {
                cutils.output.appendLine(error.toString());
            }
            return results;
        };
        return descriptor;
    }
}