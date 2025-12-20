import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// Book Parts Data
const bookParts = [
  {
    title: 'Part 1: Foundations of Physical AI',
    description: 'Core concepts of embodied intelligence, humanoid landscape, and sensor systems.',
    icon: '🧠',
  },
  {
    title: 'Part 2: ROS 2 (Robotic Nervous System)',
    description: 'Master ROS 2 architecture, Python nodes, and URDF modeling for humanoids.',
    icon: '🔧',
  },
  {
    title: 'Part 3: Digital Twin (Gazebo & Unity)',
    description: 'Build realistic simulations with physics engines and 3D visualization.',
    icon: '🎮',
  },
  {
    title: 'Part 4: NVIDIA Isaac Platform',
    description: 'Leverage GPU-accelerated simulation and Isaac ROS for navigation.',
    icon: '🚀',
  },
  {
    title: 'Part 5: Vision-Language-Action (VLA)',
    description: 'Integrate LLMs, voice commands, and multimodal AI for robot control.',
    icon: '🤖',
  },
  {
    title: 'Part 6: Capstone & Labs',
    description: 'Build an autonomous humanoid robot with hands-on lab exercises.',
    icon: '🔬',
  },
  {
    title: 'Part 7: Projects & Assessments',
    description: 'Weekly projects, practical assessments, and portfolio development.',
    icon: '📊',
  },
];

// Why Different Data
const whyDifferent = [
  {
    title: 'Hands-On Learning',
    description: 'Real code, real simulations, real robots — not just theory.',
    icon: '💻',
  },
  {
    title: 'Full Pipeline Coverage',
    description: 'From theory → simulation → hardware safety → deployment.',
    icon: '🔄',
  },
  {
    title: 'Free & Open Source',
    description: 'Completely free access to all content and code examples.',
    icon: '🆓',
  },
  {
    title: 'AI-Powered Learning',
    description: 'Integrated chat widget with RAG for interactive Q&A.',
    icon: '💬',
  },
  {
    title: 'Industry-Standard Tools',
    description: 'ROS 2, Gazebo, Unity, NVIDIA Isaac — real-world robotics stack.',
    icon: '🛠️',
  },
  {
    title: 'Academia Meets Industry',
    description: 'Bridging theoretical foundations with practical engineering.',
    icon: '🎓',
  },
];

// Target Audience Data
const audiences = [
  {
    title: 'Students & Beginners',
    description: 'Start from zero and build foundational robotics knowledge with guided tutorials.',
    icon: '📚',
  },
  {
    title: 'Hobbyist Makers',
    description: 'Build your own humanoid robot projects with practical, reproducible steps.',
    icon: '🔩',
  },
  {
    title: 'Researchers',
    description: 'Explore cutting-edge VLA models, simulation environments, and AI integration.',
    icon: '🔍',
  },
  {
    title: 'Engineers',
    description: 'Production-ready patterns for ROS 2, safety systems, and deployment.',
    icon: '⚙️',
  },
  {
    title: 'Educators',
    description: 'Complete curriculum with weekly breakdowns, labs, and assessments.',
    icon: '👨‍🏫',
  },
];

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Physical AI & Humanoid Robotics
        </h1>
        <p className={styles.heroSubtitle}>
          From foundational theory to simulation, control, perception, and full-scale humanoid robotics.
          Master the complete stack with ROS 2, Gazebo, Unity, NVIDIA Isaac, and Vision-Language-Action models.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.primaryButton} to="/preface">
            Start Reading →
          </Link>
          <Link className={styles.secondaryButton} to="https://github.com/zaidrj/Hackathon-1-Robotics-book">
            View on GitHub
          </Link>
        </div>
        <p className={styles.heroHint}>
          💬 Use the chat widget in the bottom-right corner to ask questions about any topic!
        </p>
      </div>
    </header>
  );
}

function BookPartsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What This Book Covers</h2>
        <p className={styles.sectionSubtitle}>
          A comprehensive 7-part curriculum taking you from fundamentals to building autonomous humanoid robots.
        </p>
        <div className={styles.partsGrid}>
          {bookParts.map((part, idx) => (
            <div key={idx} className={styles.partCard}>
              <span className={styles.partIcon}>{part.icon}</span>
              <h3 className={styles.partTitle}>{part.title}</h3>
              <p className={styles.partDescription}>{part.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyDifferentSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why This Book Is Different</h2>
        <p className={styles.sectionSubtitle}>
          Not just another robotics textbook — a complete learning experience designed for the AI era.
        </p>
        <div className={styles.featuresGrid}>
          {whyDifferent.map((item, idx) => (
            <div key={idx} className={styles.featureCard}>
              <span className={styles.featureIcon}>{item.icon}</span>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Who Is This For?</h2>
        <p className={styles.sectionSubtitle}>
          Whether you're just starting out or advancing your expertise, this book meets you where you are.
        </p>
        <div className={styles.audienceGrid}>
          {audiences.map((audience, idx) => (
            <div key={idx} className={styles.audienceCard}>
              <span className={styles.audienceIcon}>{audience.icon}</span>
              <h3 className={styles.audienceTitle}>{audience.title}</h3>
              <p className={styles.audienceDescription}>{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>Ready to Build the Future of Robotics?</h2>
        <p className={styles.ctaSubtitle}>
          Start your journey into Physical AI and Humanoid Robotics today.
        </p>
        <div className={styles.ctaButtons}>
          <Link className={styles.primaryButton} to="/preface">
            Start Reading →
          </Link>
          <Link className={styles.secondaryButton} to="/part-1-foundations/intro">
            View Curriculum
          </Link>
          <Link className={styles.outlineButton} to="https://github.com/zaidrj/Hackathon-1-Robotics-book">
            GitHub Repository
          </Link>
        </div>
      </div>
    </section>
  );
}

function FooterLinks() {
  return (
    <section className={styles.footerLinks}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/preface">Preface</Link></li>
              <li><Link to="/part-1-foundations/intro">Part 1: Foundations</Link></li>
              <li><Link to="/part-2-ros2/intro">Part 2: ROS 2</Link></li>
              <li><Link to="/hardware-and-labs">Hardware & Labs</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>Resources</h4>
            <ul>
              <li><Link to="https://github.com/zaidrj/Hackathon-1-Robotics-book">GitHub Repository</Link></li>
              <li><Link to="https://github.com/panaversity">Panaversity</Link></li>
              <li><Link to="https://github.com/zaidrehan">Author's GitHub</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>Technologies</h4>
            <ul>
              <li>ROS 2 Humble/Iron</li>
              <li>Gazebo Sim</li>
              <li>Unity 3D</li>
              <li>NVIDIA Isaac Sim</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="A comprehensive textbook on Physical AI and Humanoid Robotics — from theory to simulation to real-world deployment.">
      <main>
        <HeroSection />
        <BookPartsSection />
        <WhyDifferentSection />
        <AudienceSection />
        <CTASection />
        <FooterLinks />
      </main>
    </Layout>
  );
}
