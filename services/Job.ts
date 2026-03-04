import { PATHS } from "../config/const";
import { getLeanDataFile } from "../config/data";
import { CompanyDomain, LeanCompanyStatus } from "../types/CRLeanData";
import { EmailTemplateParams } from "../types/EmailTemplateParams";
import { body, send } from "./Mailer";

export const apply = async (n: number = 50) => {
    // load data
    const data = await getLeanDataFile();
    let start = data.offset;
    let end = Math.min(start + n, data.candidates.length);

    // loop over companies
    for (let i = start; i < end; i++, data.offset++) {
        const c = data.candidates[i];
        if (
            c.status !== LeanCompanyStatus.initiated ||
            c.domain === CompanyDomain.unset
        ) {
            console.log(
                `Company ${c.name} with CR: ${c.cr} has status of ${c.status} and domain ${c.domain}, thus, it's uneligible for applying and it will be skipped...`,
            );
            continue;
        }
        let param: EmailTemplateParams = {
            company: { name: c.name },
            domain: c.domain,
        };

        // loop over emails
        for (let e of c.email) {
            param.recipient = { name: e.name ?? "Hiring Manager" };
            let html = await body(param);

            let dto = {
                body: html,
                to: `${e.value}`, // PRODUCTION
                // to: `${process.env.MAIL_DEV_TEST_ADDRESS}`, // DEVELOPMENT
                subject: `Software Development Roles at ${c.name}`,
                attachments: [{ path: PATHS.ASSETS.RESUME }],
            };

            // send email
            try {
                console.log(`sending email to: ${e.value}`);
                let info = await send(dto);

                let update = `INFO: Email Sent to ${e.value}, Message ID: ${info.messageId}`;
                let timestamp = new Date().toString();

                if (c.logs) c.logs.push({ timestamp, update });
                else c.logs = [{ timestamp, update }];

                Bun.sleepSync(60_000); // delay between email sends to prevent being spam
            } catch (error) {
                let update = `ERROR: ❌ Failed to send email ${error}`;
                let timestamp = new Date().toString();

                console.error(update);

                if (c.logs) c.logs.push({ timestamp, update });
                else c.logs = [{ timestamp, update }];
            }
        }

        // mark company as applied
        c.status = LeanCompanyStatus.applied;
        let timestamp = new Date().toString();
        let update = `Emails Sent for Company: ${c.name}`;

        if (c.logs) c.logs.push({ timestamp, update });
        else c.logs = [{ timestamp, update }];
    }

    console.log(
        `Changes completed, persisting file with new offset ${data.offset}...`,
    );
    await Bun.write(PATHS.DATA.LEAN_DATA, JSON.stringify(data, null, 4));
};
