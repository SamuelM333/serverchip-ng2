import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketIOService {

    constructor(private socket: Socket) { }

    sendMessage(event: string, data: any) {
        console.log(event, data);
        this.socket.emit(event, data);
    }

    getMessage(event: string) {
        return this.socket.fromEvent(event).map(
            (msg: string) => {
                try {
                    return JSON.parse(msg);
                } catch (e) {
                    return msg;
                }
            }
        );
    }

    removeAllListeners(event: string) {
        this.socket.removeAllListeners(event);
    }
}
