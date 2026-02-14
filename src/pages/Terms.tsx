import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Terms() {
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
              These Terms and Conditions govern your use of the Dales & Peaks Estate Agents website 
              and the services we provide. By accessing our website or using our services, you agree 
              to be bound by these terms.
            </p>

            <h2>2. About Us</h2>
            <p>
              Dales & Peaks Estate Agents is a trading name of Dales & Peaks Property Limited, 
              a company registered in England and Wales. We are members of The Property Ombudsman 
              and adhere to their Code of Practice.
            </p>

            <h2>3. Services</h2>
            <p>We provide the following estate agency services:</p>
            <ul>
              <li>Residential property sales</li>
              <li>Property lettings and management</li>
              <li>Property valuations</li>
              <li>New homes sales</li>
              <li>Landlord services</li>
            </ul>

            <h2>4. Website Use</h2>
            <h3>Accuracy of Information</h3>
            <p>
              While we strive to ensure all property information on our website is accurate, 
              we cannot guarantee its accuracy. Property details, prices, and availability are 
              subject to change. Photographs may have been digitally enhanced.
            </p>
            <h3>Intellectual Property</h3>
            <p>
              All content on this website, including text, graphics, logos, and images, is the 
              property of Dales & Peaks Estate Agents and is protected by copyright laws. You may 
              not reproduce, distribute, or use any content without our written permission.
            </p>

            <h2>5. Seller Terms</h2>
            <p>When instructing us to sell your property:</p>
            <ul>
              <li>You confirm you are the legal owner or have authority to sell</li>
              <li>Our fees are as agreed in writing and are payable on completion</li>
              <li>We reserve the right to market your property on third-party portals</li>
              <li>Notice periods and tie-in periods apply as per your signed agreement</li>
            </ul>

            <h2>6. Landlord Terms</h2>
            <p>When instructing us to let your property:</p>
            <ul>
              <li>You confirm you have the legal right to let the property</li>
              <li>You are responsible for ensuring the property meets all safety regulations</li>
              <li>Our fees are as agreed in writing and are deducted from rent received</li>
              <li>You must have appropriate landlord insurance in place</li>
            </ul>

            <h2>7. Buyer/Tenant Obligations</h2>
            <p>When registering as a buyer or tenant:</p>
            <ul>
              <li>You agree to provide accurate personal information</li>
              <li>You confirm you are in a position to proceed with a purchase or tenancy</li>
              <li>You agree to be contacted about suitable properties</li>
              <li>You understand viewings are subject to availability</li>
            </ul>

            <h2>8. Anti-Money Laundering</h2>
            <p>
              We are required by law to verify the identity of our clients. You agree to provide 
              identification documents and proof of funds as requested. We reserve the right to 
              decline to act for anyone who fails to provide satisfactory documentation.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Dales & Peaks Estate Agents shall not be 
              liable for any indirect, incidental, or consequential damages arising from your 
              use of our website or services.
            </p>

            <h2>10. Complaints</h2>
            <p>
              If you have a complaint about our services, please contact us in writing. We will 
              acknowledge your complaint within 3 working days and provide a full response within 
              15 working days. If you remain dissatisfied, you may refer your complaint to The 
              Property Ombudsman.
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
              <strong>Dales & Peaks Estate Agents</strong><br />
              131 Chatsworth Road<br />
              Chesterfield, Derbyshire S40 1AB<br />
              Email: info@dalesandpeaks.co.uk<br />
              Phone: 01246 567 540
            </p>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
