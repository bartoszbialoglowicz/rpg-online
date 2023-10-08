import { AppSettings } from "../utils/settings";
import { HttpMethod, responseObject } from "../utils/types";

export const useHttp = <objType>(path: string, method: HttpMethod, body?: object, token?: string) => {
    const sendRequest = async <obj2Type>(path_2?: string, method_2?: HttpMethod, body_2?: object) => {
        const url = path_2 ? path_2 : path;
        const response = await fetch(`http://${AppSettings.SERVER_IP}/${url}`, {
            method: method_2 ? method_2 : method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Token ${token}` : ''
            },
            body: body_2 ? JSON.stringify(body_2) : body ? JSON.stringify(body) : null,
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