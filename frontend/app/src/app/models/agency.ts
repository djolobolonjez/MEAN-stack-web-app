export interface Agency {
    id: number;
    address: string;
    name: string;
    description: string;
    valid: boolean;
    openVacancies: number;
    profileImage: string;
    comments: Array<any>;
}