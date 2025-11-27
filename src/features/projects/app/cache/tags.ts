export const projectsTags = {
  byId(projectId: string): string {
    return `project-${projectId}`;
  },

  byUser(userId: string): string {
    return `projects-list-${userId}`;
  },
};
