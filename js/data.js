// Portfolio data - converted from Jekyll YAML files
const portfolioData = {
  experience: [
    {
      company: "University of Texas - Arlington",
      url: "https://www.uta.edu/",
      time: "August 2025 - Present",
      position: "Systems Administrator",
      location: "Arlington, TX, USA",
      description: [
        "Managed VirtualBox lab environments on RHEL hosts supporting Windows, Fedora, and Kali Linux VMs and their snapshots for hands-on cybersecurity instruction, enabling reliable and repeatable student security experiments.",
        "Owned and maintained Linux-based lab infrastructure and two department RHEL production servers supporting 1,000+ users, diagnosing virtualization and software issues to ensure stable service delivery for students, faculty, and researchers.",
        "Designed and deployed an AI experimentation lab using RAG, LangChain, and LangGraph, enabling students and researchers to run LLM experiments on applied AI workflows.",
        "Built Python tooling to automate software provisioning and installation workflows across lab machines, eliminating repetitive manual setup and improving consistency across environments.",
      ],
    },
    {
      company: "University of Texas - Arlington",
      url: "https://www.uta.edu/",
      time: "January 2025 - August 2025",
      position: "Graduate Teaching Assistant",
      location: "Arlington, TX, USA",
      description: [
        "Achieved a 15% improvement in average student performance for the Algorithms course by providing tutoring and office hours focused on core concepts.",
        "Reduced recurring coding errors and improved code quality by 20% by delivering detailed feedback on C programming assignments and reinforcing best practices.",
        "Elevated student satisfaction to 90% by facilitating collaborative debugging sessions and structured code reviews.",
      ],
    },
    {
      company: "Fasi Health",
      url: "https://fasihealth.com/",
      time: "August 2023 - August 2024",
      position: "Full Stack Developer",
      location: "Remote",
      description: [
        "Built and maintained full-stack features across patient, driver, and admin workflows using NestJS, TypeScript, React, GraphQL, and PostgreSQL, supporting core business operations in a production healthcare platform.",
        "Developed a React Native/Expo mobile app for a ride-hailing service, translating UI designs into functional screens and integrating REST and GraphQL APIs for real-time data flow.",
        "Engineered backend infrastructure including NestJS services, GraphQL resolvers, Prisma migrations on a Dockerized PostgreSQL database, AWS Cognito for authentication, S3 for document and media storage, and payment platform integrations.",
        "Built CI/CD pipelines with GitHub Actions and AWS Elastic Beanstalk, reducing deployment time by 50% and improving release reliability.",
        "Contributed to Agile delivery through sprint planning, code reviews, and merge request approvals, supporting consistent and reliable feature releases.",
      ],
    },
    {
      company: "Fameve",
      url: "https://fameve.com/",
      time: "November 2022 - July 2023",
      position: "Front End Web Developer",
      location: "Remote",
      description: [
        "Reduced production issues by 60% by implementing automated testing and improving code quality in an Angular-based e-commerce platform.",
        "Developed modular React and Angular components for core e-commerce workflows, consuming REST APIs for data rendering and collaborating with backend engineers to ensure reliable end-to-end feature delivery.",
      ],
    },
    {
      company: "jambopay",
      url: "https://jambopay.com/",
      time: "May 2022 - November 2022",
      position: "Software Development Intern",
      location: "Nairobi Area, Kenya",
      description: [
        "Built REST API endpoints for a fintech payment platform using NestJS, supporting transaction processing workflows in a production environment.",
        "Designed and optimized SQL queries to surface transaction data for admin reporting, improving operational visibility into payment workflows.",
      ],
    },
  ],
  projects: [
    {
      name: "air-nbo",
      url: "https://github.com/jessechumo/air-nbo",
      description:
        "Web app using Airqo IoT devices to determine Nairobi air quality. Provides real-time air quality monitoring and data visualization for the Nairobi area.",
      used: ["JavaScript", "HTML", "CSS", "IoT", "Airqo API"],
    },
    {
      name: "InkSpector",
      url: "https://github.com/jessechumo/InkSpector",
      description:
        "A Siamese Network for Signature Forgery Detection. Machine learning project that uses deep learning techniques to detect forged signatures with high accuracy.",
      used: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Deep Learning",
        "Jupyter Notebook",
        "Machine Learning",
      ],
    },
    {
      name: "RescueBites",
      url: "https://github.com/jessechumo/RescueBites",
      description:
        "Mobile app for getting surplus food to those in need to reduce waste and hunger. Connects food donors with organizations that can distribute food to people in need.",
      used: ["JavaScript", "React Native", "Mobile Development", "Node.js"],
    },
    {
      name: "foodmine",
      url: "https://github.com/jessechumo/foodmine",
      description:
        "Front-end for a food ordering web app using Angular. A modern, responsive web application for ordering food online with an intuitive user interface.",
      used: ["TypeScript", "Angular", "HTML", "CSS", "JavaScript"],
    },
    {
      name: "Treep",
      url: "https://github.com/jessechumo/Treep",
      description:
        "Basic social media web-app. A full-stack social media application with user profiles, posts, and social interactions.",
      used: ["JavaScript", "Node.js", "HTML", "CSS", "MongoDB"],
    },
    {
      name: "video-game-db",
      url: "https://github.com/jessechumo/video-game-db",
      description:
        "A video game inventory build using Angular. Web application for managing and browsing a comprehensive video game database with search and filter capabilities.",
      used: ["TypeScript", "Angular", "HTML", "CSS", "JavaScript"],
    },
  ],
  skills: {
    languages: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C/C++",
      "PHP",
      "Perl",
      "HTML/CSS",
      "SQL",
    ],
    frameworks: [
      "React.js",
      "React Native",
      "Node.js",
      "Nest.js",
      "GraphQL",
      "TensorFlow",
      "PyTorch",
    ],
    tools: [
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Azure",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Linux/Unix",
      "CI/CD",
      "GitHub Actions",
    ],
    other: [
      "Machine Learning",
      "Deep Learning",
      "GNN",
      "Secure Authentication",
      "Software Testing",
      "Automated Testing",
      "Code Reviews",
      "Agile Methodologies",
    ],
  },
};
