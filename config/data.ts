import { CRLeanData, MinimalCompanyData } from "../types/CRLeanData";
import { SijilatCompanies } from "../types/SijilatCompanies";
import { PATHS } from "./const";

export const FILES = {
    RAW_DATA: Bun.file(PATHS.DATA.RAW_API_RESPONSE),
    LEAN_DATA: Bun.file(PATHS.DATA.LEAN_DATA),
    COMPANY_INFO_PROMPTS_TEMPLATE: Bun.file(
        PATHS.DATA.COMPANY_INFO_PROMPT_TEMPLATE,
    ),
    AI_MODE_EMAIL_RESPONSES: Bun.file(PATHS.DATA.AI_MODE_EMAIL_RESPONSES),
};

export const getRawDataFile = async (): Promise<SijilatCompanies> =>
    (await FILES.RAW_DATA.json()) as SijilatCompanies;

export const getLeanDataFile = async (): Promise<CRLeanData> =>
    (await FILES.LEAN_DATA.json()) as CRLeanData;

export const getLeanDataContactExplanatoryPrompts = async (): Promise<string> =>
    await FILES.COMPANY_INFO_PROMPTS_TEMPLATE.text();

export const getAiModeEmailResponses = async (): Promise<
    MinimalCompanyData[]
> => (await FILES.AI_MODE_EMAIL_RESPONSES.json()) as MinimalCompanyData[];
