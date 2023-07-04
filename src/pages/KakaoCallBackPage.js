import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtState } from "..";
import { REST_SERVER_ADDRESS } from "../common/constant";
import { useEffect } from "react";


function KakaoCallBackPage() {
    const[searchParams, setSearchParams] = useSearchParams();
    const[_jwt, setJwt]=  useRecoilState(jwtState);
    //카카오 인증서버에서 쿼리스트링으로 보내준 코드를 얻어내서
    console.log(searchParams.get("code"));
    // 코드를 api로 보내줘야한다.
    useEffect(() =>{
        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS+"/api/v1/oauth/kakao", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("code="+searchParams.get("code"));
        const repsonse = JSON.parse(xhr.responseText);
        window.alert(xhr.status);
        window.opener.postMessage({
            "type": "kakaoAuth",
            "jwtToken": repsonse.token,
            "userEmail": repsonse.userEmail
        });
        window.close();
       
    },[]);



    return ( 
        <>
           <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> 
        </>
     );
}

export default KakaoCallBackPage;