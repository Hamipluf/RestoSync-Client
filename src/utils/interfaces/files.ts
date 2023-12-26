type metadata = {
    httpStatusCode: number,
    requestId: string,
    extendedRequestId: string,
    attempts: number,
    totalRetryDelay: number
}
export interface dataUploadImage {
    image: File
}
export interface responseUploadImage {
    success: boolean,
    code: number,
    message: string,
    data: {
        metadata: metadata,
        Key: string
    }
}
