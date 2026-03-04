import { ENDPOINTS } from "../config/const";
import { AccessTokenApiResponse } from "../types/AccessTokenApiResponse";

export const newAccessToken = async (): Promise<AccessTokenApiResponse> => {
    const url = `${Bun.env.SIJILAT_API_ENDPOINT}/${ENDPOINTS.TOKEN}`;
    const username = Bun.env.SIJILAT_TOKEN_USERNAME;
    const password = Bun.env.SIJILAT_TOKEN_PASSWORD;
    const grantType = Bun.env.SIJILAT_TOKEN_GRANTTYPE;

    if (
        Bun.env.SIJILAT_API_ENDPOINT === undefined ||
        !Bun.env.SIJILAT_API_ENDPOINT.length ||
        username === undefined ||
        !username.length ||
        password === undefined ||
        !password.length ||
        grantType === undefined ||
        !grantType.length
    ) {
        throw new Error(`Misconfigured Environment, 
            Base URL: "${Bun.env.SIJILAT_API_ENDPOINT}",
            username: "${username}",
            password: "${password}",
            granttype: "${grantType}",
            make sure the 4 has non-null values and try again
            `);
    }
    const form = { username, password, grant_type: grantType };
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const body = new URLSearchParams(form);
    let data = await fetch(url, {
        method: "POST",
        headers,
        body,
    });

    if (!data.ok) {
        console.error("Unsuccessful Response");
        let response = await data.text();
        console.error(response);
    }

    let result = await data.json();
    let expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + result["expires_in"]);
    result["expires_in"] = expiry;
    result = result as AccessTokenApiResponse;
    return result;
};
