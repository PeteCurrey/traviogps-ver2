import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Privacy() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-card">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Legal</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-6">
              Privacy <span className="italic-accent">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl prose prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
          >
            <h2>1. Introduction</h2>
            <p>
              Dales & Peaks Estate Agents ("we", "us", or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in various ways, including:</p>
            <h3>Personal Data</h3>
            <ul>
              <li>Name, email address, phone number, and postal address</li>
              <li>Property search preferences and requirements</li>
              <li>Financial information for mortgage referrals</li>
              <li>Identification documents for tenant referencing</li>
            </ul>
            <h3>Automatically Collected Data</h3>
            <ul>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
              <li>Device and operating system information</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide property search and matching services</li>
              <li>Process property valuations and sales</li>
              <li>Manage lettings and tenancy agreements</li>
              <li>Send you property alerts and marketing communications (with your consent)</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our website and services</li>
            </ul>

            <h2>4. Legal Basis for Processing</h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul>
              <li><strong>Consent:</strong> Where you have given explicit consent for marketing communications</li>
              <li><strong>Contract:</strong> Where processing is necessary to fulfill our contractual obligations</li>
              <li><strong>Legal Obligation:</strong> Where required by law (e.g., anti-money laundering checks)</li>
              <li><strong>Legitimate Interest:</strong> Where we have a legitimate business interest that doesn't override your rights</li>
            </ul>

            <h2>5. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Property portals (Rightmove, Zoopla, OnTheMarket) to market your property</li>
              <li>Referencing agencies for tenant background checks</li>
              <li>Solicitors and conveyancers for property transactions</li>
              <li>Mortgage brokers (with your consent)</li>
              <li>Regulatory bodies where required by law</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfill the purposes for which 
              it was collected, including to satisfy legal, accounting, or reporting requirements. 
              Typically, we retain client data for 6 years after the end of our business relationship.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Erase your personal data ("right to be forgotten")</li>
              <li>Restrict processing of your personal data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Cookies</h2>
            <p>
              Our website uses cookies to enhance your experience. You can control cookie settings 
              through your browser. For more information, please see our Cookie Policy.
            </p>

            <h2>9. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, 
              please contact us at:
            </p>
            <p>
              <strong>Dales & Peaks Estate Agents</strong><br />
              131 Chatsworth Road<br />
              Chesterfield, Derbyshire S40 1AB<br />
              Email: info@dalesandpeaks.co.uk<br />
              Phone: 01246 567 540
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
