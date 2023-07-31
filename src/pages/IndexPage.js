import { useRecoilValue } from "recoil";
import { jwtState } from "..";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../component/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div style={{height : "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end"}}>
                <h1 style={{fontSize:"100px"}}><b>TWITTER</b></h1>
                {!jwt && 
                <div>
                    <form style={{display:"flex"}}>
                   <Link to="/flow/signup"> <button className="form-control" style={{padding:"8px", backgroundColor:"skyblue", margin: "4px"}}> <b>회원가입</b></button></Link>
                    <Link to="/flow/login"> <button className="form-control" style={{padding:"8px", width:"80px", backgroundColor:"skyblue",  margin: "4px"}}><b>로그인</b></button></Link>
                    </form>
                </div>}
            </div>
        </>
    );
}

export default IndexPage;