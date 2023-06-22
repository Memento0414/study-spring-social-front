import { useRecoilValue } from "recoil";
import { jwtState } from "..";
import { Link } from "react-router-dom";

function IndexPage() {
    const jwt = useRecoilValue(jwtState);
    return ( 
        <div>
            <h1>Index Page</h1>
            {jwt && <div>로그온 상태</div>}
            {!jwt && <div>
                        <Link to="/flow/login">로그인</Link>
                        <Link to="/flow/signup">회원가입</Link>
                </div>}
        </div>
     );
}

export default IndexPage;