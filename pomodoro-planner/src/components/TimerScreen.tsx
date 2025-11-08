import React, { useState, useEffect, useRef } from 'react';
import type { Task, PomodoroSettings, TimerState } from '../types';
import { reinsertIncompleteTask } from '../services/taskService';
import './TimerScreen.css';

interface TimerScreenProps {
  initialTasks: Task[];
  settings: PomodoroSettings;
  onReturnToDashboard: (remainingTasks: Task[]) => void;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({
  initialTasks,
  settings,
  onReturnToDashboard
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: settings.work_duration * 60,
    currentPhase: 'work',
    pomodorosCompleted: 0,
    currentTaskIndex: 0
  });
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentTaskPomodoros, setCurrentTaskPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const currentTask = tasks[currentTaskIndex];
  const isSessionComplete = currentTaskIndex >= tasks.length;

  useEffect(() => {
    if (timerState.isRunning && timerState.timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (timerState.timeRemaining === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.timeRemaining]);

  const handleTimerComplete = () => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timerState.currentPhase === 'work') {
      // Work session completed, show completion modal
      setCurrentTaskPomodoros(prev => prev + 1);
      setShowCompletionModal(true);
    } else {
      // Break completed, move to next work session
      moveToNextPhase();
    }
  };

  const handleTaskComplete = () => {
    // Mark task as completed
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = {
      ...updatedTasks[currentTaskIndex],
      completed: true
    };
    setTasks(updatedTasks);
    setShowCompletionModal(false);
    setCurrentTaskPomodoros(0);

    // Move to next task
    setCurrentTaskIndex(prev => prev + 1);
    moveToNextPhase();
  };

  const handleTaskIncomplete = () => {
    setShowCompletionModal(false);

    // Check if task still has pomodoros remaining
    const remainingPomodoros = currentTask.estimated_pomodoros - currentTaskPomodoros;

    if (remainingPomodoros > 0) {
      // Reinsert task later in the queue
      const updatedTasks = reinsertIncompleteTask(tasks, currentTask, currentTaskIndex);
      setTasks(updatedTasks);
    } else {
      // Task had only 1 pomodoro, mark as incomplete and move on
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = {
        ...updatedTasks[currentTaskIndex],
        completed: false
      };
      setTasks(updatedTasks);
    }

    setCurrentTaskPomodoros(0);
    // Move to next task (or the one after the current if we reinserted)
    setCurrentTaskIndex(prev => prev + 1);
    moveToNextPhase();
  };

  const moveToNextPhase = () => {
    const completedPomodoros = timerState.pomodorosCompleted + 1;
    let nextPhase: 'work' | 'short_break' | 'long_break' = 'work';
    let nextDuration = settings.work_duration * 60;

    // Determine next phase
    if (timerState.currentPhase === 'work') {
      if (completedPomodoros % settings.pomodoros_until_long_break === 0) {
        nextPhase = 'long_break';
        nextDuration = settings.long_break * 60;
      } else {
        nextPhase = 'short_break';
        nextDuration = settings.short_break * 60;
      }
    } else {
      nextPhase = 'work';
      nextDuration = settings.work_duration * 60;
    }

    setTimerState({
      isRunning: false,
      timeRemaining: nextDuration,
      currentPhase: nextPhase,
      pomodorosCompleted: nextPhase === 'work' ? completedPomodoros : timerState.pomodorosCompleted,
      currentTaskIndex: currentTaskIndex
    });
  };

  const toggleTimer = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const skipToNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setCurrentTaskPomodoros(0);
      setTimerState({
        isRunning: false,
        timeRemaining: settings.work_duration * 60,
        currentPhase: 'work',
        pomodorosCompleted: timerState.pomodorosCompleted,
        currentTaskIndex: currentTaskIndex + 1
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseLabel = (): string => {
    switch (timerState.currentPhase) {
      case 'work':
        return 'Work Session';
      case 'short_break':
        return 'Short Break';
      case 'long_break':
        return 'Long Break';
    }
  };

  const getPhaseColor = (): string => {
    switch (timerState.currentPhase) {
      case 'work':
        return '#FF8C00';
      case 'short_break':
        return '#4CAF50';
      case 'long_break':
        return '#2196F3';
    }
  };

  const calculateProgress = (): number => {
    const totalDuration = timerState.currentPhase === 'work'
      ? settings.work_duration * 60
      : timerState.currentPhase === 'short_break'
        ? settings.short_break * 60
        : settings.long_break * 60;
    return ((totalDuration - timerState.timeRemaining) / totalDuration) * 100;
  };

  if (isSessionComplete) {
    const completedTasks = tasks.filter(t => t.completed);
    const incompleteTasks = tasks.filter(t => !t.completed);

    return (
      <div className="timer-screen">
        <div className="session-complete">
          <div className="completion-icon">✓</div>
          <h1>Session Complete!</h1>
          <div className="session-summary">
            <h2>Summary</h2>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-value">{completedTasks.length}</span>
                <span className="stat-label">Tasks Completed</span>
              </div>
              <div className="stat">
                <span className="stat-value">{timerState.pomodorosCompleted}</span>
                <span className="stat-label">Pomodoros</span>
              </div>
              <div className="stat">
                <span className="stat-value">{incompleteTasks.length}</span>
                <span className="stat-label">Incomplete</span>
              </div>
            </div>

            {completedTasks.length > 0 && (
              <div className="completed-tasks">
                <h3>Completed Tasks</h3>
                <ul>
                  {completedTasks.map(task => (
                    <li key={task.id}>✓ {task.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {incompleteTasks.length > 0 && (
              <div className="incomplete-tasks">
                <h3>Incomplete Tasks</h3>
                <ul>
                  {incompleteTasks.map(task => (
                    <li key={task.id}>○ {task.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            className="return-btn"
            onClick={() => onReturnToDashboard(incompleteTasks)}
          >
            {incompleteTasks.length > 0 ? 'Plan Next Session' : 'Create New Session'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="timer-screen">
      <div className="timer-header">
        <button className="back-btn" onClick={() => onReturnToDashboard(tasks.slice(currentTaskIndex))}>
          ← Back to Dashboard
        </button>
        <div className="session-progress">
          Task {currentTaskIndex + 1} of {tasks.length} • Pomodoro #{timerState.pomodorosCompleted + 1}
        </div>
      </div>

      <div className="timer-main">
        <div className="phase-indicator" style={{ background: getPhaseColor() }}>
          {getPhaseLabel()}
        </div>

        <div className="current-task-display">
          <h2>{currentTask.name}</h2>
          {currentTask.description && (
            <p className="task-description">{currentTask.description}</p>
          )}
          <div className="task-meta">
            <span className={`badge priority-${currentTask.priority}`}>
              {currentTask.priority}
            </span>
            <span className={`badge difficulty-${currentTask.difficulty}`}>
              {currentTask.difficulty}
            </span>
            <span className="badge">
              {currentTaskPomodoros}/{currentTask.estimated_pomodoros} pomodoros
            </span>
          </div>
        </div>

        <div className="timer-display">
          <div className="timer-circle">
            <svg className="timer-progress" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#FFE4CC"
                strokeWidth="8"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={getPhaseColor()}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - calculateProgress() / 100)}`}
                transform="rotate(-90 100 100)"
                strokeLinecap="round"
              />
            </svg>
            <div className="timer-time">
              {formatTime(timerState.timeRemaining)}
            </div>
          </div>
        </div>

        <div className="timer-controls">
          <button
            className="control-btn primary"
            onClick={toggleTimer}
          >
            {timerState.isRunning ? 'Pause' : 'Start'}
          </button>
          {currentTaskIndex < tasks.length - 1 && (
            <button
              className="control-btn secondary"
              onClick={skipToNextTask}
            >
              Skip Task
            </button>
          )}
        </div>

        <div className="upcoming-tasks">
          <h3>Upcoming Tasks</h3>
          <div className="task-queue">
            {tasks.slice(currentTaskIndex + 1, currentTaskIndex + 4).map((task, idx) => (
              <div key={task.id} className="queue-item">
                <span className="queue-number">{currentTaskIndex + idx + 2}</span>
                <span className="queue-name">{task.name}</span>
                <span className="queue-pomodoros">{task.estimated_pomodoros}🍅</span>
              </div>
            ))}
            {tasks.length > currentTaskIndex + 4 && (
              <div className="queue-item more">
                +{tasks.length - currentTaskIndex - 4} more tasks
              </div>
            )}
          </div>
        </div>
      </div>

      {showCompletionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Pomodoro Complete!</h2>
            <p>Did you complete this task?</p>
            <div className="task-preview">
              <strong>{currentTask.name}</strong>
              <span>Pomodoro {currentTaskPomodoros}/{currentTask.estimated_pomodoros}</span>
            </div>
            <div className="modal-actions">
              <button className="modal-btn complete" onClick={handleTaskComplete}>
                ✓ Completed
              </button>
              <button className="modal-btn incomplete" onClick={handleTaskIncomplete}>
                Continue Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
