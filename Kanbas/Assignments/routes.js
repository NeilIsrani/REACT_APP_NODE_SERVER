import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    //   assignment: assignmentId,
      _id: new Date().getTime().toString(),
    }
    Database.assignments.push(newAssignment);
    res.send(newAssignment);
  });
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === cid);
    res.json(assignments);
});
  app.delete("/api/assignments/:assignmentId", (req, res) => {
const { assignmentId } = req.params;
Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
res.sendStatus(200);
});
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentIdx = Database.assignments.findIndex(
      (a) => a._id === assignmentId);
      Database.assignments[assignmentIdx] = {
      ...Database.assignments[assignmentIdx],
      ...req.body
    };
    res.sendStatus(204);
  });
}



