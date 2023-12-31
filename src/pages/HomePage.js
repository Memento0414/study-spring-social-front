import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtState, userEmailState } from "..";
import NavBar from "../component/NavBar";
import { useEffect, useRef, useState } from "react";
import { REST_SERVER_ADDRESS } from "../common/constant";


function HomePage() {
  const [userEmail, setUserEmail] = useRecoilState(userEmailState);
  const [jwt, setJwt] = useRecoilState(jwtState);
  const [count, setCount] = useState(0);
  const [feeds, setFeeds] = useState([]);
  const formRef = useRef();
  const [page, setPage] = useState(1); 

  //최신 피드 얻어오기
  const updateFeed = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", REST_SERVER_ADDRESS + "/api/feed/list?page="+page, false);
    xhr.send();
    if (xhr.status === 200) {
      const body = JSON.parse(xhr.responseText);
      setCount(body.total);
      setFeeds([...feeds, ...body.feeds]);
      setPage(page+1);

    } else {
      //데이터를 못 불러올때 고려해서 작업 추가
    }
  };

  useEffect(updateFeed, []);

  const submitHandle = (evt) => {
    evt.preventDefault();
    // 글 등록해주는 API 사용해주고
    const xhr = new XMLHttpRequest();
    xhr.open("POST", REST_SERVER_ADDRESS + "/api/feed/create", false);
    xhr.setRequestHeader("Authorization", jwt);

    const body = new FormData();
    const description = formRef.current.description.value;
    body.append("description", description);

    const attaches = formRef.current.attaches.files;

    if (attaches.length != 0) {
      for (var file of attaches) {
        body.append("attaches", file);

      }
     
    }
    xhr.send(body);

    // 글 정상 등록되면
    if (xhr.status === 201) {
      formRef.current.reset();
      updateFeed();   // 

    } else {
      window.alert("새글 등록 과정에 장애가 발생하였습니다.");
    }
  }
  const errorImageHandle = (evt) => {

  }
  document.onscroll = (evt) => {
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight-200){
      updateFeed();
    }
  }

  return (<>
    <NavBar />
    <div className="container mt-5 py-3" >
      {jwt &&
        <form ref={formRef} onSubmit={submitHandle}>
          <div className="card">
            <div className="card-body" >
              <div>
                <textarea name="description" className="form-control-plaintext" style={{ resize: "none" }} placeholder="내용"></textarea>
              </div>
              <div className="d-flex flex-wrap">
                &lt;사진 미리보기 영역&gt;
              </div>
              <div>
                <input type="file" name="attaches" accept="image/" multiple id="img_upload"/>
 
              </div>
            </div>
          </div>
          <button className="form-control text-bg-dark" style={{padding:"8px"}}>등록</button>
        </form>}

      {
        feeds && feeds.map(one => <div className="card mt-1" id={one.id}>
          <div className="card-header">
            <img src={one.writer.profileImage} style={{ width: 32 }} onError={errorImageHandle} />
            {one.writer.name}    <small>{one.writer.email} </small>
          </div>
          <div className="card-body" style={{display: "flex"}}>
            <div>
              {one.description}
            </div>
            {one.attaches.map(a =>
              <div className="p-3">
                <img src={a.mediaUrl} className="img-fluid rounded" style={{height:"200px", width:"200px"}}/>
              </div>
            )}
          </div>
        </div>)
      }
  
    </div>
  </>);
}

export default HomePage;