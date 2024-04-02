import { useAuth } from "../AuthContext";
// import auth from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const getRequestHeaders = async () => {
    const auth = getAuth();

    const user = auth.currentUser;
    const config = {
        headers: {},
      };

    if (user !== null && user !== undefined) {
        const accessToken = await user.getIdToken();
        if (accessToken !== undefined && accessToken !== null) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
    }
    return config;
    
    
    
    // const { currentUser } = useAuth();

    // const accessToken = await currentUser.getIdToken();
    // if (accessToken !== undefined && accessToken !== null) {
    //   config.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
  
    // return config;
  };