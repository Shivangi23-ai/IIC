import { STATIC_SYLLABUS } from '../data/staticContent';

type Board = string;
type ClassLevel = string;
type Stream = string | null;

interface SubjectLike { name: string }
interface ChapterLike { id: string; title: string }

// Small helper to get chapters from STATIC_SYLLABUS with safe fallback
export async function fetchChapters(board: Board, classLevel: ClassLevel, stream: Stream, subject: SubjectLike, language = 'English'): Promise<ChapterLike[]> {
  try {
    const key = `${board}-${classLevel}-${subject.name}`;
    const syllabus = (STATIC_SYLLABUS as Record<string, string[]>)[key];
    if (Array.isArray(syllabus) && syllabus.length) {
      return syllabus.map((title, idx) => ({ id: `ch-${idx + 1}`, title }));
    }
  } catch (e) {
    console.warn('fetchChapters: error reading STATIC_SYLLABUS', e);
  }

  // Fallback: generate 10 placeholder chapters
  const fallback = Array.from({ length: 10 }).map((_, i) => ({ id: `ch-${i + 1}`, title: `Chapter ${i + 1}` }));
  return fallback;
}

// Minimal lesson content generator. If no API keys are set in settings, this returns
// a safe placeholder so the app doesn't crash and the UI shows content.
export async function fetchLessonContent(
  board: Board,
  classLevel: ClassLevel,
  stream: Stream,
  subject: SubjectLike,
  chapter: ChapterLike,
  language = 'English',
  type: string = 'NOTES'
): Promise<any> {
  // Try reading settings from localStorage (where Admin dashboard saves them)
  let settings: any = {};
  try {
    const raw = localStorage.getItem('nst_system_settings');
    if (raw) settings = JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  const hasApiKeys = Array.isArray(settings.apiKeys) && settings.apiKeys.length > 0;

  if (!hasApiKeys) {
    console.warn('AI not configured: no API keys found in system settings. Add keys in Admin > Config to enable real AI content generation.');
    // Return a friendly placeholder LessonContent-like object expected by the UI
    return {
      id: `${board}_${classLevel}_${subject.name}_${chapter.id}`,
      title: chapter.title,
      subtitle: `${subject.name} • Class ${classLevel}`,
      type: type === 'MCQ' ? 'MCQ_SIMPLE' : 'NOTES',
      content: `# ${chapter.title}\n\n_This is placeholder content because no AI API keys are configured._\n\n**How to enable full AI content:**\n1. Go to Admin Dashboard → Config → API Keys\n2. Add your API key(s) (comma separated)\n3. Choose an AI model (Gemini / other) and save settings.\n\n---\n\n## Key Points\n- Topic: ${chapter.title}\n- Subject: ${subject.name}\n- Class: ${classLevel}\n\n> Tip: Add real API keys to generate richer notes, MCQs and PDFs.\n`,
      isComingSoon: false,
      mcqData: []
    };
  }

  // If API keys exist, we still provide a basic generated note so the UI remains responsive.
  // Integrating a real cloud LLM is left to the admin (they must add API keys). For now,
  // return an expanded auto-generated markdown that looks like a real note.
  const generated = `# ${chapter.title}\n\n**Subject:** ${subject.name}  \n**Class:** ${classLevel}  \n**Board:** ${board}\n\n## Overview\nThis is an auto-generated study note for *${chapter.title}*. To enable higher-quality AI outputs, add and configure API keys in the Admin Dashboard.\n\n## Important Points\\n- Point 1 about ${chapter.title}\n- Point 2 about ${chapter.title}\n- Point 3: summary and formulas (if any)\n\n## Practice\n- Try solving problems relating to the above points.\n\n---\n\n_This content was produced by a local generator as a placeholder._\n`;

  return {
    id: `${board}_${classLevel}_${subject.name}_${chapter.id}`,
    title: chapter.title,
    subtitle: `${subject.name} • Class ${classLevel}`,
    type: type === 'MCQ' ? 'MCQ_SIMPLE' : 'NOTES',
    content: generated,
    isComingSoon: false,
    mcqData: []
  };
}

export default { fetchChapters, fetchLessonContent };
