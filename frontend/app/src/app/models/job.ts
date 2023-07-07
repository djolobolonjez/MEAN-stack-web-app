import { User } from "./user";

export class Job {
    id: number;
    clientID: number;
    client: User;
    objectID: number;
    agencyID: number;
    agency: User;
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
    comment: string;
    commentInput: string;
    showCommentInput: boolean;
    rating: number;
    newRating: number;
    showRatingInput: boolean;
}