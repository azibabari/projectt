export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  category: 'order' | 'investment' | 'technical' | 'other';
  createdAt: string;
  updatedAt: string;
  resolution?: string;
}

export interface AIResponse {
  answer: string;
  confidence: number;
  relatedArticles?: string[];
  suggestedActions?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  tags: string[];
}