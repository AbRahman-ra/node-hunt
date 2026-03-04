export interface SijilatCompany {
    CR_NO: string;
    BRANCH_NO: string;
    CR_LNM: string;
    CR_ANM: string;
    CM_TYP_DESC: string;
    REG_DATE: string;
    EXPIRE_DATE: string;
    STATUS: string;
    STATUS_COLOR: string;
    ACTIVITIES: string;
    SECTOR: string | null;
    CD_NM: string;
    CR_DATA?: CRData;
}

export interface CRData {
    company_summary: CompanySummary;
    commercial_address: CommercialAddress;
    cr_social_url: CRSocialURL;
    business_activities: BusinessActivity[];
    company_capital_details: CompanyCapitalDetails;
    shareholders_and_partners: ShareholderOrPartner[];
    authorized_signatories: AuthorizedSignatory[];
    board_of_directors: Director[];
    company_partners: any;
    owner_information: any;
    representatives: any;
    amend_history: AmendHistory[];
    compliance_officer: any;
    other_branch_list: Branch[];
    show_buttons: string;
}

export interface CompanySummary {
    CR_NO: string;
    BRANCH_NO: string;
    CR_LNM: string;
    CR_ANM: string;
    REG_DATE: string;
    EXPIRE_DATE: string;
    CR_GRP_LNM: string;
    CR_GRP_ANM: string;
    CM_TYP_DESC: string;
    CM_TYP_CD: string;
    CM_TYP: string;
    STATUS: string;
    STATUS_COLOR: string;
    FN_YEAR_END: string;
    BCCI_EXPIRE_DATE: string;
    BCCI_ISU_DATE: string;
    CR_NAT: string;
    PRD: string;
    BANK_NAME: string | null;
    IBAN_NO: string | null;
}

export interface CommercialAddress {
    CR_FLAT: string | undefined;
    CR_BULD: string | undefined;
    CR_ROAD: string | undefined;
    CR_ROAD_NM: string | undefined;
    CR_BLOCK: string | undefined;
    CR_TOWN_NM: string | undefined;
    CR_PBOX: string | undefined;
    CR_EMAIL: string | undefined;
    CR_NAT_MOBILE: string | undefined;
    CR_NAT_PHONE_BIS: string | undefined;
    CR_NAT_FAX: string | undefined;
    CR_URL: string | undefined;
    ESTORE_URL: string | undefined;
    SMA: string | undefined;
    CR_PARCEL_NO: string | undefined;
}

export interface CRSocialURL {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}

export interface BusinessActivity {
    ACT_CD: string;
    ISIC4_CD: string;
    ISIC4_ORI_CD: string;
    ISIC4_NM: string;
    ISIC4_DETL: string;
    AMT: any;
}

export interface CompanyCapitalDetails {
    AUTH_CAPTL: string;
    ISU_CAPTL: string;
    TOT_SHARE: string;
    NOM_VAL: string;
    LOCAL_INVEST_SUM: string;
    GCC_INVEST_SUM: string;
    FOR_INVEST_SUM: string;
    CURR_CD: string;
    PAID_CASH: string;
    PAID_INKIND: any;
    PAID_INKIND_DESC: any;
    ACTUL_PAID_CAPTL: string;
}

export interface ShareholderOrPartner {
    NAME: string;
    NAT_NAME: string;
    NUM_SHARE: string;
    RATIO_ONER: string;
    MORTGAGE: any;
    SEQUESTER: any;
    NAT_LNM: string;
    NAT_ANM: string;
    LNM: string;
    ANM: string;
}

export interface AuthorizedSignatory {
    CPR_NO: string;
    NAME: string;
    CTRY_DESC: string;
    SIG_LEV: string;
    LNM: string;
    ANM: string;
    CTRY_LDESC: string;
    CTRY_ADESC: string;
    NAT_NM: string;
}

export interface Director {
    LNM: string;
    ANM: string;
    NAT_NM: string;
    NAT_LNM: string;
    NAT_ANM: string;
    POSITION_NM: string;
}

export interface AmendHistory {
    CRT_DATE: string;
    AMEND_NAME: any;
    AMEND_LNM: string;
    AMEND_NM: string;
    CR_NO: string;
    BRANCH_NO: string;
    APP_NO: string;
    ACTION_CD: string;
    ACTION_LDESC: string;
    REF_YN: string;
    AMEND_CD: string;
    CRT_DATE_IF: string;
    SHOW_YN: string;
    URL: string;
}

export interface Branch {
    CR_NO: string;
    BRANCH_NO: string;
    CR_NAME: string;
    STATUS: string;
    STATUS_CODE: string;
    REG_DATE: string;
    EXPIRE_DATE: string;
}

export type SijilatCompanies = SijilatCompany[];
