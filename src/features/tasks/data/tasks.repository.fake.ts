import { ITaskRepository } from "../domain/types/repository";
import { Task } from "../domain/types/task";

declare global {
  var __fakeTasksRepo: FakeTasksRepositoryManager | undefined;
}

const DEFAULT_TASK = {
  title: "Test Task",
  color: "#000000",
  description: null,
  userId: "default-user",
  projectId: "default-project",
} satisfies Partial<Task>;

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  ...DEFAULT_TASK,
  id: crypto.randomUUID(),
  ...overrides,
});

export class FakeTasksRepositoryManager {
  private tasks: Task[] = [];
  public overrides: Partial<ITaskRepository> = {};

  private constructor() {}

  static getInstance() {
    if (!global.__fakeTasksRepo) {
      global.__fakeTasksRepo = new FakeTasksRepositoryManager();
    }
    return global.__fakeTasksRepo;
  }

  reset(): FakeTasksRepositoryManager {
    this.tasks = [];
    this.overrides = {};
    return this;
  }

  seed(tasks: Partial<Task>[]): FakeTasksRepositoryManager {
    this.tasks = tasks.map(makeTask);
    return this;
  }

  addTask(task: Partial<Task>): FakeTasksRepositoryManager {
    this.tasks.push(makeTask(task));
    return this;
  }

  withOverride<K extends keyof ITaskRepository>(
    method: K,
    implementation: ITaskRepository[K]
  ): FakeTasksRepositoryManager {
    this.overrides[method] = implementation;
    return this;
  }

  getRepository(): ITaskRepository {
    return {
      createTask: async data => {
        if (this.overrides.createTask) {
          return this.overrides.createTask(data);
        }

        const task = makeTask(data);
        this.addTask(task);
        return task;
      },
    };
  }
}

export const createFakeTasksRepository = (): ITaskRepository => {
  return FakeTasksRepositoryManager.getInstance().getRepository();
};
