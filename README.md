# 🍅 Pomodoro Study Planner - AI-Powered Study Session Manager

[![BuildWithClaude](https://img.shields.io/badge/BuildWithClaude-Dartmouth%20Hackathon-orange)](https://www.anthropic.com/claude)

An intelligent study session planner that combines the proven Pomodoro Technique with AI-powered task analysis to help Dartmouth students maximize their productivity.

## 🎯 Problem Statement

Students often struggle with:
- **Overwhelming task lists** without clear prioritization
- **Poor time management** and procrastination
- **Difficulty estimating** how long tasks will take
- **Lack of structure** in study sessions
- **Burnout** from not taking proper breaks

## 💡 Solution

Pomodoro Study Planner uses Claude AI to intelligently analyze your tasks and create an optimized study schedule using the Pomodoro Technique. Simply describe what you need to do in plain English, and the app will:

1. **Analyze your tasks** considering difficulty, urgency, and estimated time
2. **Create an optimized schedule** that maximizes productivity
3. **Guide you through** structured work/break cycles
4. **Track progress** and handle incomplete tasks intelligently

## ✨ Features

### 🤖 AI-Powered Task Analysis
- Input tasks in **plain text** - no rigid formatting required
- Claude AI analyzes and prioritizes based on:
  - Urgency and importance
  - Task difficulty
  - Estimated time requirements
  - Optimal cognitive load distribution

### 📝 Flexible Task Input
- **Plain text mode**: Describe your tasks naturally
- **Manual mode**: Create detailed task cards with specific properties
- **Hybrid mode**: Combine both approaches

### ⏱️ Smart Pomodoro Timer
- Customizable work/break durations (default: 25/5/20 minutes)
- Visual timer with progress indicator
- Automatic phase transitions (work → short break → long break)
- Task completion tracking

### 📊 Intelligent Task Management
- **Smart sorting**: Tasks ordered by urgency, then difficulty
- **Incomplete task handling**: Automatically reinserted into queue
- **Progress tracking**: See completed vs. incomplete tasks
- **Session summary**: Detailed overview of your study session

### 🎨 Beautiful, Distraction-Free UI
- Clean, modern peachy-cream color scheme
- Relaxing aesthetic designed for focus
- Responsive design for all screen sizes
- Smooth animations and transitions

## 🏗️ Technology Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **AI Integration**: Claude 3.5 Sonnet API
- **Styling**: Custom CSS with modern design principles

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Hackathon.git
cd Hackathon/pomodoro-planner

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

The Claude API key is already configured in the application. For production use, you should move this to environment variables:

```env
VITE_CLAUDE_API_KEY=your_api_key_here
```

## 📱 How to Use

### 1. Create Your Study Session

**Option A: Plain Text Input**
```
- Study for biology exam on Friday (it's urgent!)
- Read chapters 5-7 for history class
- Complete math problem set, pretty easy
- Start working on English essay (due next week)
```

**Option B: Manual Task Cards**
- Click "Add Task"
- Fill in task details (name, description, priority, difficulty, estimated pomodoros)
- Repeat for all tasks

**Option C: Both**
- Use both methods simultaneously for maximum flexibility

### 2. Generate Study Session
Click "Generate Study Session" to let Claude AI:
- Analyze all your tasks
- Optimize the order for maximum productivity
- Create a structured timeline

### 3. Start Working
- Timer automatically starts with first task
- Work for 25 minutes (or your custom duration)
- Take breaks as prompted
- Mark tasks complete or incomplete after each pomodoro

### 4. Complete Session
- Review summary of completed/incomplete tasks
- Option to continue with remaining tasks in a new session

## 🎓 Hackathon Category: Academic Tools

This project fits into the **Academic Tools** category by providing:

- ✅ AI-powered study assistant
- ✅ Time management solution specifically for students
- ✅ Adaptive scheduling based on task complexity
- ✅ Focus-enhancing study structure
- ✅ Productivity tracking and insights

## 👥 Who This Helps

### Primary Users
- **Dartmouth students** managing multiple courses and assignments
- Students with **ADHD or focus challenges** who benefit from structure
- Anyone preparing for **exams** who needs efficient study scheduling
- Students **new to time management** techniques

### Use Cases
- Exam preparation with multiple topics
- Managing homework across different classes
- Research paper planning and execution
- Project work with varying difficulty levels
- Daily study routine optimization

## 🏆 Success Criteria

- ✅ **Working Demo**: Fully functional application (not mockups)
- ✅ **Clear Problem**: Addresses student time management and productivity
- ✅ **Real Solution**: Uses proven Pomodoro Technique + AI optimization
- ✅ **Deployable**: Built with Vite for easy deployment to Vercel/Render
- ✅ **Documentation**: Comprehensive README explaining problem and solution
- ✅ **Claude Integration**: Leverages Claude API for intelligent task analysis

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd pomodoro-planner
vercel
```

### Render

1. Create new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd pomodoro-planner
netlify deploy --prod
```

## 🔮 Future Enhancements

- **User authentication** and data persistence (Firebase)
- **Study statistics** and productivity insights
- **Task reordering** with drag-and-drop
- **Custom pomodoro settings** per task
- **Break suggestions** based on task difficulty
- **Integration** with Dartmouth Canvas
- **Mobile app** version
- **Collaboration features** for group study

## 📄 License

MIT License - feel free to use and modify for your needs!

## 🙏 Acknowledgments

- Built with [Claude](https://www.anthropic.com/claude) by Anthropic
- Inspired by the [Pomodoro Technique](https://francescocirillo.com/products/the-pomodoro-technique) by Francesco Cirillo
- Created for the BuildWithClaude: AI Tools for Dartmouth Hackathon

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for Dartmouth students**
