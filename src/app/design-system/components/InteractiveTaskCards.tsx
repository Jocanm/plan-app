"use client";

import { TaskCard } from "@/components/task";

export function InteractiveTaskCards() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <TaskCard
          title="Design new dashboard layout"
          description="Create wireframes and mockups for the updated dashboard with better user experience"
          dueDate={new Date("2024-01-15")}
          tags={["design", "ui", "urgent"]}
          priority="high"
          project={{ name: "Work", color: "#EF4444" }}
          onToggleComplete={completed => {
            // eslint-disable-next-line no-console
            console.log("Toggle:", completed);
          }}
        />

        <TaskCard
          title="Review React documentation"
          description="Go through the latest React 18 features and hooks"
          completed
          dueDate={new Date("2024-01-10")}
          tags={["learning", "react"]}
          priority="medium"
          project={{ name: "Learning", color: "#10B981" }}
          onToggleComplete={completed => {
            // eslint-disable-next-line no-console
            console.log("Toggle:", completed);
          }}
        />

        <TaskCard
          title="Buy groceries"
          dueDate={new Date("2024-01-05")}
          tags={["personal"]}
          priority="low"
          project={{ name: "Personal", color: "#3B82F6" }}
          onToggleComplete={completed => {
            // eslint-disable-next-line no-console
            console.log("Toggle:", completed);
          }}
        />
      </div>
    </div>
  );
}
