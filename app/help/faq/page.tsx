"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, click the 'Sign Up' button in the top right corner. Fill in your details, verify your email, and you're ready to go!",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a 14-day free trial with full access to all features. No credit card required.",
      },
      {
        question: "What platforms do you support?",
        answer:
          "We currently support eBay, Mercari, Poshmark, and more platforms are coming soon!",
      },
    ],
  },
  {
    category: "Listings",
    questions: [
      {
        question: "How do I create a listing?",
        answer:
          "Navigate to the Listings page, click 'New Listing', fill in the details, add photos, and publish to your chosen platforms.",
      },
      {
        question: "Can I edit a listing after publishing?",
        answer:
          "Yes, you can edit your listings at any time. Changes will sync across all platforms where the listing is published.",
      },
      {
        question: "How many photos can I add?",
        answer:
          "You can add up to 12 photos per listing. We recommend using high-quality images from multiple angles.",
      },
    ],
  },
  {
    category: "Payments & Billing",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for business accounts.",
      },
      {
        question: "How does billing work?",
        answer:
          "We offer monthly and annual plans. You'll be billed at the start of each period, and can upgrade or downgrade at any time.",
      },
      {
        question: "What happens if I exceed my plan limits?",
        answer:
          "We'll notify you when you're approaching your limits. You can upgrade your plan at any time to increase your limits.",
      },
    ],
  },
  {
    category: "Account Management",
    questions: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox.",
      },
      {
        question: "Can I have multiple users?",
        answer:
          "Yes! Our Team and Enterprise plans support multiple users with different permission levels.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-2">
            Find quick answers to common questions about our platform
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search FAQs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-8">
          {filteredFaqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
