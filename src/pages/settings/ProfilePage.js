import { useRecoilState } from "recoil";
import { REST_SERVER_ADDRESS } from "../../common/constant";
import { useEffect, useRef, useState } from "react";
import { jwtState } from "../..";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import defaultImage from "../../common/image/default.png";

function ProfilePage() {
    const [jwt, setJwt] = useRecoilState(jwtState);
    const nameRef = useRef();
    const imageRef = useRef();
    const fileRef = useRef();
    const navigate = useNavigate();
    const [data, setData] = useState();

    //useEffect는 특정 상태에 변경이 될 때 마다 자동처리 되는 함수 등록 
    useEffect(() => {
        if (!jwt)
            return;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", REST_SERVER_ADDRESS + "/api/user/private", false);
        xhr.setRequestHeader("Authorization", jwt);
        xhr.send();

        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            //json 안에는 code라는 number가 있고 user 객체가 있음
            setData(result);
        }
        // json 안에는 code 라는 number 가 있고, user : 객체가 있음

    }, [jwt]) // 2번째 인자 []을 비워두면 맨처음 한번 랜더링되고 난 이후만 작동

    useEffect(() => {
        if(data && nameRef.current !== null) {
            nameRef.current.value = data.user.name;
        }
        
    }, [data])

    //===============================================================================

    const submitHandle = (evt) => {

        evt.preventDefault(); // 기본 동작을 막음(form 에서 submit 일어나면 action으로 이동해버림)

        const xhr = new XMLHttpRequest();
        xhr.open("POST", REST_SERVER_ADDRESS + "/api/user/private/info", false);
        // xhr.setRequestHeader("content-type", "multipart/form-data"); //멀티파트 설정할때는 수동 설정하지 마라. (CORS 위배 되어 안됨.)
        xhr.setRequestHeader("Authorization", jwt);

        const body = new FormData();

        body.append("name", nameRef.current.value);
        if (fileRef.current.files.length != 0) {
            body.append("profile", fileRef.current.files[0]);
            console.log(body);
        }

        xhr.send(body); //send할때 FormData객체를 보내면 알아서  content-type이 multipart 설정됨.


        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            //json 안에는 code라는 number가 있고 user 객체가 있음

            window.alert("회원 정보가 변경 되었습니다.");
            navigate("/");
        } else {
            window.alert("회원 정보 변경에 실패하였습니다.");
        }


        // console.log(imageRef.current.files[0]);
    }
    const fileChangeHandle = (evt) => {
        const file = fileRef.current.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file); //비동기
        reader.onload = function (e) {
            // console.log(reader.result);
            imageRef.current.src = reader.result;

        }
    }

    const imgClickHandle = (evt) => {
        fileRef.current.dispatchEvent(new MouseEvent("click"));
    }

    return (
        <>
            <NavBar />
            <>
                <Link to="/">되돌아가기</Link>
                {data &&
                    <div className="container pt-3" style={{ height: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                        <h4>#개인정보수정</h4>
                        <form onSubmit={submitHandle} style={{ border: "2px black solid", borderRadius: "8px", padding: "16px" }}>
                            <p>
                                <img src={data.user.profileImage !== "" ? data.user.profileImage : defaultImage} style={{ width: "300px", height: "300px", cursor: "pointer", borderRadius: "24px" }} ref={imageRef} onClick={imgClickHandle} />
                                <input type="file" accept="image/*" ref={fileRef} onChange={fileChangeHandle} style={{ display: "none" }} />
                            </p>
                            <p>
                                <input type="text" ref={nameRef} style={{ width: "300px", height: "50px" }} />
                            </p>
                            <p style={{ display: "flex", justifyContent: "center" }}>
                                <button type="submit" style={{ width: "80px", height: "40px", borderRadius: "8px", backgroundColor: "skyblue" }}>수정</button>
                            </p>
                        </form>
                    </div>
                }
            </>
        </>
    );
}

export default ProfilePage;