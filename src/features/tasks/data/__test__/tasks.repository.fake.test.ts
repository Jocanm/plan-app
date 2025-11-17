import { beforeEach, describe, expect, it } from "vitest";
import { FakeTasksRepositoryManager } from "../tasks.repository.fake";
// import { FakeProjectsRepositoryManager } from "../tasks.repository.fake";

// describe("Projects Repository fake", () => {
//   beforeEach(() => {
//     FakeProjectsRepositoryManager.getInstance().reset();
//   });

//   it("FakeProjectsRepositoryManager is singleton", () => {
//     const instance1 = FakeProjectsRepositoryManager.getInstance();
//     const instance2 = FakeProjectsRepositoryManager.getInstance();

//     expect(instance1).toBe(instance2);
//   });

//   it("FakeProjectsRepositoryManager seed should populate the projects", async () => {
//     const manager = FakeProjectsRepositoryManager.getInstance();
//     const repo = manager.getRepository();

//     manager.seed([
//       { userId: "default-user" },
//       { userId: "default-user" },
//       { userId: "other-user" },
//     ]);

//     const results = await repo.getProjectsForSidebar("default-user");
//     expect(results).toHaveLength(2);
//   });

//   it("FakeProjectsRepositoryManager should be able to create internal projects", async () => {
//     const manager = FakeProjectsRepositoryManager.getInstance();
//     const repo = manager.getRepository();
//     manager.reset();

//     const projectId = crypto.randomUUID();
//     await repo.createProject({
//       id: projectId,
//       color: "#FFFF",
//       name: "new project",
//       userId: "default-user",
//     });

//     const allProjects = await repo.getProjectsForSidebar("default-user");
//     const firstProject = allProjects.at(0);

//     expect(allProjects).toHaveLength(1);
//     expect(firstProject).not.toBeUndefined();
//     expect(firstProject?.id).toBe(projectId);
//   });

//   it("Reset method should clear all projects", async () => {
//     const manager = FakeProjectsRepositoryManager.getInstance();
//     const repo = manager.getRepository();
//     manager.seed([{ name: "test project 1" }]);
//     manager.reset();

//     const results = await repo.getProjectsForSidebar("default-user");

//     expect(results).toHaveLength(0);
//   });

//   it("countByUser returns number of user projects", async () => {
//     const manager = FakeProjectsRepositoryManager.getInstance();
//     const repo = manager.getRepository();

//     await repo.createProject({
//       id: "projectId",
//       color: "#FFFF",
//       name: "new project",
//       userId: "default-user",
//     });
//     await repo.createProject({
//       id: "projectId",
//       color: "#FFFF",
//       name: "new project",
//       userId: "default-user",
//     });

//     const count = await repo.countByUser("default-user");
//     expect(count).toBe(2);
//   });
// });

// create the same but for tasks repository, only createTask method is needed

describe("Tasks Repository fake", () => {
  beforeEach(() => {
    FakeTasksRepositoryManager.getInstance().reset();
  });

  it("FakeTasksRepositoryManager is singleton", () => {
    const instance1 = FakeTasksRepositoryManager.getInstance();
    const instance2 = FakeTasksRepositoryManager.getInstance();

    expect(instance1).toBe(instance2);
  });

  it("FakeTasksRepositoryManager should be able to create internal tasks", async () => {
    const manager = FakeTasksRepositoryManager.getInstance();
    const repo = manager.getRepository();
    manager.reset();

    const taskId = crypto.randomUUID();
    await repo.createTask({
      id: taskId,
      color: "#FFFF",
      title: "new task",
      userId: "default-user",
      projectId: "default-project",
    });

    const allTasks = manager["tasks"];
    const firstTask = allTasks.at(0);

    expect(allTasks).toHaveLength(1);
    expect(firstTask).not.toBeUndefined();
    expect(firstTask?.id).toBe(taskId);
  });
});
