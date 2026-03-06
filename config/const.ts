export const ENDPOINTS = {
    TOKEN: "token",
    API: "api",
    COMPLETE_CR_DETAILS: "CRdetails/CompleteCRDetails",
    SEARCH_CR: "CRdetails/AdvanceSearchCR_Paging",
};

export const PATHS = {
    DATA: {
        RAW_API_RESPONSE: "data/data_bh.json",
        LEAN_DATA: `data/data_lean_bh.json`,
        COMPANY_INFO_PROMPT_TEMPLATE:
            "data/prompts/company_info_prompt_template.txt",
        COMPANY_INFO_PROMPTS: "data/prompts/company_info_prompts.txt",
        AI_MODE_EMAIL_RESPONSES:
            "data/prompts/data_ai_mode_email_responses.json",
    },
    ASSETS: {
        RESUME: "assets/Abdurrahman_Tantawi_Software_Developer.pdf",
    },
    TEMPLATES: {
        JOB_INQUIRY: "templates/job-inquiry.ejs",
    },
};

export const AI_MODELS = {
    GEMINI_2_5_FLASH: "gemini-2.5-flash",
    GEMINI_3_FLASH: "gemini-3.0-flash",
};
