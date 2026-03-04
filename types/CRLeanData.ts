export interface CRLeanData {
    offset: number;
    candidates: LeanCandidateCompany[];
}

export interface MinimalCompanyData {
    domain: CompanyDomain;
    email: Emailable[];
    notes?: string;
}
export interface LeanCandidateCompany extends MinimalCompanyData {
    cr: string;
    name: string;
    alias?: string;
    name_ar?: string;
    status: LeanCompanyStatus;
    logs?: Log[];
    website?: Notable[];
}

export enum CompanyDomain {
    ecommerce = "ecommerce",
    fintech = "fintech",
    fnb = "fnb", // food and bevarages
    swh = "swh", // software house
    edtech = "edtech",
    entertainment = "entertainment",
    outsourcing = "outsourcing",
    telecom = "telecom",
    marketing = "marketing",
    other = "other",
    unset = "unset",
}

interface Notable {
    value?: string;
    notes?: string;
}

export interface Emailable extends Notable {
    name?: string;
}

export enum LeanCompanyStatus {
    initiated = "initiated",
    applied = "applied",
    in_progress = "in_progress",
    rejected = "rejected",
    offer = "offer",
}

interface Log {
    timestamp: string;
    update: string;
}
