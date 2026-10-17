// Site content. Edit here; the markup is rendered from it.

export const experience = [
  {
    role: 'Systems Administrator',
    company: 'University of Texas at Arlington',
    url: 'https://www.uta.edu/',
    time: 'Aug 2025 — Present',
    location: 'Arlington, TX',
    points: [
      'Managed VirtualBox lab environments on RHEL hosts supporting Windows, Fedora, and Kali Linux VMs and their snapshots for hands-on cybersecurity instruction, enabling reliable and repeatable student security experiments.',
      'Owned and maintained Linux-based lab infrastructure and two department RHEL production servers supporting 1,000+ users, diagnosing virtualization and software issues to ensure stable service delivery for students, faculty, and researchers.',
      'Designed and deployed an AI experimentation lab using RAG, LangChain, and LangGraph, enabling students and researchers to run LLM experiments on applied AI workflows.',
      'Built Python tooling to automate software provisioning and installation workflows across lab machines, eliminating repetitive manual setup and improving consistency across environments.',
    ],
  },
  {
    role: 'Graduate Teaching Assistant',
    company: 'University of Texas at Arlington',
    url: 'https://www.uta.edu/',
    time: 'Jan 2025 — Aug 2025',
    location: 'Arlington, TX',
    points: [
      'Achieved a 15% improvement in average student performance for the Algorithms course by providing tutoring and office hours focused on core concepts.',
      'Reduced recurring coding errors and improved code quality by 20% by delivering detailed feedback on C programming assignments and reinforcing best practices.',
      'Elevated student satisfaction to 90% by facilitating collaborative debugging sessions and structured code reviews.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Fasi Health',
    url: 'https://fasihealth.com/',
    time: 'Aug 2023 — Aug 2024',
    location: 'Remote',
    points: [
      'Built and maintained full-stack features across patient, driver, and admin workflows using NestJS, TypeScript, React, GraphQL, and PostgreSQL, supporting core business operations in a production healthcare platform.',
      'Developed a React Native/Expo mobile app for a ride-hailing service, translating UI designs into functional screens and integrating REST and GraphQL APIs for real-time data flow.',
      'Engineered backend infrastructure including NestJS services, GraphQL resolvers, Prisma migrations on a Dockerized PostgreSQL database, AWS Cognito for authentication, S3 for document and media storage, and payment platform integrations.',
      'Built CI/CD pipelines with GitHub Actions and AWS Elastic Beanstalk, reducing deployment time by 50% and improving release reliability.',
      'Contributed to Agile delivery through sprint planning, code reviews, and merge request approvals, supporting consistent and reliable feature releases.',
    ],
  },
  {
    role: 'Front End Web Developer',
    company: 'Fameve',
    url: 'https://fameve.com/',
    time: 'Nov 2022 — Jul 2023',
    location: 'Remote',
    points: [
      'Reduced production issues by 60% by implementing automated testing and improving code quality in an Angular-based e-commerce platform.',
      'Developed modular React and Angular components for core e-commerce workflows, consuming REST APIs for data rendering and collaborating with backend engineers to ensure reliable end-to-end feature delivery.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'JamboPay',
    url: 'https://jambopay.com/',
    time: 'May 2022 — Nov 2022',
    location: 'Nairobi, Kenya',
    points: [
      'Built REST API endpoints for a fintech payment platform using NestJS, supporting transaction processing workflows in a production environment.',
      'Designed and optimized SQL queries to surface transaction data for admin reporting, improving operational visibility into payment workflows.',
    ],
  },
];

// Pinned GitHub repositories, each under the sign of a patron deity.
export const projects = [
  {
    name: 'Wera',
    deity: 'Apollo',
    epithet: 'God of prophecy, keeper of the Delphic oracle',
    sigil: 'oracle',
    summary:
      'A self-hosted job radar. It sweeps public job boards for 570+ companies across 28 industries, filters postings with configurable rules, and has an LLM score each role against your resume, so you only read the ones worth applying to.',
    highlights: ['570+ companies tracked', 'Greenhouse, Lever, Ashby, Workday & more', 'Dashboard + Chrome extension'],
    stack: ['Go', 'PostgreSQL', 'Docker', 'LLM Agents', 'nginx'],
    repo: 'https://github.com/jessechumo/Wera',
    live: 'https://wera-frontend-five.vercel.app/',
  },
  {
    name: 'Pulse Platform',
    deity: 'Atlas',
    epithet: 'The Titan who holds up the heavens',
    sigil: 'atlas',
    summary:
      'A deliberately simple FastAPI service operated like a real production system. The point is everything around it: Kubernetes, Helm, Terraform on AWS, SLO-backed alerting, load testing, and chaos experiments.',
    highlights: ['EKS, RDS & VPC via Terraform', 'Prometheus + Grafana SLOs', 'Chaos & Locust load tests'],
    stack: ['Python', 'FastAPI', 'Kubernetes', 'Helm', 'Terraform', 'AWS'],
    repo: 'https://github.com/jessechumo/pulse-platform',
  },
  {
    name: 'GraphSentinel',
    deity: 'Argus',
    epithet: 'The hundred-eyed watchman who never sleeps',
    sigil: 'argus',
    summary:
      'A Go backend for structural code analysis that detects semantics-preserving obfuscation (renaming, dead branches, control-flow reshaping). It came out of my thesis on the robustness of GNN vulnerability detectors.',
    highlights: ['Async worker-pool pipeline', 'Modular detectors with scores', 'Thesis-aligned research tooling'],
    stack: ['Go', 'chi', 'slog', 'Docker', 'Security Research'],
    repo: 'https://github.com/jessechumo/GraphSentinel',
  },
  {
    name: 'InkSpector',
    deity: 'Themis',
    epithet: 'Titaness of divine law, who weighs truth on her scales',
    sigil: 'themis',
    summary:
      'A Siamese convolutional network that tells genuine handwritten signatures from forgeries. Instead of classifying one image, it compares a signature against a known genuine sample using the L1 distance between learned features.',
    highlights: ['97.14% validation accuracy', '99.46% training accuracy', 'Pairwise L1 similarity'],
    stack: ['Python', 'TensorFlow', 'Siamese CNN', 'Jupyter'],
    repo: 'https://github.com/jessechumo/InkSpector',
  },
  {
    name: 'RescueBites',
    deity: 'Demeter',
    epithet: 'Goddess of the harvest, who feeds the world',
    sigil: 'demeter',
    summary:
      'A cross-platform mobile app that gets surplus food to the people who need it. Donors list food, beneficiaries claim it, distributors deliver it, and a QR code confirms the pickup.',
    highlights: ['Three roles: donor, beneficiary, distributor', 'Live maps & GPS pickup points', 'Push notifications + QR pickup'],
    stack: ['React Native', 'Firebase', 'Google Maps', 'FCM', 'Cloudinary'],
    repo: 'https://github.com/jessechumo/RescueBites',
  },
  {
    name: 'Treep',
    deity: 'Hermes',
    epithet: 'Patron of travellers and swift messengers',
    sigil: 'hermes',
    summary:
      'Travel. Eat. Repeat. A social network for wanderers, with posts, follows, profiles, search, and real-time chat, built on Node, Express, and MongoDB.',
    highlights: ['Real-time chat', 'Follow graph & profiles', 'JWT auth + post search'],
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Socket.io'],
    repo: 'https://github.com/jessechumo/Treep',
    live: 'https://treep.onrender.com/',
  },
];

export const pantheon = [
  { glyph: 'α', name: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'SQL', 'C / C++'] },
  { glyph: 'β', name: 'Backend', items: ['Node.js', 'NestJS', 'FastAPI', 'GraphQL', 'REST APIs', 'Prisma', 'Auth & Payments'] },
  { glyph: 'γ', name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Linux / RHEL'] },
  { glyph: 'δ', name: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Query Optimization', 'Data Modeling'] },
  { glyph: 'ε', name: 'AI & ML', items: ['PyTorch', 'TensorFlow', 'GNNs', 'LangChain', 'LangGraph', 'RAG'] },
  { glyph: 'ζ', name: 'Interfaces', items: ['React', 'React Native', 'Expo', 'Angular', 'Observability', 'System Design'] },
];
