# Product Flows - Plan App

**Version:** 1.0 (MVP)
**Last Updated:** January 2025
**Audience:** Non-technical stakeholders, designers, product team

---

## 📖 Table of Contents

1. [What is Plan App?](#what-is-plan-app)
2. [Core Concepts](#core-concepts)
3. [User Flows](#user-flows)
4. [System Rules](#system-rules)
5. [Real-World Examples](#real-world-examples)
6. [Future Enhancements](#future-enhancements)

---

## 🎯 What is Plan App?

**Plan App** is a daily task management tool designed to help users organize their day-to-day activities. Unlike traditional to-do lists, Plan App focuses on **what you need to do TODAY**, helping you plan your time in blocks throughout the day.

### The Core Philosophy

- **Daily Focus:** Every day is a fresh start
- **Recurring Tasks:** Activities that repeat daily appear automatically
- **Time Blocking:** Assign specific time slots to tasks when you're ready
- **Flexibility:** Not everything needs to be scheduled—only what you commit to doing

Think of it as a combination of:
- 📝 **Task List** (what needs to be done)
- 📅 **Calendar** (when you'll do it)
- 🔄 **Daily Planner** (focused on today)

---

## 🧩 Core Concepts

### 1. Projects

**What is a Project?**
- A container to organize related tasks
- Example: "Work", "Personal", "Health", "Home"

**Characteristics:**
- Has a name and color for easy identification
- Contains multiple tasks
- Can be accessed via sidebar navigation

**Visual Example:**
```
Sidebar
├── 📊 Work (Blue)
├── 🏠 Personal (Red)
├── 💪 Health (Green)
└── 🛒 Errands (Yellow)
```

---

### 2. Tasks

**What is a Task?**
- An activity or action that needs to be done
- Can be recurring (daily) or one-time

**Types of Tasks:**

#### A) **Recurring Tasks**
Tasks that repeat every day.

**Examples:**
- "Meditate" (every morning)
- "Exercise" (daily)
- "Read for 30 minutes" (every evening)

**Behavior:**
- ✅ Appears in your project list **every day**
- ✅ Fresh start each day (yesterday's completion doesn't carry over)
- ✅ You decide each day if/when to do it

#### B) **One-Time Tasks**
Tasks that only need to be done once.

**Examples:**
- "Buy groceries"
- "Call the dentist"
- "Fix the sink"

**Behavior:**
- ✅ Appears until completed
- ✅ Once completed, disappears automatically the next day
- ✅ No need to manually delete

---

### 3. Calendar & Time Blocking

**What is Time Blocking?**
- Assigning a specific time slot to a task
- Example: "Exercise" → 6:00 AM - 7:00 AM

**How it Works:**
1. You see your tasks in the project view
2. Drag a task to the calendar
3. Drop it on a time slot (e.g., 7:00 PM)
4. System assigns: 7:00 PM - 8:00 PM (1 hour default)

**Important:**
- Tasks **don't need** to be scheduled to exist
- Only schedule tasks you commit to doing
- Unscheduled tasks remain visible but inactive

---

## 👤 User Flows

### Flow 1: Creating a New Project

**Steps:**
1. User clicks "+ New Project" in sidebar
2. Enters project name: "Morning Routine"
3. Chooses a color: Purple
4. Clicks "Create"

**Result:**
- New project appears in sidebar
- Project is empty (no tasks yet)
- User can now add tasks to it

---

### Flow 2: Creating a Recurring Task

**Steps:**
1. User opens project "Morning Routine"
2. Clicks "+ New Task"
3. Fills in:
   - Title: "Meditate"
   - Type: Recurring
   - Duration: 15 minutes (optional)
4. Clicks "Create"

**Result:**
- Task appears in project view
- Status: "Not scheduled" (no time assigned)
- Will appear **every day** in this project

**Visual:**
```
Morning Routine Project
────────────────────────
⚪ Meditate (recurring)     [Not scheduled]
```

---

### Flow 3: Creating a One-Time Task

**Steps:**
1. User opens project "Errands"
2. Clicks "+ New Task"
3. Fills in:
   - Title: "Buy milk"
   - Type: One-time
4. Clicks "Create"

**Result:**
- Task appears in project view
- Status: "Not scheduled"
- Will disappear once completed

---

### Flow 4: Scheduling a Task (Time Blocking)

**Steps:**
1. User sees "Meditate" in project view
2. **Drags** the task card
3. Opens calendar view (or split view)
4. **Drops** task on 7:00 AM time slot
5. System confirms: "Meditate scheduled for 7:00 AM - 7:15 AM"

**Result:**
```
Before:
⚪ Meditate (recurring)     [Not scheduled]

After:
☐ Meditate (recurring)     [7:00 AM - 7:15 AM]
   ↑ Checkbox now active
```

**Important Changes:**
- Checkbox becomes **active** (can now be checked)
- Time is displayed next to task
- Task appears in calendar view

---

### Flow 5: Completing a Task

**Prerequisites:**
- Task must be scheduled (have a time slot)

**Steps:**
1. User sees scheduled task:
   ```
   ☐ Exercise     [6:00 AM - 7:00 AM]
   ```
2. Clicks checkbox
3. Task updates to:
   ```
   ✅ Exercise    [6:00 AM - 7:00 AM]
   ```

**Result:**
- Task marked as completed **for today**
- If recurring: Will appear again tomorrow (unchecked, fresh start)
- If one-time: Won't appear tomorrow

---

### Flow 6: Typical Day from Start to Finish

**8:00 AM - User opens Plan App**

**Sees:**
```
Morning Routine (Project)        [← Yesterday | Today | Tomorrow →]
──────────────────────────────────────────────────────────────────

TASKS (January 29, 2025)

⚪ Meditate (recurring)              [Not scheduled]
⚪ Exercise (recurring)              [Not scheduled]
⚪ Read (recurring)                  [Not scheduled]
⚪ Buy milk (one-time)               [Not scheduled]

[+ New Task]
```

**8:05 AM - User plans their day**

Drags tasks to calendar:
- "Exercise" → 9:00 AM
- "Read" → 7:00 PM
- Leaves "Meditate" unscheduled (no time today)
- Leaves "Buy milk" unscheduled (will do later)

**Updated view:**
```
TASKS (January 29, 2025)

⚪ Meditate (recurring)              [Not scheduled]
☐ Exercise (recurring)              [9:00 AM - 10:00 AM]
☐ Read (recurring)                  [7:00 PM - 8:00 PM]
⚪ Buy milk (one-time)               [Not scheduled]
```

**9:00 AM - User exercises**
- Completes workout
- Checks off "Exercise"
- Task shows ✅

**7:00 PM - User reads**
- Completes reading session
- Checks off "Read"
- Task shows ✅

**End of day:**
```
TASKS (January 29, 2025)

⚪ Meditate (recurring)              [Not scheduled]
✅ Exercise (recurring)              [9:00 AM - 10:00 AM]
✅ Read (recurring)                  [7:00 PM - 8:00 PM]
⚪ Buy milk (one-time)               [Not scheduled]
```

---

### Flow 7: Next Day (Fresh Start)

**8:00 AM - January 30 - User opens app**

**Sees:**
```
TASKS (January 30, 2025)

⚪ Meditate (recurring)              [Not scheduled]
⚪ Exercise (recurring)              [Not scheduled]
⚪ Read (recurring)                  [Not scheduled]
⚪ Buy milk (one-time)               [Not scheduled]
```

**Notice:**
- ✅ Recurring tasks are **back** (fresh, unscheduled)
- ✅ "Buy milk" still appears (not completed yesterday)
- ✅ Yesterday's schedule doesn't carry over
- ✅ Clean slate to plan today

---

## 📋 System Rules

### Task Visibility Rules

| Task Type | Status | Appears Today? | Appears Tomorrow? |
|-----------|--------|----------------|-------------------|
| Recurring | Not scheduled | ✅ Yes | ✅ Yes (fresh) |
| Recurring | Scheduled | ✅ Yes | ✅ Yes (fresh) |
| Recurring | Completed | ✅ Yes | ✅ Yes (fresh) |
| One-time | Not scheduled | ✅ Yes | ✅ Yes (until completed) |
| One-time | Scheduled | ✅ Yes | ✅ Yes (until completed) |
| One-time | Completed | ✅ Yes (today) | ❌ No (disappears) |

---

### Checkbox Behavior Rules

| Task State | Checkbox | Behavior |
|------------|----------|----------|
| Not scheduled | ⚪ Disabled | Cannot check (must schedule first) |
| Scheduled, pending | ☐ Active | Click to mark complete |
| Scheduled, completed | ✅ Checked | Click to unmark (if needed) |

---

### Scheduling Rules

**When dragging a task to calendar:**
1. ✅ Creates a time block for **today only**
2. ✅ Default duration: 1 hour
3. ✅ Task checkbox becomes active
4. ✅ Task displays time next to title

**What happens to unscheduled tasks:**
- ✅ Remain visible in project
- ✅ Checkbox stays disabled
- ✅ Can be scheduled anytime
- ✅ No penalty for not scheduling

---

### Completion Rules

**Recurring Tasks:**
```
Day 1: Exercise scheduled & completed ✅
Day 2: Exercise appears again (unscheduled) ⚪
```
- Completion is **per day**
- No streaks or history (yet)
- Fresh start every day

**One-Time Tasks:**
```
Day 1: Buy milk scheduled & completed ✅
Day 2: Buy milk disappears (no longer needed)
```
- Completion is **permanent**
- Task auto-removes next day
- No manual archiving needed

---

## 🌟 Real-World Examples

### Example 1: Fitness Enthusiast

**User:** Sarah, wants to build healthy habits

**Setup:**
- Creates project: "Health & Fitness"
- Adds recurring tasks:
  - "Morning yoga" (30 min)
  - "Drink 2L water"
  - "Evening walk" (20 min)

**Daily Routine:**
1. Opens app at 7am
2. Schedules "Morning yoga" → 7:30 AM
3. Schedules "Evening walk" → 6:00 PM
4. Leaves "Drink water" unscheduled (tracks throughout day)
5. Completes tasks as she does them

**Next Day:**
- All 3 tasks appear again (fresh)
- She schedules them based on today's agenda
- Flexibility: Some days she skips yoga, no problem

---

### Example 2: Busy Professional

**User:** Carlos, manages work + personal tasks

**Setup:**
- Creates projects:
  - "Work" (Blue)
  - "Personal" (Green)
  - "Side Hustle" (Purple)

**Work Project:**
- Recurring: "Check emails" (daily)
- Recurring: "Team standup" (daily, 9am)
- One-time: "Finish Q1 report" (due this week)

**Daily Flow:**
1. Schedules "Team standup" → 9:00 AM (fixed)
2. Schedules "Check emails" → 8:00 AM & 4:00 PM (twice)
3. Schedules "Q1 report" → 2:00 PM - 4:00 PM (2 hour block)

**When done:**
- "Finish Q1 report" gets completed → Disappears tomorrow ✅
- Recurring tasks remain for tomorrow

---

### Example 3: Student

**User:** Ana, managing studies + life

**Setup:**
- Project: "University"
  - Recurring: "Study calculus" (daily, 2 hours)
  - Recurring: "Review notes" (daily, 30 min)
- Project: "Personal"
  - One-time: "Buy textbooks"
  - One-time: "Register for gym"
  - Recurring: "Call mom" (daily)

**Flexible Planning:**
- Monday: Studies all morning (schedules both tasks)
- Tuesday: Has early class (only schedules "Review notes")
- Wednesday: Busy day (schedules nothing, tasks stay visible)
- Thursday: Back on track (schedules both again)

**No guilt or pressure** - tasks always there when ready.

---

## 🚀 Future Enhancements

### Out of MVP Scope (Coming Later)

#### 1. **Week View**
- See all 7 days at once
- Drag tasks across multiple days
- Plan the entire week ahead

#### 2. **Calendar Integration**
- View all time blocks in calendar format
- Rearrange tasks by dragging in calendar
- Visual timeline of the day

#### 3. **Task History & Streaks**
- See how many days in a row you completed a task
- View past completions
- Motivational insights

#### 4. **Navigation Between Dates**
- Arrow buttons to view yesterday/tomorrow
- Jump to specific dates
- Review past days

#### 5. **Bulk Scheduling**
- Schedule a recurring task for the week
- "Do this every day at 7am"
- Smart suggestions based on patterns

#### 6. **Task Notes & Details**
- Add descriptions to tasks
- Attach links or files
- More context per task

#### 7. **Completion Without Scheduling**
- Quick "Done" button
- Mark complete without time block
- For tasks that don't need scheduling

---

## 📐 Visual Flows

### Project → Task → Schedule → Complete

```
┌─────────────┐
│   PROJECT   │  User creates/opens project
│  "Morning   │
│   Routine"  │
└──────┬──────┘
       │
       │ User adds tasks
       ▼
┌─────────────┐
│    TASK     │  Tasks appear in project
│             │
│ ⚪ Meditate │  Status: Not scheduled
│ ⚪ Exercise │  Checkbox: Disabled
│ ⚪ Read     │
└──────┬──────┘
       │
       │ User drags to calendar
       ▼
┌─────────────┐
│  SCHEDULED  │  Time block created
│             │
│ ☐ Meditate  │  Status: Scheduled for today
│   7:00 AM   │  Checkbox: Active
└──────┬──────┘
       │
       │ User completes activity
       ▼
┌─────────────┐
│  COMPLETED  │  Task marked done
│             │
│ ✅ Meditate │  Status: Completed (today)
│   7:00 AM   │  Tomorrow: Resets to ⚪
└─────────────┘
```

---

### Daily Cycle (Recurring Task)

```
         MONDAY
           │
           │ User schedules & completes
           ▼
    ✅ Meditate (7am)
           │
           │ Day ends
           ▼
        TUESDAY
           │
           │ Fresh start
           ▼
    ⚪ Meditate (not scheduled)
           │
           │ User schedules & completes
           ▼
    ✅ Meditate (8am)
           │
           │ Day ends
           ▼
      WEDNESDAY
           │
         (repeat)
```

---

### One-Time Task Lifecycle

```
    USER CREATES TASK
           │
           ▼
    ⚪ Buy milk (appears)
           │
           ▼
    USER SCHEDULES (optional)
           │
           ▼
    ☐ Buy milk (2pm-3pm)
           │
           ▼
    USER COMPLETES
           │
           ▼
    ✅ Buy milk (done today)
           │
           │ Day ends
           ▼
    NEXT DAY: Task disappears
           │
           ▼
    (Task no longer visible)
```

---

## 🎯 Key Takeaways

### For Users:
1. **Simple Daily Planning** - Focus on what matters today
2. **No Overwhelm** - Only see today's tasks by default
3. **Flexible Scheduling** - Schedule only what you commit to
4. **Fresh Starts** - Every day is a new opportunity
5. **No Manual Cleanup** - Completed one-time tasks auto-remove

### For Product Team:
1. **MVP Focus** - Daily view only (no week/month views yet)
2. **Drag & Drop First** - Primary interaction for scheduling
3. **Smart Defaults** - 1-hour blocks, sensible behaviors
4. **Minimal Friction** - No forced scheduling, no guilt
5. **Clear Mental Model** - Projects → Tasks → Schedule → Complete

---

## 📞 Questions?

If anything is unclear or you have questions about these flows, please reach out to the product team.

**Document maintained by:** Product & Engineering Team
**Last reviewed:** January 2025
**Next review:** After MVP launch
