import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { jwtState, userEmailState } from "../..";
import { REST_SERVER_ADDRESS } from "../../common/constant";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";

function DeactivatePage() {
    const [step, setStep] = useState(0);
    const [error, setError] = useState(false);
    const [jwt, setJwt] = useRecoilState(jwtState);
    const [userEmail, setUserEmail] = useRecoilState(userEmailState);
    const passwordRef = useRef();
    const navigate = useNavigate();


    const deactivateHandle = (evt) => {
        //패스워드 뽑아서 API호출]
        const password = passwordRef.current.value;

        if (password !== null) {
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE", REST_SERVER_ADDRESS + "/api/user/private?password=" + password, false);
            xhr.setRequestHeader("Authorization", jwt);

            xhr.send();
            if (xhr.status === 200) {
                setJwt(null);
                setUserEmail(null);
                sessionStorage.clear();
                navigate("/");
                return;
            }
            //처리결과에 따라 UI변경
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", REST_SERVER_ADDRESS + "/kakao/delete", false);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send();
            if (xhr.status === 200) {

            }
        }
    }
    return (
        <NavBar>
            <>
                {
                    step === 0 && <>
                        <h1>계정이 삭제 됩니다.</h1>
                        <div>
                            기타 알아야할 상황들
                        </div>
                        <button className="btn btn-danger" onClick={(evt) => {
                            setStep(1);
                        }}>삭제</button>
                        {error && <div className="alert alert-danger" role="alert">
                            A simple danger alert—check it out!
                        </div>}
                    </>
                }
                {
                    step === 1 && <>
                        <h3> 비밀번호 변경</h3>
                        <small>당신의 계정에 설정된 비밀번호를 입력하세요.</small>
                        <div>
                            {userEmail.endsWith("@kakao.com") ?
                                <>
                                    <input type="password" placeholder="소셜가입자는 비밀번호를 입력하지 않습니다." />
                                </>
                                :
                                <>
                                    <input type="password" placeholder="비밀번호" ref={passwordRef} />
                                </>
                            }
                        </div>
                        <button className="btn btn-danger" onClick={deactivateHandle}>삭제</button>
                    </>

                }

            </>
        </NavBar>
    );
}

export default DeactivatePage;