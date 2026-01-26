import * as taskRepo from "../src/repositories/task.repository";
import * as userRepo from "../src/repositories/user.repository";
import { createNewTask } from "../src/services/task.service";
import { TaskPriority } from "../src/models/task.model";
import * as notificationService from "../src/services/notification.service";

jest.mock("../src/repositories/task.repository");
jest.mock("../src/repositories/user.repository");
jest.mock("../src/services/notification.service");
jest.mock("../src/config/socket", () => ({
  getIO: () => ({
    emit: jest.fn(),
    to: jest.fn().mockReturnThis(),
  }),
}));

jest.setTimeout(10000);

describe("Task Service", () => {
  it("should create task successfully", async () => {
    const mockTask = {
      _id: "507f1f77bcf86cd799439011",
      title: "Test Task",
      description: "Test Description",
      priority: TaskPriority.LOW,
      dueDate: new Date(Date.now() + 86400000),
      creatorId: "507f1f77bcf86cd799439013",
      organizationId: "507f1f77bcf86cd799439014",
    };

    (taskRepo.createTask as jest.Mock).mockResolvedValue(mockTask);
    (userRepo.findUserById as jest.Mock).mockResolvedValue({
      _id: "507f1f77bcf86cd799439013",
      organizationId: "507f1f77bcf86cd799439014",
    });
    (notificationService.notifyTaskAssignment as jest.Mock).mockResolvedValue({});

    const task: any = await createNewTask(
      {
        title: "Test Task",
        description: "Test Description",
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        priority: TaskPriority.LOW,
        assignedToId: "507f1f77bcf86cd799439012",
      } as any,
      "507f1f77bcf86cd799439013"
    );

    expect(task).toBeDefined();
    expect(task.title).toBe("Test Task");
    expect(taskRepo.createTask).toHaveBeenCalled();
  });

  it("should throw error when dueDate is missing", async () => {
    await expect(
      createNewTask(
        {
          title: "Test Task",
          priority: TaskPriority.LOW,
        } as any,
        "507f1f77bcf86cd799439013"
      )
    ).rejects.toThrow("Due date is required");
  });
});
