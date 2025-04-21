export class UserName {
    value: string;

    constructor (value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid () {
        if (this.value.length < 2 || this.value.length > 50) {
            throw new Error('Invalid user name');
        }
    }
}