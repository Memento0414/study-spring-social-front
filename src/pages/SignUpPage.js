/*
    회원가입 UI - /flow/signup
*/

import { useRef, useState } from "react";
import { REST_SERVER_ADDRESS } from "../common/constant";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const [availableFlag, setAvailableFlag] = useState(0);
    const formRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const varifyBtnRef = useRef();
    const naivgate = useNavigate();
    //이벤트 처리 코드 ========================================================================================
    // 사용자가 이메일 입력란에 값 입력시 , 사용가능여부를 확이는 API 통신 처리
    const emailChangeHandle = (evt) => {
        // console.log(evt.target.value);

        if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(evt.target.value)) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", REST_SERVER_ADDRESS + "/api/v1/user/available?email=" + formRef.current.email.value, false);
            xhr.send();
            //window.alert(xhr.status);
            if (xhr.status === 200) {

                varifyBtnRef.current.disabled = false;
                setAvailableFlag(1);
            } else {

                varifyBtnRef.current.disabled = true;
                setAvailableFlag(-1);
            }

        } else {
            varifyBtnRef.current.disabled = true;
            setAvailableFlag(0);
        }

        // varifyBtnRef.current.disabled= !(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(evt.target.value))
    }
    // 사용자가 이메일 인증코드를 요청시 , 메일을 발송시키는 API를 호출
    const verifyBtnClickHandle = (evt) => {
        //API로 요청을 하면 됨.
        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS + "/api/v1/user/verify-email", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("email=" + formRef.current.email.value);
        window.alert(formRef.current.email.value + "로 이메일을 발송하였습니다.");
        console.log(xhr.responseText);
        setAvailableFlag(2);

    }
    // 사용자가 인증코드 입력 후 엔터 눌렀을 때, 코드검증처리를 하는 API를 호출
    const codeSubmitHandle = (evt) => {
        if (evt.keyCode !== 13) {
            return;
        }
        evt.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", REST_SERVER_ADDRESS + "/api/v1/user/verify-email", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("email=" + formRef.current.email.value + "&code=" + evt.target.value);

        if (xhr.status === 200) {
            setAvailableFlag(4);
            emailRef.current.readOnly = true;
            varifyBtnRef.current.disabled = true;
            // Window.alert("이메일 인증이 완료되었습니다.")
        }

    }
    // 사용자가 회원가입을 눌렀을때 신규 유저를 등록하는 API를 호출
    const signupSubmitHandle = (evt) => {
        evt.preventDefault();
        const email = emailRef.current.value;
        const name = formRef.current.name.value;
        const passowrd = passwordRef.current.value;
        if (email === "" || name === "" || passowrd === "" || availableFlag !== 4) {
            window.alert("이메일인증이 완료되지 않았습니다.")
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS + "/api/v1/user/join", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("email=" + email + "&name=" + name + "&password=" + passowrd);

        if (xhr.status === 201) {
            naivgate("/flow/login");
        } else {

        }
    }

    //html 영역==============================================================================================
    return (
        <>
            <h2>계정을 생성하세요.</h2>
            <hr />
            <form ref={formRef} onSubmit={signupSubmitHandle}>
                <p>
                    <span className="form-label">이름</span>
                    <input type="text" placeholder="이름" name="name" className="form-control" onChange={(evt) => {
                        if (evt.target.value !== "") {
                            evt.target.classList.add("is-valid");
                            evt.target.classList.remove("is-invalid");
                        } else {
                            evt.target.classList.add("is-invalid");
                            evt.target.classList.remove("is-valid");
                        }

                    }} />
                </p>
                <p>
                    <span>이메일</span>
                    <input type="text" placeholder="이메일" onChange={emailChangeHandle} name="email" ref={emailRef} />
                    <button type="button" ref={varifyBtnRef} onClick={verifyBtnClickHandle}>이메일인증</button>
                </p>

                {availableFlag === 1 && <p style={{ color: "green" }}><b>사용가능한 이메일입니다.</b></p>}
                {availableFlag === -1 && <p style={{ color: "red" }}><b>이미 사용한 이메일입니다.</b></p>}
                {availableFlag === 2 && <p>
                    <span>이메일 인증코드</span>
                    <input type="text" placeholder="인증코드" onKeyDown={codeSubmitHandle} />
                </p>}


                <p>
                    <span>비밀번호</span>
                    <input type="password" placeholder="비밀번호" ref={passwordRef} />
                </p>
                <p>
                    <button type="submit">가입하기</button>
                </p>
            </form>
        </>
    );
}

export default SignUpPage;