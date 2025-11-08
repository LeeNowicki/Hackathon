import type { Task, StudySession } from '../types';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function parseTasksWithClaude(plainText: string): Promise<Task[]> {
  const prompt = `You are an expert study planner using the Pomodoro Technique. Analyze the following task description(s) and convert them into a structured JSON array of tasks.

For each task, you must:
1. Determine the difficulty (easy/medium/hard) based on complexity and cognitive load
2. Assess the priority/urgency (low/medium/high/urgent) based on deadlines, importance, and dependencies
3. Estimate the number of pomodoros needed (25-minute work sessions)
4. Create a clear, concise task name
5. Provide a brief description
6. Explain your reasoning for the scheduling order

Consider these principles when sorting tasks:
- Urgent and high-priority tasks should generally come first
- Within the same urgency level, easier tasks can be placed first to build momentum, but balance this with importance
- Complex tasks benefit from being scheduled when energy is highest
- Similar tasks can be grouped for efficiency
- Consider cognitive load and variety to prevent fatigue

User's input:
${plainText}

Return ONLY a valid JSON array of task objects with this exact structure (no markdown, no explanation):
[
  {
    "id": "unique_id_1",
    "name": "Task name",
    "estimated_pomodoros": 2,
    "difficulty": "easy|medium|hard",
    "priority": "low|medium|high|urgent",
    "description": "Brief description of what needs to be done",
    "reasoning": "Why this task is scheduled at this position",
    "order": 1
  }
]

Important: Return ONLY the JSON array, nothing else.`;

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Extract JSON from the response (in case Claude adds any formatting)
    let jsonText = content.trim();

    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

    // Parse the JSON
    const tasks: Task[] = JSON.parse(jsonText);

    // Ensure all required fields are present and add defaults if needed
    return tasks.map((task, index) => ({
      ...task,
      id: task.id || `task_${Date.now()}_${index}`,
      completed: false,
      pomodoros_completed: 0
    }));
  } catch (error) {
    console.error('Error parsing tasks with Claude:', error);
    throw error;
  }
}

export function createStudySession(tasks: Task[]): StudySession {
  const totalPomodoros = tasks.reduce((sum, task) => sum + task.estimated_pomodoros, 0);
  const totalMinutes = totalPomodoros * 25;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    session_name: 'Study Session',
    total_estimated_time: `${hours}h ${minutes}m`,
    pomodoro_settings: {
      work_duration: 25,
      short_break: 5,
      long_break: 20,
      pomodoros_until_long_break: 4
    },
    tasklist: tasks,
    scheduling_notes: 'Tasks organized by urgency and difficulty for optimal productivity'
  };
}
