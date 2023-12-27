type metadata = {
    httpStatusCode: number,
    requestId: string,
    extendedRequestId: string,
    attempts: number,
    totalRetryDelay: number
}
interface response {
    success: boolean,
    code: number,
    message: string,
}
export interface responseUploadImage extends response {
    data: {
        metadata: metadata,
        Key: string
    }
}
export interface responseGetImage extends response {
    data: {
        url: string
    }
}
