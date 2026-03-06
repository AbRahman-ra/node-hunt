import { PATHS } from "../config/const";
import { getAiModeEmailResponses, getLeanDataFile } from "../config/data";
import {
    Emailable,
    LeanCandidateCompany,
    MinimalCompanyData,
} from "../types/CRLeanData";

export const leanMap = async (cb: (c: LeanCandidateCompany) => void) => {
    const data = await getLeanDataFile();
    for (let c of data.candidates) {
        cb(c);
    }
    await Bun.write(PATHS.DATA.LEAN_DATA, JSON.stringify(data, null, 4));
};

export const aiEmailResponsesMap = async (
    cb: (c: MinimalCompanyData) => void,
) => {
    const data = await getAiModeEmailResponses();
    for (let c of data) {
        cb(c);
    }
    await Bun.write(
        PATHS.DATA.AI_MODE_EMAIL_RESPONSES,
        JSON.stringify(data, null, 4),
    );
};

export const mergeEmailValues = async (
    start: number = 0,
    count: number = 1,
) => {
    let companies = await getLeanDataFile();
    let responses = await getAiModeEmailResponses();

    const end = start + count;
    for (let i = start; i < end && i < responses.length; i++) {
        companies.candidates[i] = mergeEmailValuesForCompany(
            companies.candidates[i],
            responses[i],
        );
    }

    await Bun.write(PATHS.DATA.LEAN_DATA, JSON.stringify(companies, null, 4));
};

export const mergeEmailValuesForCompany = (
    c1: LeanCandidateCompany,
    c2: MinimalCompanyData,
) => {
    let map = new Map<string, Emailable>();

    const process = ({ value, notes, name }: Emailable) => {
        let result: Emailable;
        if (!value) throw new Error(`Email for company is ${value}`);
        if (map.has(value)) {
            const existing = map.get(value);
            const combined = [existing?.notes, notes]
                .filter(Boolean)
                .join(", ");
            result = { value };
            if (combined.length) result["notes"] = combined;
        } else {
            result = { value, notes };
        }

        if (name) result["name"] = name;

        map.set(value, result);
    };

    c1.email.forEach(process);
    c2.email.forEach(process);

    if (!c1.notes) c1.notes = c2.notes;
    c1.domain = c2.domain;

    c1.email = Array.from(map.values());
    return c1;
};

export const companyAt = async (i: number) =>
    (await getLeanDataFile()).candidates[i] ?? undefined;
