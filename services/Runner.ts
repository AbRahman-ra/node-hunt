import { newAccessToken } from "../services/SijilatAuth";
import { toCRData } from "../mapper/CompleteCRDetailsMapper";
import { getCRDetails, searchCR } from "../services/SijilatApi";
import { CompleteCRDetailsRequest } from "../types/CompleteCRDetailsRequest";
import { PATHS } from "../config/const";
import {
    getLeanDataContactExplanatoryPrompts,
    getLeanDataFile,
    getRawDataFile,
} from "../config/data";
import { CRLeanData } from "../types/CRLeanData";
import * as mapper from "./../mapper/CompleteCRDetailsMapper";
import { SijilatCompany } from "../types/SijilatCompanies";

export const getAndAppendData = async () => {
    // get data
    let companies = await getRawDataFile();

    // get access token
    let accessToken = await newAccessToken();

    // foreach company:
    for (let c of companies) {
        // get company details
        const request: CompleteCRDetailsRequest = {
            branch_no: +c.BRANCH_NO,
            cr_no: +c.CR_NO,
            CULT_LANG: "EN",
        } as const;

        let response = await getCRDetails(request, accessToken.access_token);
        if (response) c.CR_DATA = toCRData(response);
        else {
            console.warn(
                `Company with CR-Branch ${c.CR_NO}-${c.BRANCH_NO} has no response, skipping...`,
            );
        }
    }

    await Bun.write(
        PATHS.DATA.RAW_API_RESPONSE,
        JSON.stringify(companies, null, 4),
    );
};

export const newCompany = async (cr: number, branch: number) => {
    // get data
    let rawCompanies = await getRawDataFile();
    let leanCompanies = await getLeanDataFile();

    // if company exist, exit
    let i = rawCompanies.findIndex(
        (c) => c.CR_NO === `${cr}` && c.BRANCH_NO === `${branch}`,
    );
    let j = leanCompanies.candidates.findIndex(
        (c) => c.cr === `${cr}-${branch}`,
    );

    if (i !== -1) {
        console.log(
            `Company With CR: ${cr}-${branch} is already stored at index ${i} in the raw data file`,
        );
        j === -1
            ? leanCompanies.candidates.push(
                  mapper.toLeanCompany(rawCompanies[i]),
              )
            : console.log(
                  `Company With CR: ${cr}-${branch} is already stored at index ${j} in the lean data file`,
              );
        return;
    }

    let accessToken = (await newAccessToken()).access_token;
    let companyRawData = (await searchCR(cr, branch))?.jsonData.CR_list[0];

    if (!companyRawData) {
        console.error("Couldn't get general company response");
        return;
    }

    let companyRawCRResponse = await getCRDetails(
        { branch_no: branch, cr_no: cr, CULT_LANG: "EN" },
        accessToken,
    );

    if (!companyRawCRResponse) {
        console.error("Couldn't get specific company response");
        return;
    }

    companyRawData.CR_DATA = mapper.toCRData(companyRawCRResponse);
    rawCompanies.push(companyRawData);
    leanCompanies.candidates.push(mapper.toLeanCompany(companyRawData));

    await Bun.write(
        PATHS.DATA.RAW_API_RESPONSE,
        JSON.stringify(rawCompanies, null, 4),
    );
    await Bun.write(
        PATHS.DATA.LEAN_DATA,
        JSON.stringify(leanCompanies, null, 4),
    );
};

export const createLeanData = async () => {
    let data: CRLeanData = { offset: 0, candidates: [] };
    let companies = await getRawDataFile();
    let i = 1,
        len = companies.length;

    for (let c of companies) {
        let leanData = mapper.toLeanCompany(c);
        data.candidates.push(leanData);
        console.log(`finished ${i} / ${len}`);
        i++;
    }
    await Bun.write(PATHS.DATA.LEAN_DATA, JSON.stringify(data, null, 4));
};

export const personalizedPrompts = async (index: number) => {
    const data = (await getLeanDataFile()).candidates[index];
    let prompts = await getLeanDataContactExplanatoryPrompts();
    prompts = prompts.replaceAll("{{COMPANY}}", data.name);
    prompts = prompts.replaceAll(
        "{{EMAIL}}",
        data.email.map((e) => e.value).join(", "),
    );

    console.log(prompts);
    return prompts;
};

export const allPersonalizedPrompts = async () => {
    const data = (await getLeanDataFile()).candidates;
    let prompts = await getLeanDataContactExplanatoryPrompts();

    let result = "";
    for (let c of data) {
        let p = prompts.replaceAll("{{COMPANY}}", c.name);
        p = p.replaceAll("{{EMAIL}}", c.email.map((e) => e.value).join(", "));
        result += p;
        result += "\n";
    }

    await Bun.write(PATHS.DATA.COMPANY_INFO_PROMPTS, result);
    return prompts;
};
