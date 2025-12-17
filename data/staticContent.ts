import { ContentType, MCQItem } from '../types';

export interface StaticContentItem {
  board: string;
  classLevel: string;
  stream?: string; // Optional for 6-10
  subject: string;
  chapterId: string; // e.g., '1', '2' or 'ch-1' matching the ID logic
  type: ContentType;
  title?: string; // Optional override
  content?: string; // Link or Text
  mcqData?: MCQItem[]; // For MCQs
}

// ==========================================================================================
// 📝 EDIT THIS FILE TO ADD PERMANENT LINKS (VISSIBLE TO ALL USERS)
// ==========================================================================================
// Examples:
// {
//   board: 'CBSE', classLevel: '10', subject: 'Mathematics', chapterId: 'ch-1',
//   type: 'PDF_FREE',
//   content: 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing'
// },
// {
//   board: 'CBSE', classLevel: '12', stream: 'Science', subject: 'Physics', chapterId: 'ch-2',
//   type: 'PDF_PREMIUM',
//   content: 'https://example.com/premium-notes.pdf'
// }
// ==========================================================================================

export const STATIC_CONTENT: StaticContentItem[] = [
    // Add your links here...
];
