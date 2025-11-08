import { useState, useEffect } from 'react'
import './App.css'

// Helper functions
const getPriorityColor = (priority) => {
  const colors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    urgent: 'bg-red-500'
  }
  return colors[priority] || colors.medium
}

const getDifficultyBadge = (difficulty) => {
  const badges = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐'
  }
  return badges[difficulty] || badges.medium
}

// Dashboard Screen Component
const DashboardScreen = ({
  inputMode,
  setInputMode,
  taskName,
  setTaskName,
  difficulty,
  setDifficulty,
  priority,
  setPriority,
  estimatedPomodoros,
  setEstimatedPomodoros,
  plaintextInput,
  setPlaintextInput,
  addTask,
  tasks,
  startSession
}) => (
  <div className="min-h-screen p-8">
    <div className="max-w-6xl mx-auto">
      {/* Header with Icon and Title */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg" style={{boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'}}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path strokeWidth="2" d="M12 6v6l4 2"/>
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-gray-800">
          Pomodoro Study Planner
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Task Input */}
        <div className="space-y-6">
          {/* Input Mode Toggle */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setInputMode('task-by-task')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  inputMode === 'task-by-task'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Task by Task
              </button>
              <button
                onClick={() => setInputMode('plaintext')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  inputMode === 'plaintext'
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Plain Text
              </button>
            </div>

            {inputMode === 'task-by-task' ? (
              <form onSubmit={addTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Name
                  </label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
                >
                  Add Task
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your tasks in plain text
                  </label>
                  <textarea
                    value={plaintextInput}
                    onChange={(e) => setPlaintextInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-48 resize-none"
                    placeholder="Example:&#10;- Study calculus (hard, urgent)&#10;- Review biology notes (easy)&#10;- Work on CS assignment (medium, high priority)&#10;&#10;Note: AI parsing coming soon!"
                  />
                </div>
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
                >
                  AI Parsing - Coming Soon
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Task Queue */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Task Queue</h2>
              <span className="text-sm text-gray-500">Sorted by priority & difficulty</span>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500">No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg border-2 border-gray-200 bg-orange-50/50 hover:border-orange-300 transition-all"
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
                            <span className="text-xs font-medium text-orange-600 uppercase">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-gray-400">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startSession}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
                >
                  Start Study Session
                </button>
              </>
            )}
          </div>

          {/* Session Stats Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Session Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-600">{tasks.length}</p>
                <p className="text-sm text-gray-600">Tasks Queued</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-600">
                  {tasks.reduce((sum, task) => sum + task.estimatedPomodoros, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Pomodoros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Timer Screen Component
const TimerScreen = ({
  returnToDashboard,
  timerMode,
  timeLeft,
  formatTime,
  currentTaskIndex,
  tasks,
  currentTaskPomodoros,
  isRunning,
  setIsRunning,
  completeCurrentTask,
  pomodorosCompleted,
  completedTasks
}) => (
  <div className="min-h-screen p-8">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg" style={{boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'}}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <path strokeWidth="2" d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Focus Session</h1>
        </div>
        <button
          onClick={returnToDashboard}
          className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-2xl p-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {timerMode === 'idle' && '⏱️ Ready to Start'}
                {timerMode === 'work' && '💼 Focus Time'}
                {timerMode === 'shortBreak' && '☕ Short Break'}
                {timerMode === 'longBreak' && '🌟 Long Break'}
              </h2>

              <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 my-12">
                {formatTime(timeLeft)}
              </div>

              {currentTaskIndex !== null && tasks[currentTaskIndex] && (
                <div className="mb-8 p-6 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <p className="text-sm text-gray-600 mb-1">Current Task</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {tasks[currentTaskIndex]?.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Pomodoro {currentTaskPomodoros + 1} of {tasks[currentTaskIndex]?.estimatedPomodoros}
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                {currentTaskIndex !== null && (
                  <>
                    <button
                      onClick={() => setIsRunning(!isRunning)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-10 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg text-lg"
                    >
                      {isRunning ? '⏸ Pause' : '▶ Start'}
                    </button>

                    {timerMode === 'work' && (
                      <button
                        onClick={completeCurrentTask}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-10 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg text-lg"
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
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Session Progress</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-orange-600">{pomodorosCompleted}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-pink-600">{completedTasks.length}</p>
                <p className="text-xs text-gray-600">Tasks Done</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
                <p className="text-xs text-gray-600">Remaining</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">
                  {Math.floor((pomodorosCompleted * 25) / 60)}h{(pomodorosCompleted * 25) % 60}m
                </p>
                <p className="text-xs text-gray-600">Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Task Queue & Completed */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Up Next</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">All tasks completed! 🎉</p>
            ) : (
              <div className="space-y-2">
                {tasks.slice(0, 5).map((task, index) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg text-sm ${
                      index === currentTaskIndex
                        ? 'bg-orange-100 border-2 border-orange-400'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></span>
                      <p className="font-semibold text-gray-800 text-xs line-clamp-1">{task.name}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {getDifficultyBadge(task.difficulty)} · {task.estimatedPomodoros} pomodoros
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Completed ✓</h2>
              <div className="space-y-2">
                {completedTasks.slice(-5).reverse().map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="font-semibold text-gray-800 text-xs line-clamp-1">{task.name}</p>
                    <p className="text-xs text-gray-600">
                      {task.pomodorosSpent} pomodoro{task.pomodorosSpent !== 1 ? 's' : ''}
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

// Main App Component
function App() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [inputMode, setInputMode] = useState('task-by-task')

  // Task input state
  const [taskName, setTaskName] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [priority, setPriority] = useState('medium')
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1)
  const [plaintextInput, setPlaintextInput] = useState('')

  // Tasks and session state
  const [tasks, setTasks] = useState([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null)
  const [completedTasks, setCompletedTasks] = useState([])

  // Timer state
  const [timerMode, setTimerMode] = useState('idle')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0)
  const [currentTaskPomodoros, setCurrentTaskPomodoros] = useState(0)

  // Pomodoro settings
  const WORK_DURATION = 25 * 60
  const SHORT_BREAK = 5 * 60
  const LONG_BREAK = 20 * 60
  const POMODOROS_UNTIL_LONG_BREAK = 4

  // Priority order for sorting
  const priorityOrder = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1
  }

  const difficultyOrder = {
    hard: 3,
    medium: 2,
    easy: 1
  }

  // Sort tasks by urgency then difficulty
  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
    })
  }

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

    const updatedTasks = sortTasks([...tasks, newTask])
    setTasks(updatedTasks)
    setTaskName('')
    setEstimatedPomodoros(1)
  }

  // Start session with first task
  const startSession = () => {
    if (tasks.length === 0) return
    setCurrentScreen('timer')
    setCurrentTaskIndex(0)
    setTimerMode('work')
    setTimeLeft(WORK_DURATION)
    setIsRunning(true)
  }

  // Return to dashboard
  const returnToDashboard = () => {
    setIsRunning(false)
    setCurrentScreen('dashboard')
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

      if (currentTaskIndex !== null) {
        const updatedTasks = [...tasks]
        updatedTasks[currentTaskIndex].pomodorosSpent += 1
        setTasks(updatedTasks)
      }

      const nextBreakType = (pomodorosCompleted + 1) % POMODOROS_UNTIL_LONG_BREAK === 0
        ? 'longBreak'
        : 'shortBreak'

      setTimerMode(nextBreakType)
      setTimeLeft(nextBreakType === 'longBreak' ? LONG_BREAK : SHORT_BREAK)
    } else {
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

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return currentScreen === 'dashboard' ? (
    <DashboardScreen
      inputMode={inputMode}
      setInputMode={setInputMode}
      taskName={taskName}
      setTaskName={setTaskName}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      priority={priority}
      setPriority={setPriority}
      estimatedPomodoros={estimatedPomodoros}
      setEstimatedPomodoros={setEstimatedPomodoros}
      plaintextInput={plaintextInput}
      setPlaintextInput={setPlaintextInput}
      addTask={addTask}
      tasks={tasks}
      startSession={startSession}
    />
  ) : (
    <TimerScreen
      returnToDashboard={returnToDashboard}
      timerMode={timerMode}
      timeLeft={timeLeft}
      formatTime={formatTime}
      currentTaskIndex={currentTaskIndex}
      tasks={tasks}
      currentTaskPomodoros={currentTaskPomodoros}
      isRunning={isRunning}
      setIsRunning={setIsRunning}
      completeCurrentTask={completeCurrentTask}
      pomodorosCompleted={pomodorosCompleted}
      completedTasks={completedTasks}
    />
  )
}

export default App
