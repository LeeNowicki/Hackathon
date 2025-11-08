# 🍅 Pomodoro Study Planner

AI-powered study session manager using the Pomodoro Technique.

## Features

- **AI Task Analysis**: Paste your tasks in plain text, and Claude AI will analyze and prioritize them
- **Flexible Input**: Manual task cards or plain text - your choice
- **Smart Scheduling**: Tasks ordered by urgency and difficulty for optimal productivity
- **Pomodoro Timer**: Structured 25-minute work sessions with automatic breaks
- **Progress Tracking**: Mark tasks complete or incomplete, with intelligent re-insertion

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and add your Claude API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your Claude API key:

```env
VITE_CLAUDE_API_KEY=your_api_key_here
```

Get your API key from [Claude Console](https://console.anthropic.com/).

### 3. Run Development Server

```bash
npm run dev
```

Open your browser to the URL shown (typically `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## How to Use

1. **Enter Tasks**: Type your tasks in plain text or add them manually with the "Add Task" button
2. **Generate Session**: Click "Generate Study Session" to let AI optimize your schedule
3. **Start Working**: Follow the Pomodoro timer through work and break cycles
4. **Track Progress**: Mark tasks as complete or incomplete after each pomodoro

## Technology Stack

- React + TypeScript
- Vite
- Claude 3.5 Sonnet API
- Custom CSS

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Render

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## License

MIT
