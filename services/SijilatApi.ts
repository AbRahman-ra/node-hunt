import { ENDPOINTS } from "../config/const";
import { CompleteCRDetailsRequest } from "../types/CompleteCRDetailsRequest";
import { CompleteCRDetailsResponse } from "../types/CompleteCRDetailsResponse";
import CryptoJS from "crypto-js";

export const getCRDetails = async (
    request: CompleteCRDetailsRequest,
    token: string,
): Promise<CompleteCRDetailsResponse | void> => {
    const url = `${Bun.env.SIJILAT_API_ENDPOINT}/${ENDPOINTS.API}/${ENDPOINTS.COMPLETE_CR_DETAILS}`;
    const key = Bun.env.SIJILAT_ENCYPTION_KEY;

    if (
        Bun.env.SIJILAT_API_ENDPOINT === undefined ||
        !Bun.env.SIJILAT_API_ENDPOINT.length ||
        key === undefined ||
        !key.length
    ) {
        throw new Error(`Misconfigured Environment, 
            Base URL: "${Bun.env.SIJILAT_API_ENDPOINT}",
            key: "${key}",
            make sure both has non-null values and try again`);
    }

    let headers = {
        "Content-Type": "application/encrypted+json",
        Authorization: `Bearer ${token}`,
    };
    let body = CryptoJS.AES.encrypt(JSON.stringify(request), key).toString();

    let response = await fetch(url, {
        method: "POST",
        headers,
        body,
    });

    if (!response.ok) {
        console.error("Unsuccessful Response");
        let data = await response.text();
        console.error(data);
        return;
    }
    let result = (await response.json()) as CompleteCRDetailsResponse;
    return result;
};
