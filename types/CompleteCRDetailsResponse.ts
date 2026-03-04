import {
    AmendHistory,
    AuthorizedSignatory,
    Branch,
    BusinessActivity,
    CRSocialURL,
    CommercialAddress,
    CompanyCapitalDetails,
    CompanySummary,
    Director,
    ShareholderOrPartner,
} from "./SijilatCompanies";

export interface CompleteCRDetailsResponse {
    Status_Code: string;
    Status_Message: string;
    jsonData: {
        company_summary: CompanySummary;
        commercialAddress: CommercialAddress;
        crSocialURL: CRSocialURL;
        businessActivities: BusinessActivity[];
        companyCapitalDetails: CompanyCapitalDetails;
        shareholdersAndPartners: ShareholderOrPartner[];
        authorizedSignatories: AuthorizedSignatory[];
        boardofDirectors: Director[];
        company_Partners: any;
        ownerInformation: any;
        representatives: any;
        amendhistory: AmendHistory[];
        complianceOfficer: any;
        otherbranchlist: Branch[];
        Show_Buttons: string;
    };
    Code: string | null;
    Message: string | null;
}
