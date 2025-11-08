import { useState } from 'react';
import type { Task, StudySession } from './types';
import { TaskInputScreen } from './components/TaskInputScreen';
import { TimerScreen } from './components/TimerScreen';
import { createStudySession } from './services/claudeService';
import './App.css';

type Screen = 'input' | 'timer';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('input');
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [existingTasks, setExistingTasks] = useState<Task[]>([]);

  const handleStartSession = (tasks: Task[]) => {
    const session = createStudySession(tasks);
    setStudySession(session);
    setCurrentScreen('timer');
  };

  const handleReturnToDashboard = (remainingTasks: Task[]) => {
    setExistingTasks(remainingTasks);
    setCurrentScreen('input');
  };

  return (
    <div className="app">
      {currentScreen === 'input' ? (
        <TaskInputScreen
          onStartSession={handleStartSession}
          existingTasks={existingTasks}
        />
      ) : (
        studySession && (
          <TimerScreen
            initialTasks={studySession.tasklist}
            settings={studySession.pomodoro_settings}
            onReturnToDashboard={handleReturnToDashboard}
          />
        )
      )}
    </div>
  );
}

export default App;
