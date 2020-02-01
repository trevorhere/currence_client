
export class User {
    id: string;
    email:string;
    password: string;

    constructor(email:string, password:string){
        this.id = Math.random().toString();
        this.email = email;
        this.password = password;
    }
    
    getID(){
        return this.id;
    }
    setEmail(email:string){
        this.email = email;
    };
    getEmail(){
        return this.email;
    };
    setPassowrd(password:string){
        this.password = password;
    };
    getPassword(){
        return this.password;
    };
}
