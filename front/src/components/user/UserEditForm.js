import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const fileInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "users/유저id" 엔드포인트로 PUT 요청함.
    const formdata = new FormData();
    formdata.append("uploadImage", profileImg[0]);
    console.log(formdata);
    // await Api.imgPost(`user/profileImg/${user.id}`, formdata);

    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    console.log(updatedUser);
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);
    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const onChange = (e) => {
    const file = e.target.profileImg;
    setProfileImg(file);

    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditPFP" className="mb-3">
            <div className="text-center justify-content-md-center">
              <img
                src={profileImg}
                alt="profile"
                className="mb-3"
                style={{ margin: "20px", width: "8rem", height: "8rem" }}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </Form.Group>

          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={handleSubmit}
              >
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
