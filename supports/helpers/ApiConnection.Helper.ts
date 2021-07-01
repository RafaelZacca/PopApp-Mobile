import { ApiMethodsEnum } from '../enums/ApiMethods.Enum';
import * as SecureStore from 'expo-secure-store';

export function apiGet<T>(url: string, abortSignal: AbortSignal, queryString?: string, showDefaultMsg?: boolean): Promise<T> {
    return processRequest(url, ApiMethodsEnum.Get, abortSignal, null, queryString, showDefaultMsg);
}

export function apiPost<T>(url: string, request: T | any, abortSignal: AbortSignal, showDefaultMsg?: boolean): Promise<T> {
    return processRequest(url, ApiMethodsEnum.Post, abortSignal, JSON.stringify(request), null, showDefaultMsg);
}

export function apiPut<T>(url: string, id: number, request: T, abortSignal: AbortSignal, showDefaultMsg?: boolean): Promise<T> {
    return processRequest(url + '/' + id, ApiMethodsEnum.Put, abortSignal, JSON.stringify(request), null, showDefaultMsg);
}

export function apiDelete<bool>(url: string, id: number, abortSignal: AbortSignal, showDefaultMsg: boolean = null): Promise<bool> {
    return processRequest(url + '/' + id, ApiMethodsEnum.Delete, abortSignal, null, null, showDefaultMsg);
}

async function processRequest(url: string, method: ApiMethodsEnum, abortSignal: AbortSignal, jsonRequest?: string, queryString?: string, showDefaultMsg?: boolean) {
    const baseUrl = 'https://popappapi.conveyor.cloud';

    const token = await SecureStore.getItemAsync('token');
    let requestHeaders: HeadersInit;

    if (token) {
        requestHeaders = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    else {
        requestHeaders = {
            'Content-Type': 'application/json'
        }
    }

    //Filling request options
    const requestOptions = {
        signal: abortSignal,
        method: method,
        headers: requestHeaders,
    } as RequestInit;
    if (method === ApiMethodsEnum.Post || method === ApiMethodsEnum.Put) {
        requestOptions.body = jsonRequest;
    }

    let requestUrl = queryString ? baseUrl + url + '?' + queryString : baseUrl + url

    return fetch(requestUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw response;
            }

            return response.json().catch(() => null);
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
            let errorCloned = error.clone();
            if (showDefaultMsg == null || showDefaultMsg == true) {
                if (error && error.bodyUsed !== null && !error.bodyUsed) {
                    processWarning(error);
                }
                else {
                    processServerCommunicationError(error);
                }
            }
            throw errorCloned;
        });
}

function processServerCommunicationError(err: any, message: string = "Server communication failed") {
    console.log("❌ " + message);
}

function processWarning(err: any, message: string = "Warning") {
    err.json().then(serverMessage => {
        let warningMessage: string = JSON.parse(serverMessage) ? JSON.parse(serverMessage) : message;
        console.log("⚠️ " + warningMessage);
    }).catch(() => processServerCommunicationError(err));
}
