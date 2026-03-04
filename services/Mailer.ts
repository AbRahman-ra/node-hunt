import { PATHS } from "../config/const";
import { transporter } from "../config/mail";
import {
    CompanyDomain,
    LeanCandidateCompany,
    LeanCompanyStatus,
} from "../types/CRLeanData";
import { EmailDto, EmailTemplateParams } from "../types/EmailTemplateParams";
import ejs from "ejs";

export const dummy = async () => {
    // test company
    const company: LeanCandidateCompany = {
        cr: "11111-1",
        name: "RainCode",
        domain: CompanyDomain.fnb,
        logs: [],
        email: [
            { name: "Bebas John", value: process.env.MAIL_DEV_TEST_ADDRESS },
            { value: process.env.MAIL_DEV_TEST_ADDRESS },
        ],
        status: LeanCompanyStatus.initiated,
    };

    for (let e of company.email) {
        const html = await body({
            company: { name: company.name },
            domain: company.domain,
            recipient: { name: e.name ?? "Hiring Manager" },
        });

        try {
            await send({
                body: html,
                to: `${e.value}`,
                subject: `Software Development Roles at ${company.name}`,
                attachments: [
                    {
                        path: PATHS.ASSETS.RESUME,
                    },
                ],
            });
        } catch (error) {
            console.error("❌ Failed to send email:", error);
        }
    }
};

export const send = async (dto: EmailDto) => {
    try {
        let options: Record<string, any> = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: dto.to,
            subject: dto.subject,
            html: dto.body,
            attachments: dto.attachments,
        };

        if (dto.bcc) options.bcc = dto.bcc;
        if (dto.cc) options.cc = dto.cc;
        if (dto.replyTo) options.replyTo = dto.replyTo;

        let info = await transporter.sendMail(options);
        console.log(`✅ Success! Email sent to ${dto.to}`);
        console.log(`🔗 Message ID: ${info.messageId}`);
        return info;
    } catch (error) {
        throw error;
    }
};

export const body = async (params: EmailTemplateParams): Promise<string> =>
    await ejs.renderFile(PATHS.TEMPLATES.JOB_INQUIRY, params);
