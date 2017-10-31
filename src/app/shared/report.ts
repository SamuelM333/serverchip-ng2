export class Report {
    _id: string;
    _etag: string;
    created: string;
    microchip: any;
    user: string;
    details: {
        task: any;
        status: {
            code: string,
            reason: string
            // user: string
        };
    };


    constructor(_id: string, _etag: string, created: string, microchip: any, user: string,
                details: { task: any; status: { code: string; reason: string } }) {
        this._id = _id;
        this._etag = _etag;
        this.created = created;
        this.microchip = microchip;
        this.user = user;
        this.details = details;
    }
}
