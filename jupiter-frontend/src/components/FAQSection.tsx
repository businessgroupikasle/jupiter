import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Which machine is right for my production?',
      answer: 'Our selection depends on your daily capacity targets (e.g., 2,000 to 20,000+ blocks per 8-hour shift), available raw materials (fly ash, quarry dust, cement, aggregate), and level of automation needed. Our engineering consultants evaluate your plant layout to recommend the most optimal model.',
    },
    {
      question: 'Do you provide installation and training?',
      answer: 'Yes, our certified engineers handle turnkey on-site installation, foundation guidance, electrical synchronization, hydraulic testing, and hands-on operational training for your production staff.',
    },
    {
      question: 'Is after-sales service available?',
      answer: 'We provide comprehensive after-sales support with 24/7 technical assistance, scheduled preventive maintenance visits, and swift spare parts dispatch from our regional service hubs across India.',
    },
    {
      question: 'Can you customise a solution?',
      answer: 'Absolutely. We design custom mould sizes, automated batching conveyors, pan mixers, stacking elevators, and PLC automated systems tailored to your specific brick or block dimensions.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-white" id="faq-section">
      <div className="container">
        {/* Header with Top Right CTA */}
        <div className="section-header-top">
          <div>
            <h2 className="section-title">
              Answers before <span className="text-orange">you build.</span>
            </h2>
            <p className="section-subtitle">
              Quick answers to common questions about our machines, installation and support.
            </p>
          </div>

          <Link to="/contact" className="btn btn-orange">
            <span>Talk to an Expert</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className="faq-toggle-icon">
                    <Plus size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-drawer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
