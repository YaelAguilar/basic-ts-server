export class UserId {
    value: string;

    constructor (value: string) {
        this.value = value;
        this.ensureIsValid();
    }
    
    private ensureIsValid(){
        if (!this.value || !/^\d+$/.test(this.value)) {
            throw new Error('Invalid user ID: must be a number');
        }
    }
}
