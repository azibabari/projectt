import { AIResponse, SupportTicket, FAQItem } from '@/types/support';

class SupportAI {
  private static instance: SupportAI;
  private faqs: FAQItem[];

  private constructor() {
    this.faqs = [
      {
        question: "How do I track my rice delivery?",
        answer: "You can track your delivery in real-time through your account dashboard under 'Orders'. Each order has a unique tracking number and status updates.",
        category: "order",
        tags: ["delivery", "tracking", "orders"]
      },
      {
        question: "What happens when my RiceVest investment matures?",
        answer: "Upon maturity, you'll receive a notification and can choose to either collect your rice allocation or reinvest. The rice will be available for collection or delivery within 7 days.",
        category: "investment",
        tags: ["ricevest", "maturity", "returns"]
      },
      // Add more FAQs as needed
    ];
  }

  public static getInstance(): SupportAI {
    if (!SupportAI.instance) {
      SupportAI.instance = new SupportAI();
    }
    return SupportAI.instance;
  }

  public async getInstantResponse(query: string): Promise<AIResponse> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple keyword matching (in production, use proper NLP)
    const keywords = query.toLowerCase().split(' ');
    const matchedFAQ = this.faqs.find(faq => 
      keywords.some(keyword => 
        faq.question.toLowerCase().includes(keyword) || 
        faq.tags.some(tag => tag.includes(keyword))
      )
    );

    if (matchedFAQ) {
      return {
        answer: matchedFAQ.answer,
        confidence: 0.85,
        relatedArticles: [
          'Delivery Guidelines',
          'Investment Terms',
          'Customer Support FAQ'
        ],
        suggestedActions: [
          'View Order History',
          'Contact Support Team',
          'Check FAQ Section'
        ]
      };
    }

    return {
      answer: "I apologize, but I need more information to assist you properly. Would you like to create a support ticket for personalized assistance?",
      confidence: 0.3,
      suggestedActions: [
        'Create Support Ticket',
        'Browse FAQ',
        'Contact Support Team'
      ]
    };
  }

  public async analyzeSentiment(text: string): Promise<number> {
    // Simulate sentiment analysis (0 to 1, where 1 is most positive)
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied'];
    const negativeWords = ['bad', 'poor', 'unhappy', 'dissatisfied', 'issue'];
    
    const words = text.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount + negativeCount === 0) return 0.5;
    return positiveCount / (positiveCount + negativeCount);
  }

  public async predictTicketPriority(ticket: Partial<SupportTicket>): Promise<'low' | 'medium' | 'high'> {
    // Simulate priority prediction based on keywords and category
    const highPriorityKeywords = ['urgent', 'emergency', 'immediately', 'failed'];
    const text = `${ticket.subject} ${ticket.description}`.toLowerCase();
    
    if (highPriorityKeywords.some(keyword => text.includes(keyword))) {
      return 'high';
    }
    
    if (ticket.category === 'technical') {
      return 'medium';
    }
    
    return 'low';
  }
}

export const supportAI = SupportAI.getInstance();