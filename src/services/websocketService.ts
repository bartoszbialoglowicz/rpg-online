import { AppSettings } from "../utils/settings";
import { WebSocketMessage } from "../utils/types";

const WEBSOCKET_URL = `ws://${AppSettings.SERVER_IP}/ws/combat/`;


class WebSocketService {
    private socket: WebSocket | null = null;
    private messageCallbacks: ((message: WebSocketMessage) => void)[] = [];

    connect = () => {
        this.socket = new WebSocket(WEBSOCKET_URL);
        this.socket.onopen = () => {
            console.log('Websocket connected');
        }
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.messageCallbacks.forEach((callback) => callback(data));
        };
        this.socket.onerror = (error) => {
            console.log("Websocket error: ", error);
        }
        this.socket.onclose = () => {
            console.log("Websocket disconnected");
        }
    };

    isConnected = () => {
        return this.socket?.OPEN;
    }

    sendMessage = (message: WebSocketMessage) => {
        if (this.socket) {
            this.socket.send(JSON.stringify(message));
        }
    }

    addMessageListener = (callback: (message: WebSocketMessage) => void) => {
        this.messageCallbacks.push(callback);
    };

    removeMessageListener = (callback: (message: WebSocketMessage) => void) => {
        this.messageCallbacks = this.messageCallbacks.filter(
            (cb) => cb !== callback
        );
    }

    disconnect = () => {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default new WebSocketService;