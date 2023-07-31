import { useRecoilState } from "recoil";
import { jwtState, userEmailState } from "../..";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
        const [jwt, setjwt] = useRecoilState(jwtState);
        const [userEmail, setUserEmail] = useRecoilState(userEmailState);
        const navigate = useNavigate();
       useEffect(()=>{
        setjwt(null);
        setUserEmail(null);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authUserEmail");
        navigate("/");


       },[])

    return ( 
    <>
    </> 
    );
}

export default Logout;