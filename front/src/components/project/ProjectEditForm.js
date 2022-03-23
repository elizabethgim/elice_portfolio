import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProjectEditForm({
  project,
  editingProjectList,
  setEditingProjectList,
  setFinalEditedProject,
}) {
  //useState로 Project의 상태를 설정함.
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [fromDate, setFromDate] = useState(new Date(project.from_date));
  const [toDate, setToDate] = useState(new Date(project.to_date));
  const [git, setGit] = useState(project.git);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Title이나 Description가 공백일 때는 제출할 수 없습니다.
    if (title !== "" && description !== "") {
      const Prj = {
        user_id: project.user_id,
        title: title,
        description: description,
        from_date: fromDate,
        to_date: toDate,
        git: git,
      };
      await Api.put(`projects/${project._id}`, Prj);
      setEditingProjectList(`${project._id} 수정됨`);
      setEditingProjectList(
        editingProjectList.filter((id) => id !== project._id)
      );
      return;
    }
    console.log("공백은 제출할 수 없습니다.");
  };

  const handleCancle = (e) => {
    e.preventDefault();
    setEditingProjectList(
      editingProjectList.filter((id) => id !== project._id)
    );
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
            onChange={(date) => {
              setFromDate(date);
            }}
          />
        </Form.Group>
        <Form.Group controlId="ProjectEditToDate" className="mb-3">
          <DatePicker
            selected={toDate}
            onChange={(date) => {
              setToDate(date);
            }}
          />
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
            <Button variant="secondary" onClick={handleCancle}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ProjectEditForm;
