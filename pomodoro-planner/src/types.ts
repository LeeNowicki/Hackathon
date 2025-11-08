export type Difficulty = 'easy' | 'medium' | 'hard';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  name: string;
  estimated_pomodoros: number;
  difficulty: Difficulty;
  priority: Priority;
  description: string;
  reasoning?: string;
  order: number;
  completed?: boolean;
  pomodoros_completed?: number;
}

export interface PomodoroSettings {
  work_duration: number;
  short_break: number;
  long_break: number;
  pomodoros_until_long_break: number;
}

export interface StudySession {
  session_name: string;
  total_estimated_time: string;
  pomodoro_settings: PomodoroSettings;
  tasklist: Task[];
  scheduling_notes?: string;
}

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  currentPhase: 'work' | 'short_break' | 'long_break';
  pomodorosCompleted: number;
  currentTaskIndex: number;
}
