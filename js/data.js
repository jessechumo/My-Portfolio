// Portfolio content. Edit this file to update the site; render.js turns it into markup.
const portfolioData = {
  github: 'jessechumo',
  email: 'jessechumo@gmail.com',

  experience: [
    {
      company: 'University of Texas at Arlington',
      tab: 'UTA (SysAdmin)',
      url: 'https://www.uta.edu/',
      time: 'August 2025 - Present',
      position: 'Systems Administrator',
      location: 'Arlington, TX, USA',
      description: [
        'Managed VirtualBox lab environments on RHEL hosts supporting Windows, Fedora, and Kali Linux VMs and their snapshots for hands-on cybersecurity instruction, enabling reliable and repeatable student security experiments.',
        'Owned and maintained Linux-based lab infrastructure and two department RHEL production servers supporting 1,000+ users, diagnosing virtualization and software issues to ensure stable service delivery for students, faculty, and researchers.',
        'Designed and deployed an AI experimentation lab using RAG, LangChain, and LangGraph, enabling students and researchers to run LLM experiments on applied AI workflows.',
        'Built Python tooling to automate software provisioning and installation workflows across lab machines, eliminating repetitive manual setup and improving consistency across environments.',
      ],
      tech: ['RHEL', 'Linux', 'VirtualBox', 'Python', 'LangChain', 'LangGraph', 'RAG'],
    },
    {
      company: 'University of Texas at Arlington',
      tab: 'UTA (GTA)',
      url: 'https://www.uta.edu/',
      time: 'January 2025 - August 2025',
      position: 'Graduate Teaching Assistant',
      location: 'Arlington, TX, USA',
      description: [
        'Achieved a 15% improvement in average student performance for the Algorithms course by providing tutoring and office hours focused on core concepts.',
        'Reduced recurring coding errors and improved code quality by 20% by delivering detailed feedback on C programming assignments and reinforcing best practices.',
        'Elevated student satisfaction to 90% by facilitating collaborative debugging sessions and structured code reviews.',
      ],
      tech: ['Algorithms', 'C', 'Code Reviews', 'Debugging'],
    },
    {
      company: 'Fasi Health',
      tab: 'Fasi Health',
      url: 'https://fasihealth.com/',
      time: 'August 2023 - August 2024',
      position: 'Full Stack Developer',
      location: 'Remote',
      description: [
        'Built and maintained full-stack features across patient, driver, and admin workflows using NestJS, TypeScript, React, GraphQL, and PostgreSQL, supporting core business operations in a production healthcare platform.',
        'Developed a React Native/Expo mobile app for a ride-hailing service, translating UI designs into functional screens and integrating REST and GraphQL APIs for real-time data flow.',
        'Engineered backend infrastructure including NestJS services, GraphQL resolvers, Prisma migrations on a Dockerized PostgreSQL database, AWS Cognito for authentication, S3 for document and media storage, and payment platform integrations.',
        'Built CI/CD pipelines with GitHub Actions and AWS Elastic Beanstalk, reducing deployment time by 50% and improving release reliability.',
        'Contributed to Agile delivery through sprint planning, code reviews, and merge request approvals, supporting consistent and reliable feature releases.',
      ],
      tech: ['NestJS', 'TypeScript', 'React', 'React Native', 'GraphQL', 'PostgreSQL', 'Prisma', 'Docker', 'AWS', 'GitHub Actions'],
    },
    {
      company: 'Fameve',
      tab: 'Fameve',
      url: 'https://fameve.com/',
      time: 'November 2022 - July 2023',
      position: 'Front End Web Developer',
      location: 'Remote',
      description: [
        'Reduced production issues by 60% by implementing automated testing and improving code quality in an Angular-based e-commerce platform.',
        'Developed modular React and Angular components for core e-commerce workflows, consuming REST APIs for data rendering and collaborating with backend engineers to ensure reliable end-to-end feature delivery.',
      ],
      tech: ['Angular', 'React', 'REST APIs', 'Automated Testing'],
    },
    {
      company: 'JamboPay',
      tab: 'JamboPay',
      url: 'https://jambopay.com/',
      time: 'May 2022 - November 2022',
      position: 'Software Development Intern',
      location: 'Nairobi, Kenya',
      description: [
        'Built REST API endpoints for a fintech payment platform using NestJS, supporting transaction processing workflows in a production environment.',
        'Designed and optimized SQL queries to surface transaction data for admin reporting, improving operational visibility into payment workflows.',
      ],
      tech: ['NestJS', 'REST APIs', 'SQL'],
    },
  ],

  // The repositories pinned on github.com/jessechumo, in pinned order.
  // `featured` projects get a large row with a live preview; the rest render as cards.
  // `stars` is a fallback; live counts are fetched from the GitHub API at runtime.
  projects: [
    {
      name: 'Wera',
      repo: 'Wera',
      featured: true,
      url: 'https://github.com/jessechumo/Wera',
      live: 'https://wera-frontend-five.vercel.app/',
      language: 'Go',
      stars: 4,
      description:
        'A self-hosted job radar. Wera watches 570+ companies across 28 industries through public job-board feeds like Greenhouse, Lever, Ashby and Workday, filters new postings with configurable rules, scores each one against your resume with an LLM, and shows which employers sponsor H-1B visas. It ships with a web dashboard and a Chrome extension.',
      used: ['Go', 'PostgreSQL', 'Docker', 'LLMs', 'REST API', 'nginx'],
      visual: {
        type: 'browser',
        url: 'wera-frontend-five.vercel.app',
        image: '/img/projects/wera.webp',
        alt: 'Wera landing page: find the jobs that fit you, and the ones that sponsor.',
      },
    },
    {
      name: 'Pulse Platform',
      repo: 'pulse-platform',
      featured: true,
      url: 'https://github.com/jessechumo/pulse-platform',
      language: 'Python',
      stars: 0,
      description:
        'A deliberately simple FastAPI service, deployed and operated like a real production system. Everything around the app is the point: Kubernetes and Helm, Terraform for AWS (VPC, EKS, RDS), CI with image scanning, Prometheus and Grafana with SLO-backed alerts, plus load and chaos testing.',
      used: ['Python', 'FastAPI', 'Kubernetes', 'Helm', 'Terraform', 'AWS', 'Prometheus'],
      visual: {
        type: 'terminal',
        title: 'pulse-platform — zsh',
        lines: [
          { cmd: 'kubectl get pods -n pulse' },
          { out: 'NAME                           READY   STATUS    RESTARTS   AGE', cls: 'dim' },
          { out: 'pulse-app-6f8d9c7b4d-2xkqp     1/1     Running   0          2d' },
          { out: 'pulse-app-6f8d9c7b4d-9wzlm     1/1     Running   0          2d' },
          { out: 'pulse-worker-7b5c8d9f6-qt6rn   1/1     Running   0          2d' },
          { out: 'pulse-worker-7b5c8d9f6-h2kxv   1/1     Running   0          2d' },
          { out: 'postgres-0                     1/1     Running   0          2d' },
          { out: 'redis-0                        1/1     Running   0          2d' },
          { cmd: 'curl -s localhost/ready' },
          { out: '{"status":"ready","checks":{"database":"ok","redis":"ok"}}', cls: 'ok' },
          { cmd: './loadtest/chaos/kill-app-pod.sh' },
          { out: 'killing pod pulse-app-6f8d9c7b4d-2xkqp' },
          { out: 'pod "pulse-app-6f8d9c7b4d-2xkqp" deleted', cls: 'warn' },
          { out: 'watching deployment recover...' },
          { out: 'deployment "pulse-app" successfully rolled out', cls: 'ok' },
        ],
      },
    },
    {
      name: 'GraphSentinel',
      repo: 'GraphSentinel',
      featured: true,
      url: 'https://github.com/jessechumo/GraphSentinel',
      language: 'Go',
      stars: 0,
      description:
        'A Go service for structural code analysis that flags semantics-preserving obfuscation such as identifier renaming, dead code and control-flow reshaping. Built alongside my thesis on the robustness of GNN-based vulnerability detectors, with async jobs on a worker pool, modular detectors and machine-readable reports.',
      used: ['Go', 'chi', 'Worker Pools', 'Docker', 'Security Research'],
      visual: {
        type: 'analysis',
        source: {
          file: 'sample.c',
          code: [
            'int _0x3f(int _0x1a) {',
            '    int _0x9c = 0;',
            '    if (0) {',
            '        _0x9c = _0x1a * 7;',
            '    }',
            '    for (int _0x2 = 0; _0x2 < _0x1a; _0x2++)',
            '        _0x9c += _0x2;',
            '    return _0x9c;',
            '}',
          ],
          // lines of the dead branch; renamed identifiers (_0x..) are highlighted automatically
          deadCode: [2, 3, 4],
        },
        report: {
          file: 'report.json',
          json: {
            status: 'completed',
            language: 'c',
            signals: { identifier_renaming: true, dead_code: true, control_flow_change: false },
            metrics: { identifier_entropy_score: 0.86, dead_code_score: 0.71, control_flow_drift_score: 0.14 },
            summary: 'Likely obfuscation via identifier renaming, dead code.',
          },
        },
        status: ['POST /analyze → 202 Accepted', 'GET /analysis/{id} → 200 OK'],
      },
    },
    {
      name: 'InkSpector',
      repo: 'InkSpector',
      url: 'https://github.com/jessechumo/InkSpector',
      language: 'Jupyter Notebook',
      stars: 0,
      description:
        'A Siamese convolutional network that spots forged handwritten signatures by comparing a test signature against a known genuine sample, reaching 97.14% validation accuracy.',
      used: ['Python', 'TensorFlow', 'Keras', 'Siamese CNN'],
    },
    {
      name: 'RescueBites',
      repo: 'RescueBites',
      url: 'https://github.com/jessechumo/RescueBites',
      language: 'JavaScript',
      stars: 0,
      description:
        'A React Native app that gets surplus food to people who need it. Donors list food, beneficiaries claim it, distributors deliver it, and a QR code confirms the pickup.',
      used: ['React Native', 'Firebase', 'Google Maps', 'FCM'],
    },
    {
      name: 'Treep',
      repo: 'Treep',
      url: 'https://github.com/jessechumo/Treep',
      live: 'https://treep.onrender.com/',
      language: 'JavaScript',
      stars: 2,
      description:
        'Travel. Eat. Repeat. A social network for travellers with posts, follows, profiles, search and real-time chat.',
      used: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    },
  ],

  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'Go', 'SQL', 'C/C++'],
    backend: ['Node.js', 'NestJS', 'FastAPI', 'GraphQL', 'REST', 'Prisma'],
    infrastructure: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Linux/RHEL'],
    data: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    ml: ['PyTorch', 'TensorFlow', 'GNNs', 'LangChain', 'LangGraph', 'RAG'],
    frontend: ['React', 'React Native', 'Angular', 'Expo'],
  },

  education: [
    {
      degree: 'M.S. Computer Science',
      school: 'University of Texas at Arlington',
      years: '2024 - 2026',
      thesis: 'Evaluating the Robustness of GNN Vulnerability Detectors Under Code Obfuscation',
    },
    {
      degree: 'B.S. Information Technology',
      school: 'Kabarak University',
      years: '2018 - 2021',
    },
  ],
};
