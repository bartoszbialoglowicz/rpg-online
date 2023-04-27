import { AppSettings } from "../utils/settings";
import { HttpMethod, responseObject } from "../utils/types";

export const useHttp = <objType>(path: string, method: HttpMethod, body?: object, token?: string) => {
    const sendRequest = async () => {
        const response = await fetch(`http://${AppSettings.SERVER_IP}/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Token ${token}` : ''
            },
            body: body ? JSON.stringify(body) : null
        });
        const data: objType = await response.json();
        const code = response.status;
        const responseData: responseObject<objType> = {
            data: data,
            code: code
        }
        return responseData;
    }
    return sendRequest;
};