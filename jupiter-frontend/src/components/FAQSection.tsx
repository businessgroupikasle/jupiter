import React, { useState } from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Which brick making machine is right for my production?',
      answer: 'Jupiter Industries offers 5G Brick Making Machines, Fly Ash Brick Making Machines, Interlock Brick Machines, Paver Block Machines and Hollow & Solid Block Machines. We help you choose the right machine based on your product, production capacity and requirements.',
    },
    {
      question: 'Do you provide machine installation and operator training?',
      answer: 'Yes. Jupiter Industries provides professional installation, machine commissioning and operator training for our brick making machines and concrete block machines, with technical support available across India.',
    },
    {
      question: 'Do you provide after-sales service and spare parts?',
      answer: 'Yes. We manufacture and supply genuine brick machine spares, dies, valves and other machine components. Our after-sales service and technical support help keep your brick manufacturing machine running efficiently.',
    },
    {
      question: 'Can you customise brick and block making machines?',
      answer: 'Yes. Jupiter Industries can provide customised brick making and block making machine solutions based on your required brick size, block type, production capacity and manufacturing process.',
    },
    {
      question: 'What is the production capacity of your machines?',
      answer: 'Production capacity depends on the machine model, mould configuration, product size and production cycle. Our team can recommend the suitable 5G Brick Machine, Fly Ash Brick Machine or Paver Block Machine based on your required output.',
    },
    {
      question: 'Do you manufacture Fly Ash Brick Making Machines?',
      answer: 'Yes. Jupiter Industries manufactures Fly Ash Brick Making Machines designed for efficient production of high-quality fly ash bricks with consistent shape, size and compaction.',
    },
    {
      question: 'Do you manufacture Interlock Brick and Paver Block Machines?',
      answer: 'Yes. We manufacture Interlock Brick Making Machines and Paver Block Making Machines for manufacturers looking for reliable and consistent production of interlocking bricks and concrete paver blocks.',
    },
    {
      question: 'Do you supply brick machine spare parts?',
      answer: 'Yes. Jupiter Industries manufactures and supplies Brick Machine Spare Parts, including dies, valves and other critical components for reliable machine operation and reduced downtime.',
    },
    {
      question: 'Do you provide pan-India installation and support?',
      answer: 'Yes. Jupiter Industries provides pan-India installation, commissioning, technical assistance and after-sales support for brick making machines, concrete block machines and related machinery.',
    },
    {
      question: 'How can I request a quotation?',
      answer: 'Contact Jupiter Industries with your required machine type, product size and production capacity. Our team can recommend the appropriate brick manufacturing machine or concrete block machine and provide a quotation based on your requirements.',
    }
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
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#EA580C',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              Everything You Need to Know <span className="text-orange">Before You Buy</span>
            </h2>
            <p className="section-subtitle">
              Get quick answers about Jupiter Industries’ brick making machines, concrete block machines, installation, spare parts and technical support.
            </p>
          </div>

          <Link to="/contact" className="btn btn-orange">
            <span>Talk to a Jupiter Machinery Expert</span>
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
