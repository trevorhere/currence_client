
import ServerFacade  from '../API/ServerFacade'



const signup = async (alias:string, password:string, file: File, setAuthToken):  Promise<{message: string, token: string |null} | null > => {
    
    const fileToBase64 = (filename, filepath) => {
        return new Promise(resolve => {
          var file = new File([filename], filepath);
          var reader = new FileReader();
          reader.onload = function(event) {
            resolve(event!.target!.result);
          };
          
          return reader.readAsDataURL(file);
        });
      };

      const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL:any = "";
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            console.log("Called", reader);
            baseURL = reader.result;
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };


    let base64 = await getBase64(file);

    return await ServerFacade.signup(alias, password ,base64).then(data => {
        const { message, alias, authenticated, token } = data!;

        if(authenticated){
            setAuthToken({message, alias, token});
            return {message: message, token:token};
        } else {
            setAuthToken(null);
            return {message, token: null};
        }

    }).catch(err => {
        console.log('error', err);
        return null;
    })
}

const signin =  async (alias:string, password:string, setAuthToken): Promise<{message: string, token: string |null} | null > => {
    return await ServerFacade.signin(alias, password).then(data => {
        const { message, alias, authenticated, token } = data!;

        if(authenticated){
            setAuthToken({message, alias, token});
            return {message: message, token:token};
        } else {
            setAuthToken(null);
            return {message, token: null};
        }

    }).catch(err => {
        console.log('error', err);
        return null;
    })
}

const signout = async (setAuthToken): Promise<void> => {
    setAuthToken(null);
}

export { signup, signin, signout}