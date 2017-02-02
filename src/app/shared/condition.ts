export class Condition {

    name: string;
    datetime: {
        days: string[],
        hour: string;
    };
    input_port: {
        number: number;
        state: boolean;
    }


    constructor(name: string,
                datetime?: { days: string[]; hour: string },
                input_port?: { number: number; state: boolean }) {
        this.name = name;
        this.datetime = datetime;
        this.input_port = input_port;
    }
}
