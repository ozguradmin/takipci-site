import fs from 'fs';
import path from 'path';

interface VideoRanking {
  id: number;
  username: string;
  profile_picture_url: string | null;
  rank: number;
}

interface Video {
  video_date: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
}

interface StaticData {
  video: Video;
  rankings: VideoRanking[];
  generated_at: string;
  total_rankings: number;
}

// Get static data from JSON files
export function getStaticData(): StaticData | null {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', 'rankings.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading static data:', error);
    return null;
  }
}

// Get static data for specific video date
export function getStaticDataForDate(date: string): StaticData | null {
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data', `rankings-${date}.json`);
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading static data for date ${date}:`, error);
    return null;
  }
}

// Get all available video dates
export function getAvailableVideoDates(): string[] {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data');
    const files = fs.readdirSync(dataDir);
    
    return files
      .filter(file => file.startsWith('rankings-') && file.endsWith('.json'))
      .map(file => file.replace('rankings-', '').replace('.json', ''))
      .sort()
      .reverse(); // Latest first
  } catch (error) {
    console.error('Error reading available dates:', error);
    return [];
  }
}

// Format date for URL (DD-MM-YYYY)
export function formatDateForUrl(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

// Format date for display (DD.MM.YYYY)
export function formatDateForDisplay(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}
