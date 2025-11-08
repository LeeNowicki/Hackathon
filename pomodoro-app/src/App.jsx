import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Task input state
  const [taskName, setTaskName] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [priority, setPriority] = useState('medium')
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1)

  // Tasks and session state
  const [tasks, setTasks] = useState([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null)
  const [completedTasks, setCompletedTasks] = useState([])

  // Timer state
  const [timerMode, setTimerMode] = useState('idle') // idle, work, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60) // in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [currentTaskPomodoros, setCurrentTaskPomodoros] = useState(0)

  // Pomodoro settings
  const WORK_DURATION = 25 * 60
  const SHORT_BREAK = 5 * 60
  const LONG_BREAK = 20 * 60
  const POMODOROS_UNTIL_LONG_BREAK = 4

  // Add a new task
  const addTask = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return

    const newTask = {
      id: Date.now(),
      name: taskName,
      difficulty,
      priority,
      estimatedPomodoros: parseInt(estimatedPomodoros),
      pomodorosSpent: 0,
      completed: false
    }

    setTasks([...tasks, newTask])
    setTaskName('')
    setEstimatedPomodoros(1)
  }

  // Start session with first task
  const startSession = () => {
    if (tasks.length === 0) return
    setCurrentTaskIndex(0)
    setTimerMode('work')
    setTimeLeft(WORK_DURATION)
    setIsRunning(true)
  }

  // Timer countdown effect
  useEffect(() => {
    let interval = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      handleTimerComplete()
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  // Handle timer completion
  const handleTimerComplete = () => {
    if (timerMode === 'work') {
      setPomodorosCompleted(prev => prev + 1)
      setCurrentTaskPomodoros(prev => prev + 1)

      // Update task pomodoros spent
      if (currentTaskIndex !== null) {
        const updatedTasks = [...tasks]
        updatedTasks[currentTaskIndex].pomodorosSpent += 1
        setTasks(updatedTasks)
      }

      // Determine next break type
      const nextBreakType = (pomodorosCompleted + 1) % POMODOROS_UNTIL_LONG_BREAK === 0
        ? 'longBreak'
        : 'shortBreak'

      setTimerMode(nextBreakType)
      setTimeLeft(nextBreakType === 'longBreak' ? LONG_BREAK : SHORT_BREAK)
    } else {
      // Break ended, back to work
      setTimerMode('work')
      setTimeLeft(WORK_DURATION)
    }
  }

  // Mark current task as complete and move to next
  const completeCurrentTask = () => {
    if (currentTaskIndex === null) return

    const completedTask = tasks[currentTaskIndex]
    setCompletedTasks([...completedTasks, completedTask])

    const remainingTasks = tasks.filter((_, idx) => idx !== currentTaskIndex)
    setTasks(remainingTasks)

    setCurrentTaskPomodoros(0)

    if (remainingTasks.length > 0) {
      setCurrentTaskIndex(0)
    } else {
      setCurrentTaskIndex(null)
      setIsRunning(false)
      setTimerMode('idle')
    }
  }

  // Skip to next task
  const skipToNextTask = () => {
    if (currentTaskIndex === null || currentTaskIndex >= tasks.length - 1) return
    setCurrentTaskIndex(currentTaskIndex + 1)
    setCurrentTaskPomodoros(0)
    setTimerMode('work')
    setTimeLeft(WORK_DURATION)
    setIsRunning(false)
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-blue-500',
      medium: 'bg-yellow-500',
      high: 'bg-orange-500',
      urgent: 'bg-red-500'
    }
    return colors[priority] || colors.medium
  }

  // Get difficulty badge
  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: '⭐',
      medium: '⭐⭐',
      hard: '⭐⭐⭐'
    }
    return badges[difficulty] || badges.medium
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          🎯 Pomodoro Study Timer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Task Input & List */}
          <div className="space-y-6">
            {/* Task Input Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Task</h2>
              <form onSubmit={addTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Study calculus chapter 5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="easy">Easy ⭐</option>
                      <option value="medium">Medium ⭐⭐</option>
                      <option value="hard">Hard ⭐⭐⭐</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Pomodoros
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={estimatedPomodoros}
                    onChange={(e) => setEstimatedPomodoros(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
                >
                  Add Task
                </button>
              </form>
            </div>

            {/* Task List */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Task Queue</h2>
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks yet. Add one to get started!</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        index === currentTaskIndex
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></span>
                            <h3 className="font-semibold text-gray-800">{task.name}</h3>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{getDifficultyBadge(task.difficulty)}</span>
                            <span>🍅 {task.pomodorosSpent}/{task.estimatedPomodoros}</span>
                          </div>
                        </div>
                        {index === currentTaskIndex && (
                          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            CURRENT
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tasks.length > 0 && currentTaskIndex === null && (
                <button
                  onClick={startSession}
                  className="w-full mt-4 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-lg"
                >
                  Start Study Session
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Timer & Session Info */}
          <div className="space-y-6">
            {/* Timer Display */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {timerMode === 'idle' && 'Ready to Start'}
                  {timerMode === 'work' && '💼 Focus Time'}
                  {timerMode === 'shortBreak' && '☕ Short Break'}
                  {timerMode === 'longBreak' && '🌟 Long Break'}
                </h2>

                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 my-8">
                  {formatTime(timeLeft)}
                </div>

                {currentTaskIndex !== null && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Task</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {tasks[currentTaskIndex]?.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Pomodoro {currentTaskPomodoros + 1} of {tasks[currentTaskIndex]?.estimatedPomodoros}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  {currentTaskIndex !== null && (
                    <>
                      <button
                        onClick={() => setIsRunning(!isRunning)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                      >
                        {isRunning ? '⏸ Pause' : '▶ Start'}
                      </button>

                      {timerMode === 'work' && (
                        <button
                          onClick={completeCurrentTask}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg"
                        >
                          ✓ Complete Task
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Session Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Session Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-600">{pomodorosCompleted}</p>
                  <p className="text-sm text-gray-600">Pomodoros Done</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-pink-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-600">Tasks Complete</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
                  <p className="text-sm text-gray-600">Tasks Remaining</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {Math.round((pomodorosCompleted * 25) / 60)}h {(pomodorosCompleted * 25) % 60}m
                  </p>
                  <p className="text-sm text-gray-600">Study Time</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Completed Tasks ✓</h2>
                <div className="space-y-2">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="font-semibold text-gray-800">{task.name}</p>
                      <p className="text-sm text-gray-600">
                        Completed in {task.pomodorosSpent} pomodoro{task.pomodorosSpent !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
