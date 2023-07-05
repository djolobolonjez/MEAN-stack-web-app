export class Job {
    id: number;
    clientID: number;
    objectID: number;
    agencyID: number;
    completionDate: string;
    status: string;
    price: number;
    clientInfo: any;
    objectInfo: any;
    clicked: boolean = false;
}