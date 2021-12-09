

export function encodeBase64(data: string): string {
    return Buffer.from(data).toString('base64');
}

export function decodeBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString();
}