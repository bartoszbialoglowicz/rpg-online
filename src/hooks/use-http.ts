import { useEffect, useState } from "react";
import { AppSettings } from "../utils/settings";
import { HttpMethod } from "../utils/types";

export const useHttp = (path: string, method: HttpMethod, body?: object) => {
    const sendRequest = async () => {
        const response = await fetch(`http://${AppSettings.SERVER_IP}/${path}`, {
            method: method,
            body: body ? JSON.stringify(body) : null
        });
        const data = await response.json();
        console.log(data);
    }
    return sendRequest;
};