import { useRecoilValue } from "recoil";
import { jwtState } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../component/NavBar";

function IndexPage() {
    const jwt = useRecoilValue(jwtState);
    const navigate = useNavigate();
    useEffect(() => {
        if (jwt) {
            navigate("/home");
        }
    }, []);

    return (
        <>
            <NavBar />
            <div>
                <h1>Index Page</h1>
                {jwt && <div>로그온</div>}
                {!jwt && <div>
                    <Link to="/flow/login">로그인</Link>
                    <Link to="/flow/signup">회원가입</Link>
                </div>}
            </div>
        </>
    );
}

export default IndexPage;