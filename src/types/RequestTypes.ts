export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

export type feedbackResult = 'success' | 'error';

export type responseObject<objType> = {
    code: number,
    data: objType
}