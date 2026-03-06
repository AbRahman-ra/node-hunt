import {
    CompanyDomain,
    LeanCandidateCompany,
    LeanCompanyStatus,
} from "../types/CRLeanData";
import { CompleteCRDetailsResponse } from "../types/CompleteCRDetailsResponse";
import { CRData, SijilatCompany } from "../types/SijilatCompanies";

export const toCRData = (data: CompleteCRDetailsResponse): CRData => {
    let json = data.jsonData;
    let result: CRData = {
        company_summary: json.company_summary,
        commercial_address: json.commercialAddress,
        cr_social_url: json.crSocialURL,
        business_activities: json.businessActivities,
        company_capital_details: json.companyCapitalDetails,
        shareholders_and_partners: json.shareholdersAndPartners,
        authorized_signatories: json.authorizedSignatories,
        board_of_directors: json.boardofDirectors,
        company_partners: json.company_Partners,
        owner_information: json.ownerInformation,
        representatives: json.representatives,
        amend_history: json.amendhistory,
        compliance_officer: json.complianceOfficer,
        other_branch_list: json.otherbranchlist,
        show_buttons: json.Show_Buttons,
    };

    return result;
};

export const toLeanCompany = (c: SijilatCompany): LeanCandidateCompany => {
    let obtainedFromCommercialAddress =
        "OBTAINED FROM SIJILAT `CR_DATA?.commercial_address.";
    let emailSource = "CR_EMAIL`";
    let urlSource = "CR_URL`";
    let estoreSource = "ESTORE_URL`";
    let leanData: LeanCandidateCompany = {
        cr: `${c.CR_NO}-${c.BRANCH_NO}`,
        domain: CompanyDomain.unset,
        status: LeanCompanyStatus.initiated,
        name: c.CR_LNM,
        name_ar: c.CR_ANM,
        email: [
            {
                value: c.CR_DATA?.commercial_address.CR_EMAIL,
                notes: obtainedFromCommercialAddress + emailSource,
            },
        ],
        logs: [],
        website: [
            {
                value: c.CR_DATA?.commercial_address.CR_URL,
                notes: obtainedFromCommercialAddress + urlSource,
            },
        ],
    };

    if (c.CR_DATA?.commercial_address.ESTORE_URL?.length) {
        leanData.website?.push({
            value: c.CR_DATA?.commercial_address.ESTORE_URL,
            notes: obtainedFromCommercialAddress + estoreSource,
        });
    }
    return leanData;
};
