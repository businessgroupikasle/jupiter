import React from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { PageBanner } from '../components/PageBanner';
import { FileText, Shield, Wrench, Truck, Award, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsConditionsPage: React.FC = () => {
  useSeoMeta({
    title: 'Terms & Conditions | Jupiter Industries',
    description: 'Review the Terms & Conditions governing use of Jupiter Industries’ website, machinery purchases, warranty policies, and service agreements.',
    keywords: 'Jupiter Industries Terms, Machinery Purchase Terms, Warranty Policy, Industrial Equipment Terms and Conditions',
    ogUrl: 'https://jupitergroups.in/terms-and-conditions',
  });

  return (
    <div className="terms-conditions-page">
      <PageBanner
        title="Terms & Conditions"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <section style={{ padding: '70px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 15px 40px rgba(0, 35, 61, 0.06)',
            border: '1px solid #E2E8F0'
          }}>
            {/* Header Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', color: '#EA580C', padding: '6px 16px', borderRadius: '20px', fontSize: '0.88rem', fontWeight: 700 }}>
                <FileText size={16} /> Commercial Terms & Machinery Policy
              </div>
              <span style={{ color: '#64748B', fontSize: '0.88rem' }}>Effective Date: September 2026</span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00233D', marginBottom: '16px' }}>
              Terms of Business & Machinery Supply
            </h2>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
              Welcome to <strong>Jupiter Industries</strong>. By placing an order, requesting a formal quotation, or utilizing our heavy engineering manufacturing services, you agree to comply with the terms and conditions outlined below.
            </p>

            {/* Terms List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Term 1 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={20} className="text-orange" />
                  1. Quotation & Pricing Validity
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  All machinery price quotations, technical specs, and plant layout estimates issued by Jupiter Industries are valid for 30 calendar days from the date of issue unless specified otherwise. Prices are subject to applicable GST taxes and freight charges as detailed in the official proforma invoice.
                </p>
              </div>

              {/* Term 2 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Shield size={20} className="text-orange" />
                  2. Payment Schedule & Order Confirmation
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '10px' }}>
                  Orders are confirmed upon receipt of advance payment as per the agreed Proforma Invoice:
                </p>
                <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '24px' }}>
                  <li>Advance Booking Amount: Paid at the time of purchase order confirmation to begin raw material selection and CNC mold machining.</li>
                  <li>Balance Payment: Payable prior to dispatch from our Coimbatore factory after factory load testing verification.</li>
                </ul>
              </div>

              {/* Term 3 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Truck size={20} className="text-orange" />
                  3. Freight, Dispatch & Onsite Delivery
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  Transportation and transit insurance are arranged via reliable heavy haulage transport services. Dispatch schedules are estimated based on machine complexity (typically 15 to 30 working days from order booking). Unloading equipment (cranes/forklifts) at the customer’s plant site is the customer’s responsibility.
                </p>
              </div>

              {/* Term 4 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Wrench size={20} className="text-orange" />
                  4. Erection, Commissioning & Operator Training
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  Jupiter Industries provides experienced field engineers for plant layout setup, electrical wiring connection, trial production run, and operator safety training. Customers must ensure civil foundation work, electrical supply connection (3-Phase power pack), and raw material stockpiles (Fly ash, sand, cement, aggregate) are prepared prior to technician arrival.
                </p>
              </div>

              {/* Term 5 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={20} className="text-orange" />
                  5. Comprehensive Warranty Coverage
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '10px' }}>
                  All Jupiter machines come with a <strong>1-Year Manufacturer Warranty</strong> covering structural body defects, hydraulic cylinders, and PLC control units:
                </p>
                <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '24px' }}>
                  <li>Warranty covers replacement of defective mechanical or hydraulic parts due to manufacturing flaws.</li>
                  <li>Warranty excludes regular wear & tear parts (mould liners, rubber seals) and damage resulting from unauthorized electrical voltage fluctuations or operator misuse.</li>
                </ul>
              </div>

              {/* Term 6 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={20} className="text-orange" />
                  6. Intellectual Property & Designs
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  All machine designs, engineering drawings, CNC die patterns, website photos, and technical specifications are the exclusive intellectual property of Jupiter Industries. Unauthorized reproduction or reverse engineering is strictly prohibited.
                </p>
              </div>

            </div>

            <div style={{ marginTop: '36px', textAlign: 'center' }}>
              <Link to="/contact" className="btn btn-orange" style={{ padding: '12px 28px' }}>
                <span>Request Custom Machine Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
