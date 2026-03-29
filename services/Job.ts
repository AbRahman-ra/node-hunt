import { PATHS } from "../config/const";
import { getLeanDataFile } from "../config/data";
import { randomInt } from "../helper/Math";
import {
    CompanyDomain,
    LeanCandidateCompany,
    LeanCompanyStatus,
} from "../types/CRLeanData";
import { EmailTemplateParams } from "../types/EmailTemplateParams";
import { body, send } from "./Mailer";

export const applyBatch = async (n: number = 50) => {
    // load data
    const data = await getLeanDataFile();
    let start = data.offset;
    let end = Math.min(start + n, data.candidates.length);

    // loop over companies
    for (let i = start; i < end; i++) {
        const c = data.candidates[i];
        await apply(c);
        console.log(
            `Finished ${i} / ${end} companies. Current offset: ${++data.offset}`,
        );
        await Bun.write(PATHS.DATA.LEAN_DATA, JSON.stringify(data, null, 4));
    }
};

export const apply = async (
    company: LeanCandidateCompany,
    checkStatus: boolean = true,
) => {
    if (
        (checkStatus && company.status !== LeanCompanyStatus.initiated) ||
        company.domain === CompanyDomain.unset
    ) {
        console.log(
            `Company ${company.name} with CR: ${company.cr} has status of ${company.status} and domain ${company.domain}, thus, it's uneligible for applying and it will be skipped...`,
        );
        return;
    }
    let param: EmailTemplateParams = {
        company: { name: company.name },
        domain: company.domain,
    };

    // loop over emails
    let i = 1;
    for (let e of company.email) {
        param.recipient = { name: e.name ?? "Hiring Manager" };
        let html = await body(param);

        let dto = {
            body: html,
            to: `${e.value}`, // PRODUCTION
            // to: `${process.env.MAIL_DEV_TEST_ADDRESS}`, // DEVELOPMENT
            subject: `Software Development Roles at ${company.name}`,
            attachments: [{ path: PATHS.ASSETS.RESUME }],
        };

        // send email
        try {
            let info = await send(dto);

            let update = `INFO: Email Sent to ${e.value}, Message ID: ${info.messageId}`;
            let timestamp = new Date().toString();

            if (company.logs) company.logs.push({ timestamp, update });
            else company.logs = [{ timestamp, update }];

            let delay = randomInt(45, 120);
            console.log(
                `sent ${i} / ${company.email.length} emails, sleeping ${delay} seconds...`,
            );
            i++;
            await Bun.sleep(delay * 1000);
        } catch (error) {
            let update = `ERROR: ❌ Failed to send email ${error}`;
            let timestamp = new Date().toString();

            console.error(update);

            if (company.logs) company.logs.push({ timestamp, update });
            else company.logs = [{ timestamp, update }];
        }
    }

    // mark company as applied
    company.status = LeanCompanyStatus.applied;
    let timestamp = new Date().toString();
    let update = `Emails Sent for Company: ${company.name}`;

    if (company.logs) company.logs.push({ timestamp, update });
    else company.logs = [{ timestamp, update }];
};
