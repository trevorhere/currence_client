export class Status {
    id: string;
    message: string;
    user_id: string

    constructor(user_id: string, message: string){
        this.id = Math.random().toString();
        this.user_id = user_id;
        this.message = message;
    }
    
    getID(){
        return this.id;
    }
    setMessage(message:string){
        this.message = message;
    };
    getMessage(){
        return this.message;
    };
    getUserID(){
        return this.user_id;
    };
}
