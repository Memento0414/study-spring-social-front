import { Link, useNavigate } from "react-router-dom";
import { REST_SERVER_ADDRESS } from "../common/constant";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { jwtState } from "..";

function LoginPage() {
    // 필요한 훅 설정
    const navigate = useNavigate();
    const formRef = useRef();
    const setJwt = useSetRecoilState(jwtState);

    // 이벤트 처리
    const loginFormHandle = (evt) => {
        evt.preventDefault();
        const email = formRef.current.email.value;
        const password = formRef.current.password.value;
        if (email === "" || password === "") {
            formRef.current.email.focus();
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS + "/api/v1/user/validate", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.send("email=" + email + "&password=" + password);
        window.alert(xhr.status);
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // window.alert(response.token);
            setJwt(response.token);
            navigate("/");
        } else {

        }
    }

    const kakaoLoginHandle = (evt) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", REST_SERVER_ADDRESS+"/api/v1/oauth/kakao",false);
        xhr.send();
        const url = JSON.parse(xhr.responseText).oauthUri;
        window.open(url, "_blank", "width=400, height=620, popup=1");
    }

    // const kakaoLogincallback = (evt) => {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("POST", REST_SERVER_ADDRESS+"/api/v1/oauth/kakao/callback", false);
    //     xhr.open("code=" +code+"&seret="+secret);
    //     const url = JSON.parse(xhr.responseText).oauthUri;
    //     navigate("/")
    // }

    return (
        <div className="container pt-3">
            <h2>#로그인</h2>

            <form onSubmit={loginFormHandle} ref={formRef}>
                <div className="mb-3">
                    <span className="form-label">사용자이메일(*)</span>
                    <input type="text" className="form-control" name="email" />
                </div>
                <div className="mb-3">
                    <span className="form-label">사용자비밀번호(*)</span>
                    <input type="password" className="form-control" name="password" />
                </div>
                <div className="mb-3">
                    <button type="submit" className="form-control">로그인</button>
                </div>
                <div className="mb-3">
                    <button type="button" className="form-control" onClick={kakaoLoginHandle}>카카오로 로그인하기</button>
                </div>
            </form>
            <div className="text-center">
                계정이 없으신가요?<Link to="/flow/signup">가입하기</Link>
            </div>
        </div>);
}

export default LoginPage;