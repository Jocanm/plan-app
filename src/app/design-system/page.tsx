import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";

import { TaskStatusBadge, type Project } from "@/components/task";

import {
  InteractiveProjectSelector,
  InteractiveTagInput,
  InteractiveTaskCards,
} from "./components";

const projects: Project[] = [
  { id: "1", name: "Personal", color: "#3B82F6" },
  { id: "2", name: "Work", color: "#EF4444" },
  { id: "3", name: "Learning", color: "#10B981" },
];

export const metadata = {
  title: "Design System",
  description: "A comprehensive overview of the design system components.",
};

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Design System Showcase</h1>
        <p className="text-dark-light">
          A comprehensive overview of your task management app&apos;s design
          system components.
        </p>
      </div>

      {/* Basic UI Components */}
      <section className="space-y-6">
        <h2 className="text-l font-semibold">Basic UI Components</h2>

        <Card>
          <CardHeader>
            <CardTitle>Buttons & Actions</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">⚡</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Display Components</CardTitle>
            <CardDescription>
              Badges, progress bars, and indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-s">
                <span>Task Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Task-Specific Components */}
      <section className="space-y-6">
        <h2 className="text-l font-semibold">Task Management Components</h2>

        <Card>
          <CardHeader>
            <CardTitle>Task Status & Project Selection</CardTitle>
            <CardDescription>
              Specialized components for task management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <TaskStatusBadge status="pending" />
              <TaskStatusBadge status="completed" />
              <TaskStatusBadge status="overdue" />
            </div>

            <InteractiveProjectSelector projects={projects} />

            <InteractiveTagInput />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Cards</CardTitle>
            <CardDescription>
              Preview of different task card states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InteractiveTaskCards />
          </CardContent>
        </Card>
      </section>

      {/* Color Palette */}
      <section className="space-y-6">
        <h2 className="text-l font-semibold">Color Palette</h2>
        <Card>
          <CardHeader>
            <CardTitle>Brand & UI Colors</CardTitle>
            <CardDescription>
              Your app&apos;s color system and tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "Primary",
                  color: "bg-primary",
                  text: "text-light-surface",
                },
                {
                  name: "Success",
                  color: "bg-success",
                  text: "text-light-surface",
                },
                { name: "Warning", color: "bg-warning", text: "text-dark" },
                {
                  name: "Danger",
                  color: "bg-danger",
                  text: "text-light-surface",
                },
                { name: "Dark", color: "bg-dark", text: "text-light-surface" },
                {
                  name: "Light",
                  color: "bg-light-surface border",
                  text: "text-dark",
                },
              ].map(color => (
                <div key={color.name} className="space-y-2">
                  <div
                    className={`h-16 rounded-md ${color.color} ${color.text} flex items-center justify-center text-s font-medium`}
                  >
                    {color.name}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
