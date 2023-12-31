export class User {
    id: number;
    username: string;
    password: string;
    phone: string;
    email: string;
    firstname: string;
    lastname: string;
    type: string;
    agencyName: string;
    address: string;
    uniqueNumber: string;
    description: string;
    profilePicture: string;
    valid: boolean;
    requests: Array<string>;
    invalid: Array<string>;
    workers: Array<number>;
    vacancyRequests: Array<any>;
    openVacancies: number;
    comments: Array<any>
}