"use client";

import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

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
              Terms & <span className="italic-accent">Conditions</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
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
              These Terms and Conditions govern your use of the Travio website 
              and the services we provide. By accessing our website or using our services, you agree 
              to be bound by these terms.
            </p>

            <h2>2. About Us</h2>
            <p>
              Travio is a trading name of Travio Ltd, 
              a company registered in England and Wales. We provide GPS vehicle tracking, 
              dash cam, and fleet management services.
            </p>

            <h2>3. Services</h2>
            <p>We provide the following fleet management services:</p>
            <ul>
              <li>GPS vehicle tracking and telematics</li>
              <li>Connected dash cam systems</li>
              <li>Fleet management software</li>
              <li>Driver behaviour monitoring</li>
              <li>Vehicle maintenance scheduling</li>
            </ul>

            <h2>4. Website Use</h2>
            <h3>Accuracy of Information</h3>
            <p>
              While we strive to ensure all information on our website is accurate, 
              we cannot guarantee its accuracy. Service details, pricing, and availability are 
              subject to change.
            </p>
            <h3>Intellectual Property</h3>
            <p>
              All content on this website, including text, graphics, logos, and images, is the 
              property of Travio and is protected by copyright laws. You may 
              not reproduce, distribute, or use any content without our written permission.
            </p>

            <h2>5. Subscription Terms</h2>
            <p>When subscribing to our tracking and fleet management services:</p>
            <ul>
              <li>You confirm you are authorised to manage the vehicles being tracked</li>
              <li>Our fees are as agreed in writing and are payable monthly or annually</li>
              <li>Hardware remains our property unless purchased outright</li>
              <li>Minimum contract terms apply as per your signed agreement</li>
            </ul>

            <h2>6. Hardware & Installation</h2>
            <p>When we install tracking devices or dash cams in your vehicles:</p>
            <ul>
              <li>You confirm you have the legal right to install devices in the vehicles</li>
              <li>You are responsible for informing drivers about tracking devices where required by law</li>
              <li>Devices must not be tampered with, removed, or damaged</li>
              <li>You must provide reasonable access to vehicles for installation and maintenance</li>
            </ul>

            <h2>4. Data & Privacy</h2>
            <p>When using our tracking and fleet management services:</p>
            <ul>
              <li>You agree to comply with data protection laws regarding driver tracking</li>
              <li>You are responsible for informing employees about data collection</li>
              <li>Dash cam footage is stored securely and subject to our data retention policy</li>
              <li>GPS data is encrypted and accessible only to authorised users</li>
            </ul>

            <h2>8. Service Level</h2>
            <p>
              We aim to provide 99.9% uptime for our tracking platform. Planned maintenance 
              windows will be communicated in advance. We are not liable for interruptions 
              caused by factors outside our control including network outages.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Travio shall not be 
              liable for any indirect, incidental, or consequential damages arising from your 
              use of our website or services.
            </p>

            <h2>10. Complaints</h2>
            <p>
              If you have a complaint about our services, please contact us in writing. We will 
              acknowledge your complaint within 3 working days and provide a full response within 
              15 working days.
            </p>

            <h2>11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for 
              the content or privacy practices of these external sites.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by English law. Any disputes shall be 
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes 
              will be effective immediately upon posting to our website. Your continued use of 
              our services constitutes acceptance of any changes.
            </p>

            <h2>14. Contact</h2>
            <p>
              For questions about these Terms and Conditions, please contact us at:
            </p>
            <p>
              <strong>Travio</strong><br />
              Sheffield, UK<br />
              Email: hello@travio.co.uk<br />
              Phone: 0800 123 4567
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
