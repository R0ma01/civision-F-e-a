export interface FormData {
    [key: string]: any;
}

export interface ResponseData {
    message?: string;
    error?: string;
    token?: string;
    adminToken?: string;
    admin?: boolean;
    tutorials?: boolean[];
}

export interface SetStatusFunction {
    (status: { success?: string; error?: string }): void;
}
