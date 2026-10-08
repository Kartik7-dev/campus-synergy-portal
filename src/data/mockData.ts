
export interface Certificate {
  id: string;
  title: string;
  type: 'Winner' | 'Runner Up' | 'Participation' | 'Special Mention';
  level: 'International' | 'National' | 'State' | 'Internal';
  date: string;
}

export interface Student {
  id: string;
  rank: number;
  name: string;
  branch: string;
  year: string;
  avatar: string;
  certificates: Certificate[];
  score: number; // Calculated based on weighted system
}

export interface AdminRequest {
  id: string;
  type: 'ID Card' | 'Bonafide Certificate' | 'Scholarship Form' | 'Transcript';
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Ready for Pickup';
  submittedDate: string;
  lastUpdated: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  folderId: string;
  tags: string[];
  dueDate: string | null;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export interface TaskFolder {
  id: string;
  name: string;
  type: 'system' | 'user';
  color: string;
}

export const CURRENT_USER = {
  name: "Varun",
  id: "u1",
  branch: "CSIT",
  year: "3rd Year"
};

export const MOCK_REQUESTS: AdminRequest[] = [
  {
    id: "req-1",
    type: "ID Card",
    status: "Ready for Pickup",
    submittedDate: "2024-02-20",
    lastUpdated: "2024-02-26"
  },
  {
    id: "req-2",
    type: "Bonafide Certificate",
    status: "Under Review",
    submittedDate: "2024-02-25",
    lastUpdated: "2024-02-25"
  }
];

export const MOCK_FOLDERS: TaskFolder[] = [
  { id: 'all', name: 'All Tasks', type: 'system', color: 'slate' },
  { id: 'today', name: 'Today', type: 'system', color: 'blue' },
  { id: 'f1', name: 'Academics', type: 'user', color: 'indigo' },
  { id: 'f2', name: 'Hackathons', type: 'user', color: 'amber' },
  { id: 'f3', name: 'Personal', type: 'user', color: 'emerald' },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Submit DBMS Assignment',
    description: 'Complete the normalization exercises and submit via portal.',
    completed: false,
    folderId: 'f1',
    tags: ['Urgent', 'College'],
    dueDate: '2024-03-01',
    priority: 'High',
    createdAt: '2024-02-26'
  },
  {
    id: 't2',
    title: 'Register for HackMan v6',
    description: 'Form a team and register before the deadline.',
    completed: true,
    folderId: 'f2',
    tags: ['Event'],
    dueDate: '2024-02-28',
    priority: 'Medium',
    createdAt: '2024-02-25'
  },
  {
    id: 't3',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread.',
    completed: false,
    folderId: 'f3',
    tags: ['Home'],
    dueDate: null,
    priority: 'Low',
    createdAt: '2024-02-27'
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    rank: 1,
    name: "Aman Sharma",
    branch: "CSIT",
    year: "3rd Year",
    avatar: "https://i.pravatar.cc/150?u=aman",
    score: 980,
    certificates: [
      {
        id: "c1",
        title: "Winner - Prayatn 3.0 Hackathon",
        type: "Winner",
        level: "National",
        date: "2023-11-15"
      }
    ]
  },
  {
    id: "s2",
    rank: 2,
    name: "Priya Singh",
    branch: "CSIT",
    year: "3rd Year",
    avatar: "https://i.pravatar.cc/150?u=priya",
    score: 920,
    certificates: [
      {
        id: "c2",
        title: "Runner-Up - Smart India Hackathon",
        type: "Runner Up",
        level: "National",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: "s3",
    rank: 3,
    name: "Rohan Das",
    branch: "CSIT",
    year: "3rd Year",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    score: 850,
    certificates: [
      {
        id: "c3",
        title: "Participant - Google Code-in",
        type: "Participation",
        level: "International",
        date: "2023-12-05"
      }
    ]
  },
  {
    id: "s4",
    rank: 4,
    name: "Ananya",
    branch: "CS AIML",
    year: "3rd Year",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    score: 820,
    certificates: []
  },
  {
    id: "s5",
    rank: 5,
    name: "Rahul",
    branch: "CSIT",
    year: "2nd Year",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    score: 450,
    certificates: []
  }
];

export const DASHBOARD_CHAT_HISTORY = [
  { id: 1, sender: "Aman", text: "Hey Varun! Your rank is amazing!", isMe: false, time: "10:30 AM" },
  { id: 2, sender: "Varun", text: "Thanks Aman! Saw you won Prayatn 3.0, congrats!", isMe: true, time: "10:32 AM" },
  { id: 3, sender: "Aman", text: "Yeah! We should team up for the next national event, I have some ideas on sustainability problems.", isMe: false, time: "10:35 AM" }
];

export const MOCK_CHAT_MESSAGES = [
  { id: 1, sender: "system", text: "You flashed Varun! Connection established." },
  { id: 2, sender: "Varun", text: "Hey! I saw you're interested in the upcoming hackathon." },
  { id: 3, sender: "me", text: "Hi Varun! Yes, I loved your project at Prayatn 3.0. Looking for a frontend dev?" },
  { id: 4, sender: "Varun", text: "Absolutely. We need someone good with React. Are you free to chat later?" }
];
