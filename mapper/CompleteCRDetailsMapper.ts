import { CompleteCRDetailsResponse } from "../types/CompleteCRDetailsResponse";
import { CRData } from "../types/SijilatCompanies";

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
