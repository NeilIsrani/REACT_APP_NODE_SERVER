import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const modules = await dao.findModulesByCourse(req.params.cid);
    res.json(modules);
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    const module = await dao.createModule({ ...req.body, course: req.params.cid });
    res.json(module);
  });

  app.put("/api/modules/:mid", async (req, res) => {
    const module = await dao.updateModule(req.params.mid, req.body);
    res.json(module);
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    await dao.deleteModule(req.params.mid);
    res.sendStatus(204);
  });
}
