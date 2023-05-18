import { event } from "../event";
import { userService } from "../service/UserService";

class UserStore {
    private uid: number | undefined
    private username: string | undefined;
    private email: string | undefined;
    private status: boolean = false  // 登录状态

    public async updateLoginStatus() {
        try {
            const res = await userService.getUserInfo();

            if (res) {
                this.parseUserInfo(res);
            }
        } finally {
            event.emit("userInfoUpdate");
        }
    }

    public parseUserInfo(info: Record<string,any>) {
        this.uid = info.uid || this.uid;
        this.username = info.username || this.username;
        this.email = info.email || this.email;

        if (this.uid) {
            this.status = true;
        }
    }

    public isLogin() {
        return this.status;
    }

    public async signIn(key: string, secret: string) {
        const flag = await userService.signIn(key, secret);
        if (flag) {
            this.updateLoginStatus();
        }
        return flag;
    }
}

export const userStore: UserStore = new UserStore();