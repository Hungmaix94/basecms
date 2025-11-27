export const mockFaqData = {
  listFaq: {
    sectionTitle: "Frequently Asked Questions",
    sectionDescription: "Find answers to the most common questions about our products and services.",
    faqItems: [
      { question: "What is your return policy?", answer: "Our return policy allows for returns within 30 days of purchase, provided the item is unused and in its original packaging." },
      { question: "How can I track my order?", answer: "You can track your order by logging into your account and visiting the 'Order History' section. A tracking number will be provided for each shipment." },
      { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary based on your location." },
    ],
    variant: "list" as const,
  },
  accordionFaq: {
    sectionTitle: "Questions & Answers",
    sectionDescription: "Here are some common questions we receive.",
    faqItems: [
      { question: "What payment methods do you accept?", answer: "We accept Visa, MasterCard, American Express, PayPal, and Apple Pay." },
      { question: "Can I change my order after it has been placed?", answer: "Once an order is placed, it enters our fulfillment process quickly. Please contact customer service immediately if you need to make changes." },
      { question: "How do I contact customer support?", answer: "You can reach our customer support team via email at support@example.com or by phone at (123) 456-7890 during business hours." },
    ],
    variant: "accordion" as const,
  },
  categorizedFaq: {
    sectionTitle: "Categorized FAQs",
    sectionDescription: "Browse questions by category for quick answers.",
    faqItems: [
      { category: "General", question: "What are your business hours?", answer: "We are open Monday to Friday, 9:00 AM to 5:00 PM local time." },
      { category: "General", question: "Where are you located?", answer: "Our main office is located in the heart of the city." },
      { category: "Shipping", question: "What are the shipping costs?", answer: "Shipping costs are calculated at checkout based on your location and the weight of your order." },
      { category: "Shipping", question: "How long does shipping take?", answer: "Standard shipping typically takes 3-5 business days domestically." },
      { category: "Account", question: "How do I reset my password?", answer: "You can reset your password by clicking on 'Forgot Password' on the login page." },
    ],
    variant: "categorized" as const,
  },
};
