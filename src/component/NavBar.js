import { useRecoilState, useRecoilValue } from "recoil";
import { jwtState, userEmailState } from "..";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const [jwt, setJwt] = useRecoilState(jwtState);
    const [userEmail, setUserEail] = useRecoilState(userEmailState);
    const login = useRecoilValue(jwtState);
    console.log("loadOnStart...");

    if (sessionStorage.getItem("authToken"))
        setJwt(sessionStorage.getItem("authToken"));

    if (sessionStorage.getItem("authUserEmail"))
        setUserEail(sessionStorage.getItem("authUserEmail"));

    
    return (<nav className="navbar bg-body-tertiary fixed-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to ="/">TWITTER</Link>
      <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">TWITTER</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item" data-bs-dismiss="offcanvas"> 
              <Link className="nav-link active" aria-current="page" to="/">홈</Link>
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              {!jwt && <Link className="nav-link" to="/flow/login">로그인</Link>} 
            </li>
              {jwt && <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                정보변경
              </Link>
              <ul className="dropdown-menu">
                <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/settings/profile">프로필</Link></li>
                <li data-bs-dismiss="offcanvas"><Link className="dropdown-item" to="/flow/logout">로그아웃</Link></li>
                  
              </ul>
            </li>}
          </ul>
              
        </div>
      </div>
    </div>
  </nav>);
}

export default NavBar;