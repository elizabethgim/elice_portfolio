import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProjectAddForm({ setIsAddingProject, setFinalEditedProject }) {
  //useState로 Project의 상태를 설정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [git, setGit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      // ProjectList를 변경합니다.
      const Prj = {
        title: title,
        description: description,
        from_date: fromDate,
        to_date: toDate,
        git: git,
      };
      const res = await Api.post(`project/create`, Prj);
      const project = res.data;
      setFinalEditedProject(`${project._id} 추가됨`);
      setIsAddingProject(false);
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  return (
    <div className="mb-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ProjectEditTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditFromDate" className="mb-3">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditToDate" className="mb-3">
          <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
        </Form.Group>
        <Form.Group controlId="ProjectEditGit" className="mb-3">
          <Form.Control
            type="text"
            placeholder="링크(선택)"
            value={git}
            onChange={(e) => setGit(e.target.value)}
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
            <Button
              variant="secondary"
              onClick={() => setIsAddingProject(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ProjectAddForm;
