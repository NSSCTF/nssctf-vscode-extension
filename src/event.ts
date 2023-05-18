import { EventEmitter } from "events";
import { problemProvider } from "./provider/ProblemProvider";

class Event extends EventEmitter {
    public initialize() {
        this.on("userInfoUpdate", () => {
            problemProvider.refresh();
        })
    }
}

export const event: Event = new Event();