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
    roomOneWorkers: Array<number>;
    roomTwoWorkers: Array<number>;
    roomThreeWorkers: Array<number>;
    roomOneStatus: string;
    roomTwoStatus: string;
    roomThreeStatus: string;
    started: boolean = false;
    numberOfRooms: number;
    pay: boolean;
}