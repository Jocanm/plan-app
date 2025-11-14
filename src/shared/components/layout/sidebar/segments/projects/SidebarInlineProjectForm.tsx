import { Input } from "../../../../ui/input/Input";

export const SidebarInlineProjectForm = () => {
  return (
    <form data-testid="sidebar-inline-project-form">
      <Input placeholder="Project Name" autoFocus />
    </form>
  );
};
