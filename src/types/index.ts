// ==========================================
// GLORY - Church Management Platform Types
// ==========================================

// ---- Auth & Users ----
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'pastor' | 'leader' | 'member' | 'visitor';
  churchId: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  joinedAt: string;
  groups: string[];
}

// ---- Church / Multi-gestão ----
export interface Church {
  id: string;
  name: string;
  denomination?: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  pastorName: string;
  memberCount: number;
  createdAt: string;
  parentChurchId?: string;
}

// ---- Groups ----
export interface Group {
  id: string;
  name: string;
  description: string;
  type: 'cell' | 'ministry' | 'department' | 'youth' | 'children' | 'worship' | 'other';
  leaderId: string;
  leaderName: string;
  memberCount: number;
  avatar?: string;
  churchId: string;
  createdAt: string;
}

// ---- Timeline ----
export interface TimelinePost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  type: 'news' | 'event' | 'devotional' | 'highlight' | 'announcement';
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  createdAt: string;
  churchId: string;
  groupId?: string;
}

// ---- Messages / Palavras ----
export interface Message {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'audio' | 'video';
  content?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  speaker: string;
  duration?: string;
  category: string;
  views: number;
  createdAt: string;
  churchId: string;
}

// ---- Pages ----
export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: 'institutional' | 'ministry' | 'team' | 'custom';
  published: boolean;
  churchId: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Events / Calendar ----
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  type: 'worship' | 'conference' | 'training' | 'meeting' | 'social' | 'youth' | 'other';
  imageUrl?: string;
  registrationEnabled: boolean;
  registrationLimit?: number;
  registeredCount: number;
  price?: number;
  churchId: string;
  groupId?: string;
}

// ---- Banners ----
export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  videoUrl?: string;
  active: boolean;
  order: number;
  startDate: string;
  endDate: string;
  churchId: string;
}

// ---- Live Streaming ----
export interface LiveStream {
  id: string;
  title: string;
  description: string;
  streamUrl: string;
  thumbnailUrl?: string;
  isLive: boolean;
  viewerCount: number;
  startedAt?: string;
  churchId: string;
  groupId?: string;
}

// ---- Bible ----
export interface BibleBook {
  id: number;
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'old' | 'new';
}

export interface BibleVerse {
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

// ---- Notes ----
export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'worship' | 'training' | 'discipleship' | 'personal' | 'other';
  userId: string;
  createdAt: string;
  updatedAt: string;
  synced: boolean;
}

// ---- Donations ----
export interface Donation {
  id: string;
  userId: string;
  userName: string;
  type: 'tithe' | 'offering' | 'campaign' | 'event' | 'other';
  amount: number;
  method: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer' | 'cash';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference?: string;
  createdAt: string;
  churchId: string;
}

// ---- Financial ----
export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  tithes: number;
  offerings: number;
  eventRegistrations: number;
  campaigns: number;
  period: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  churchId: string;
}

// ---- Notifications ----
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  type: 'general' | 'event' | 'prayer' | 'donation' | 'group';
  sentAt: string;
  readCount: number;
  totalSent: number;
  churchId: string;
  groupId?: string;
}

// ---- Prayer Requests ----
export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  request: string;
  isAnonymous: boolean;
  status: 'pending' | 'praying' | 'answered';
  prayerCount: number;
  intercessors: string[];
  createdAt: string;
  churchId: string;
}

// ---- Downloads / Ebooks ----
export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  type: 'ebook' | 'study' | 'article' | 'manual' | 'other';
  fileUrl: string;
  fileSize: string;
  format: 'pdf' | 'epub' | 'docx' | 'mp3' | 'mp4';
  downloadCount: number;
  groupId?: string;
  churchId: string;
  createdAt: string;
}

// ---- Members ----
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'admin' | 'pastor' | 'leader' | 'member' | 'visitor';
  status: 'active' | 'inactive' | 'transferred';
  birthDate: string;
  address: string;
  city: string;
  state: string;
  baptismDate?: string;
  memberSince: string;
  groups: string[];
  churchId: string;
  notes?: string;
}

// ---- Dashboard Stats ----
export interface DashboardStats {
  totalMembers: number;
  activeGroups: number;
  upcomingEvents: number;
  monthlyDonations: number;
  prayerRequests: number;
  newMembers: number;
  liveViewers: number;
  pushSent: number;
}

// ---- Devotionals ----
export interface Devotional {
  id: string;
  title: string;
  verse: string;
  verseReference: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  likes: number;
  churchId: string;
}

// ---- Check-in / Attendance ----
export interface CheckIn {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  totalAttendees: number;
  members: { userId: string; userName: string; checkedAt: string }[];
  churchId: string;
}

// ---- Volunteers ----
export interface Volunteer {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  ministry: string;
  role: string;
  availability: ('sunday_morning' | 'sunday_evening' | 'wednesday' | 'saturday' | 'flexible')[];
  skills: string[];
  active: boolean;
  startDate: string;
  churchId: string;
}

export interface VolunteerSchedule {
  id: string;
  eventTitle: string;
  date: string;
  slots: { role: string; volunteerId: string; volunteerName: string; confirmed: boolean }[];
  churchId: string;
}

// ---- Courses / EBD ----
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: 'biblical' | 'theology' | 'leadership' | 'discipleship' | 'family' | 'youth';
  thumbnailUrl?: string;
  totalLessons: number;
  enrolledCount: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  published: boolean;
  churchId: string;
  createdAt: string;
}

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'audio';
  mediaUrl?: string;
  duration?: string;
  order: number;
  completed?: boolean;
}

// ---- Photo Gallery ----
export interface PhotoAlbum {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  photoCount: number;
  eventId?: string;
  date: string;
  churchId: string;
}

export interface Photo {
  id: string;
  albumId: string;
  url: string;
  caption?: string;
  uploadedBy: string;
  createdAt: string;
}

// ---- Forms / Surveys ----
export interface FormSurvey {
  id: string;
  title: string;
  description: string;
  type: 'survey' | 'registration' | 'feedback' | 'testimony';
  status: 'active' | 'closed' | 'draft';
  responseCount: number;
  fields: FormField[];
  createdAt: string;
  closesAt?: string;
  churchId: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'rating';
  required: boolean;
  options?: string[];
}
