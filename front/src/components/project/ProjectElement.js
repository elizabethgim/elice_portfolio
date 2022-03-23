import { Row, Button, Col, Card } from "react-bootstrap";
import * as Api from "../../api";

function ProjectElement({
  project,
  isEditable,
  editingProjectList,
  setEditingProjectList,
  setFinalEditedProject,
}) {
  function handleEdit() {
    const newList = editingProjectList.concat(project._id);
    setEditingProjectList(newList);
    console.log(`${project._id}가 EditingProjectList에 추가되었습니다.`);
  }

  function handleDelete() {
    Api.delete("projects", project._id);
    setFinalEditedProject(`${project._id} 삭제됨`);
  }
  return (
    <Card.Text className="mb-3 mr-5">
      <Row className="align-items-center">
        <Col>
          <Col>{project?.title}</Col>
          <Col className="text-muted">{project?.description}</Col>
          <Col className="text-muted">
            {project?.from_date.slice(0, 10)} ~ {project?.to_date.slice(0, 10)}
          </Col>
          {project.git !== "https://github.com" && (
            <Col>
              <a href={project.git} target="_blank" rel="noreferrer">
                {project.git}
              </a>
            </Col>
          )}
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              className="mr-3"
              variant="outline-info"
              size="sm"
              onClick={handleEdit}
            >
              편집
            </Button>
            <Button
              className="mr-3"
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectElement;
