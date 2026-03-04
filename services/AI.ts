// import { GoogleGenAI } from "@google/genai";
import {
    getLeanDataContactExplanatoryPrompts,
    getLeanDataFile,
} from "../config/data";
import { LeanCandidateCompany } from "../types/CRLeanData";
import { AI_MODELS, PATHS } from "../config/const";

export const generateAllPrompts = async () => {
    const data = (await getLeanDataFile()).candidates;
    let template = (await getLeanDataContactExplanatoryPrompts()).split("\n");

    let result = "";
    for (let c of data) {
        result += generatePrompt(template, c);
        result += "\n";
    }

    await Bun.write(PATHS.DATA.COMPANY_INFO_PROMPTS, result);
    return result;
};

export const generatePrompt = (
    template: string[],
    company: LeanCandidateCompany,
) => {
    let result = JSON.parse(JSON.stringify(template));

    for (let i in result) {
        result[i] = result[i].replaceAll("{{COMPANY}}", company.name);
        result[i] = result[i].replaceAll(
            "{{EMAIL}}",
            company.email.map((e) => e.value).join(", "),
        );
    }

    return result.join("\n");
};

// export const inquireCompanies = async (
//     start: number = 0,
//     count: number = 1,
// ) => {
//     const end = start + count;
//     let promptTemplate = await getLeanDataContactExplanatoryPrompts();
//     let data = (await getLeanDataFile()).candidates;
//     let batches: { prompt: string; response: string }[] = [];
//     for (let i = start; i < end; i++) {
//         // get company at
//         let company = data[i];

//         // get prompt
//         let prompt = generatePrompt(promptTemplate, company);
//         let response: string | undefined;

//         try {
//             // get response
//             response = (
//                 await ai.models.generateContent({
//                     model: AI_MODELS.GEMINI_3_FLASH,
//                     contents: prompt,
//                 })
//             ).text;

//             console.log("response recieved");
//             console.log(response);
//         } catch (err) {
//             console.error(`cannot execute prompt, error: ${err}`);
//             throw err;
//         }

//         // store append
//         if (!response) throw new Error("No response");

//         batches.push({ prompt, response });
//     }

//     await Bun.write(
//         PATHS.PROMPTS_DIR + `/data_prompts_${start}_${end}.json`,
//         JSON.stringify(batches, null, 4),
//     );
// };
