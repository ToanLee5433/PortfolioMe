export interface Project {
  title: string;
  role: string;
  description: string;
  techTags: string[];
  imageName: 'chicken-invaders' | 'game-hub' | 'quiz-trivia' | 'loveflix';
  githubLink: string;
  responsibilities: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioModeData {
  objective: string;
  subTitle: string;
  skills: SkillCategory[];
  projects: Project[];
}

export const portfolioData: { game: PortfolioModeData; fullstack: PortfolioModeData } = {
  game: {
    subTitle: 'Aspiring Game & Playable Ads Developer',
    objective:
      'Detail-oriented soon-to-graduate Information Technology student with practical experience in Web & Game development. Possess deep knowledge of OOP, logical thinking, and 3D/Particle graphics algorithms. Seeking a Playable Ads / Game Developer Intern position to build high-performance interactive experiences.',
    skills: [
      {
        category: 'Programming Languages',
        skills: ['C#', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Python'],
      },
      {
        category: 'Game Engines & Libraries',
        skills: ['Unity Engine', 'Cocos Creator (Basic/Self-study)', 'Phaser', 'Unity Luna (Concept)', 'Particle-based 3D Algorithms'],
      },
      {
        category: 'Tools & Platforms',
        skills: ['Git / GitHub', 'Unity Custom Editors', 'Visual Studio', 'VS Code', 'Firebase'],
      },
    ],
    projects: [
      {
        title: 'Chicken Invaders Remake & Playable Prototype',
        role: 'Unity / Gameplay Programmer',
        description: 'Developed a 2D top-down space shooter game inspired by the classic Chicken Invaders, focusing on building modular gameplay systems, automated workflows, and smooth player interactions suitable for interactive ad experiences.',
        techTags: ['Unity Engine', 'C#', 'New Input System', 'Custom Editor Scripting', 'Coroutines', 'Particle Systems'],
        imageName: 'chicken-invaders',
        githubLink: 'https://github.com/ToanLee5433/PortfolioMe',
        responsibilities: [
          'Designed and implemented core spaceship movement and multi-touch controls using Unity\'s New Input System.',
          'Developed a custom Flock Management & Grid Logic system for synchronized enemy wave formations and boundary checks.',
          'Built a dynamic weapon upgrade system supporting 1 to 5 fan-shaped laser spreads and percentage-based loot drop algorithm.',
          'Programmed coroutines to handle complex states (player invincibility, visual flashing, and infinite scrolling backgrounds).',
          'Wrote Custom Unity Editor Tools (C#) to automate scene setup, prefab generation, and model axis corrections.'
        ]
      },
      {
        title: 'Web Game Hub Portal',
        role: 'Game Developer / Gameplay Engineer',
        description: 'Developed a high-performance, cross-platform web gaming portal from scratch hosting 6 distinct 2D games (Tetris, Wood Block Puzzle, Snake, Caro/Gomoku, Memory Game, Blackjack/Poker).',
        techTags: ['HTML5 Canvas API', 'Vanilla JS/TS', 'GSAP', 'Node.js', 'Socket.io', 'Firebase'],
        imageName: 'game-hub',
        githubLink: 'https://github.com/ToanLee5433/PortfolioMe',
        responsibilities: [
          'Built a custom lightweight 2D Web Game Engine running a 60 FPS requestAnimationFrame core loop with delta-time calculation.',
          'Optimized rendering pipelines using HTML5 Canvas API, minimizing draw calls and memory usage for rapid loading.',
          'Integrated GSAP for smooth UI animations and engineered a programmatic custom Particle Effect system.',
          'Implemented a Finite State Machine (FSM) pattern to cleanly handle modular game states (Menu, Playing, Pause, Game Over).',
          'Developed a Heuristic Evaluation AI for a 15x15 Caro game and probability-based AI dealer simulations for card games.',
          'Architected a real-time multiplayer backend using Node.js and Socket.io with room generation and matchmaking.'
        ]
      }
    ]
  },
  fullstack: {
    subTitle: 'Software Engineer / Full-Stack Web Developer',
    objective:
      'Detail-oriented, soon-to-graduate Information Technology student with practical project experience in Full-stack Web development, focusing on building modern web applications using React, TypeScript, and serverless backends. Seeking an entry-level Software Developer position to apply technical skills and grow professionally.',
    skills: [
      {
        category: 'Frontend & Frameworks',
        skills: ['TypeScript', 'JavaScript', 'React', 'Redux Toolkit', 'HTML5 / CSS3', 'Vite'],
      },
      {
        category: 'Databases & Cloud',
        skills: ['SQL Server', 'MySQL', 'Firebase (Firestore/Auth/Hosting)', 'Supabase', 'MongoDB', 'Redis'],
      },
      {
        category: 'AI & Advanced Tech',
        skills: ['Gemini API Integration', 'RAG Architecture', 'Particle-based 3D Algorithms', 'AI-Assisted Development Tools'],
      },
    ],
    projects: [
      {
        title: 'QuizTrivia - AI-Powered Quiz Application',
        role: 'Full-stack Developer',
        description: 'Developed a full-stack educational platform featuring AI-driven question generation, interactive chatbot, authentication, state management, and real-time database syncing with a serverless architecture.',
        techTags: ['React', 'TypeScript', 'Redux Toolkit', 'Firebase Firestore', 'Cloud Functions', 'Gemini API', 'RAG'],
        imageName: 'quiz-trivia',
        githubLink: 'https://github.com/ToanLee5433/PortfolioMe',
        responsibilities: [
          'Designed and implemented the NoSQL database schema using Firestore and optimized queries for fast quiz history retrieval.',
          'Developed the frontend UI and managed complex application states using React and Redux Toolkit.',
          'Integrated Gemini API to dynamically generate context-aware quiz questions and built a RAG chatbot interface.',
          'Built serverless APIs via Cloud Functions to securely process background tasks and AI requests.',
          'Implemented user authentication, access control using Firebase Auth, and deployed the application via Firebase Hosting.'
        ]
      },
      {
        title: 'Interactive Web Application (Loveflix)',
        role: 'Full-stack Developer',
        description: 'Developed a highly customized interactive web application featuring programmable 3D effects and personalized AI-generated media to deliver a unique user experience.',
        techTags: ['React', 'TypeScript', 'Particle-based rendering algorithms', 'Generative AI'],
        imageName: 'loveflix',
        githubLink: 'https://github.com/ToanLee5433/PortfolioMe',
        responsibilities: [
          'Programmed advanced 3D visual effects using custom particle-based canvas algorithms to replace static image rendering.',
          'Integrated customized AI-generated digital avatars tailored to represent real-life individuals.',
          'Designed responsive layouts ensuring 60 FPS smooth animations and transitions on various screen resolutions.'
        ]
      }
    ]
  }
};
