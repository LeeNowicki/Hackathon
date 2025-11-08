import type { Task, Priority, Difficulty } from '../types';

const priorityOrder: Record<Priority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3
};

const difficultyOrder: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2
};

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // First, sort by priority (urgent -> low)
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Within same priority, sort by difficulty (easy -> hard)
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  }).map((task, index) => ({
    ...task,
    order: index + 1
  }));
}

export function createEmptyTask(): Task {
  return {
    id: `task_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    name: '',
    estimated_pomodoros: 1,
    difficulty: 'medium',
    priority: 'medium',
    description: '',
    order: 0,
    completed: false,
    pomodoros_completed: 0
  };
}

export function reinsertIncompleteTask(tasks: Task[], incompleteTask: Task, currentIndex: number): Task[] {
  // Create a copy of the task with updated pomodoro count
  const updatedTask = {
    ...incompleteTask,
    pomodoros_completed: (incompleteTask.pomodoros_completed || 0) + 1,
    estimated_pomodoros: incompleteTask.estimated_pomodoros - 1
  };

  // Remove the current task and find a good position to reinsert
  const remainingTasks = tasks.slice(currentIndex + 1);

  // Find the last task with the same or higher priority
  let insertIndex = currentIndex + 1;
  for (let i = 0; i < remainingTasks.length; i++) {
    const task = remainingTasks[i];
    if (priorityOrder[task.priority] <= priorityOrder[updatedTask.priority]) {
      insertIndex = currentIndex + 1 + i + 1;
    } else {
      break;
    }
  }

  // Create new task list with the reinserted task
  const newTasks = [...tasks];
  newTasks.splice(insertIndex, 0, updatedTask);

  return newTasks;
}
