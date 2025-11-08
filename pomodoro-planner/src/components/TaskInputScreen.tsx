import React, { useState } from 'react';
import type { Task, Difficulty, Priority } from '../types';
import { createEmptyTask, sortTasks } from '../services/taskService';
import { parseTasksWithClaude } from '../services/claudeService';
import './TaskInputScreen.css';

interface TaskInputScreenProps {
  onStartSession: (tasks: Task[]) => void;
  existingTasks?: Task[];
}

export const TaskInputScreen: React.FC<TaskInputScreenProps> = ({ onStartSession, existingTasks = [] }) => {
  const [plainText, setPlainText] = useState('');
  const [manualTasks, setManualTasks] = useState<Task[]>(existingTasks.length > 0 ? existingTasks : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'plain' | 'manual'>('both');

  const addEmptyTask = () => {
    setManualTasks([...manualTasks, createEmptyTask()]);
  };

  const updateTask = (index: number, field: keyof Task, value: any) => {
    const updated = [...manualTasks];
    updated[index] = { ...updated[index], [field]: value };
    setManualTasks(updated);
  };

  const removeTask = (index: number) => {
    setManualTasks(manualTasks.filter((_, i) => i !== index));
  };

  const handleGenerateSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let allTasks: Task[] = [...manualTasks];

      // Parse plain text if provided
      if (plainText.trim()) {
        const parsedTasks = await parseTasksWithClaude(plainText);
        allTasks = [...allTasks, ...parsedTasks];
      }

      // Filter out empty tasks
      allTasks = allTasks.filter(task => task.name.trim() !== '');

      if (allTasks.length === 0) {
        setError('Please add at least one task or enter plain text to analyze');
        setIsLoading(false);
        return;
      }

      // Sort tasks by priority and difficulty
      const sortedTasks = sortTasks(allTasks);

      onStartSession(sortedTasks);
    } catch (err) {
      console.error('Error generating session:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate study session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="task-input-screen">
      <div className="header">
        <div className="icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1>Pomodoro Study Planner</h1>
        <p className="subtitle">Plan your study session with AI-powered task analysis</p>
      </div>

      <div className="tab-selector">
        <button
          className={activeTab === 'both' ? 'active' : ''}
          onClick={() => setActiveTab('both')}
        >
          Both
        </button>
        <button
          className={activeTab === 'plain' ? 'active' : ''}
          onClick={() => setActiveTab('plain')}
        >
          Plain Text
        </button>
        <button
          className={activeTab === 'manual' ? 'active' : ''}
          onClick={() => setActiveTab('manual')}
        >
          Task List
        </button>
      </div>

      <div className="input-container">
        {(activeTab === 'both' || activeTab === 'plain') && (
          <div className="plain-text-section">
            <h2>Describe Your Tasks</h2>
            <p className="section-description">
              Enter your tasks in plain text. Our AI will analyze and organize them for optimal productivity.
            </p>
            <textarea
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Example:&#10;- Study for biology exam on Friday (it's important!)&#10;- Read chapters 5-7 for history class&#10;- Complete math problem set, it's pretty easy&#10;- Start working on English essay (due next week)"
              rows={8}
            />
          </div>
        )}

        {(activeTab === 'both' || activeTab === 'manual') && (
          <div className="manual-tasks-section">
            <div className="section-header">
              <h2>Manual Task Entry</h2>
              <button className="add-task-btn" onClick={addEmptyTask}>
                + Add Task
              </button>
            </div>
            <p className="section-description">
              Add tasks one by one with specific details for precise control.
            </p>

            <div className="tasks-list">
              {manualTasks.map((task, index) => (
                <div key={task.id} className="task-card">
                  <div className="task-card-header">
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => updateTask(index, 'name', e.target.value)}
                      placeholder="Task name"
                      className="task-name-input"
                    />
                    <button
                      className="remove-task-btn"
                      onClick={() => removeTask(index)}
                      title="Remove task"
                    >
                      ×
                    </button>
                  </div>

                  <textarea
                    value={task.description}
                    onChange={(e) => updateTask(index, 'description', e.target.value)}
                    placeholder="Description (optional)"
                    className="task-description-input"
                    rows={2}
                  />

                  <div className="task-properties">
                    <div className="property">
                      <label>Priority</label>
                      <select
                        value={task.priority}
                        onChange={(e) => updateTask(index, 'priority', e.target.value as Priority)}
                      >
                        <option value="urgent">Urgent</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>

                    <div className="property">
                      <label>Difficulty</label>
                      <select
                        value={task.difficulty}
                        onChange={(e) => updateTask(index, 'difficulty', e.target.value as Difficulty)}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="property">
                      <label>Pomodoros</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={task.estimated_pomodoros}
                        onChange={(e) => updateTask(index, 'estimated_pomodoros', parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {manualTasks.length === 0 && (
                <div className="empty-state">
                  <p>No tasks added yet. Click "Add Task" to create your first task.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="action-section">
        <button
          className="generate-btn"
          onClick={handleGenerateSession}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Analyzing Tasks...
            </>
          ) : (
            'Generate Study Session'
          )}
        </button>
      </div>
    </div>
  );
};
