# 🎯 Pomodoro Study Timer

**BuildWithClaude Hackathon - Dartmouth 2025**

## Category: Academic Tools

## Problem Statement

Dartmouth students struggle with maintaining focus during long study sessions and often lack a structured approach to managing their academic tasks. While the Pomodoro Technique is an effective time management method, existing tools don't provide a seamless way to integrate task planning with timed study sessions.

## Solution

The Pomodoro Study Timer is a web application that streamlines the use of the Pomodoro technique for studying. It allows students to:

- **Input tasks** with difficulty levels, priority, and estimated time requirements
- **Automatically track** work sessions using the proven Pomodoro method (25-minute work blocks, 5-minute short breaks, 20-minute long breaks)
- **Monitor progress** with real-time statistics on completed tasks and study time
- **Stay focused** with a clean, distraction-free interface designed for extended study sessions

## Who It Helps

- **Dartmouth students** preparing for exams, working on problem sets, or managing multiple assignments
- **Anyone** looking to improve their study habits and time management skills
- **Students with ADHD** or focus challenges who benefit from structured work intervals

## Features

### Current MVP Features:
- ✅ Task input form with difficulty, priority, and time estimation
- ✅ Automated Pomodoro timer (25-5-20 minute intervals)
- ✅ Task queue visualization with current task highlighting
- ✅ Real-time session statistics (pomodoros completed, tasks finished, total study time)
- ✅ Task completion tracking
- ✅ Clean, futuristic UI with gradient design
- ✅ Fully responsive layout

### Future Enhancements:
- 🔮 AI-powered task scheduling using Claude API
- 🔮 Natural language task input
- 🔮 Drag-and-drop task reordering
- 🔮 User data persistence with Firebase
- 🔮 Break activity suggestions
- 🔮 Study session analytics and insights

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LeeNowicki/Hackathon.git
cd Hackathon/pomodoro-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## How to Use

1. **Add Tasks**: Enter your study tasks with names, difficulty levels, priorities, and estimated pomodoros needed
2. **Start Session**: Click "Start Study Session" to begin your first task
3. **Focus**: Work for 25 minutes during each Pomodoro
4. **Break**: Take a 5-minute break after each Pomodoro (20 minutes after every 4 Pomodoros)
5. **Complete**: Mark tasks as complete when finished and move to the next
6. **Track**: Monitor your progress with real-time statistics

## The Pomodoro Technique

1. Set the Pomodoro timer (25 minutes)
2. Work on the task until the timer rings
3. Take a short break (5 minutes)
4. After 4 Pomodoros, take a long break (20 minutes)

## Screenshots

*Clean, gradient interface designed for distraction-free studying*

## Hackathon Submission Checklist

- ✅ Working demo (not mockups or slides)
- ✅ Clear documentation of problem and solution
- ✅ Fits Academic Tools category
- ✅ Built using Claude Code
- ✅ Deployable on Vercel
- ✅ Solves real problem for Dartmouth students

## Authors

Built with Claude Code for the BuildWithClaude Hackathon at Dartmouth

## License

MIT License
