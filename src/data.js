export const profile = {
  name: 'Faizan Yousaf',
  firstName: 'Faizan',
  role: 'Software Engineer',
  location: 'Lahore, Pakistan',
  email: 'faizirana2003@gmail.com',
  phone: '0304-9005536',
  whatsapp: 'Rana_Faizi',
  cvFile: '/Faizan_Resume.pdf',
  githubUsername: 'Faizi605',
  githubUrl: 'https://github.com/Faizi605',
  linkedinUrl: 'https://www.linkedin.com/in/rana-faizan-01044b37b',
  roles: ['Web Developer', 'MERN Developer'],
  summary:
    'Motivated Software Engineer skilled in JavaScript, React.js, Node.js, Express.js, MongoDB, and RESTful APIs. I build responsive, scalable applications with a focus on clean code, problem-solving, API integration, and database management.',
}

// Set to false to hide the WhatsApp message form
export const messagesEnabled = true

export const skills = [
  {
    title: 'Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'React JS',
      'Next JS',
      'Node JS',
      'Express.js',
      'MongoDB',
      'React Native',
      'Tailwind CSS',
      'Bootstrap',
    ],
  },
  {
    title: 'Developer Tools',
    items: ['Git', 'GitHub', 'Figma', 'REST APIs', 'Firebase'],
  },
]

export const certifications = [
  { name: 'Full Stack Development', org: 'NAVTACC', year: '2024' },
  { name: 'WordPress Development', org: 'DigiSkills', year: '2023' },
  { name: 'Digital Marketing', org: 'DigiSkills', year: '2023' },
]

export const experience = [
  {
    role: 'MERN Stack Developer',
    company: 'Axiom World',
    period: 'Jan 2026 — Present',
    current: true,
    points: [
      'Developing and maintaining front-end features using React JS and Next JS for client-facing web applications.',
      'Collaborating with design and backend teams to deliver responsive, high-quality UI components.',
    ],
  },
  {
    role: 'Intern, Front-End Developer',
    company: 'Daira Engineering',
    period: 'Aug 2025 — Nov 2025',
    current: false,
    points: [
      'Worked on a frontend project using React Native, building and implementing user interface components for a mobile application.',
    ],
  },
]

export const education = [
  {
    title: 'Bachelor of Computer Science',
    school: 'National College of Business Administration and Economics',
    meta: 'CGPA 3.49',
    period: 'Oct 2021 — Jun 2025',
  },
  {
    title: 'Intermediate, FSC Pre-Engineering',
    school: 'GOVT Khawaja Rafeeq Shaheed College',
    meta: '',
    period: 'Sep 2019 — Sep 2021',
  },
]

export const projects = [
  {
    year: '2026',
    title: 'Promount Solar',
    blurb:
      'A solar promount calculator that estimates mounting hardware and structural requirements for panel installations, with dynamic forms for panel count, layout, and roof type.',
    tags: ['React', 'JavaScript', 'Dynamic Forms'],
    tone: 'solar',
    image: '/project/promount.png',
    live: '',
    github: '',
  },
  {
    year: '2026',
    title: 'OneClick Books',
    blurb:
      'A full-featured booking web application with real-time data handling and booking management through REST APIs.',
    tags: ['Next.js', 'Tailwind CSS', 'REST APIs'],
    tone: 'book',
    image: '/assets/project/oneclick-books.svg',
    live: '',
    github: '',
  },
  {
    year: '2025',
    title: 'Recipe App',
    blurb:
      'A React recipe discovery app with a visual food-first experience, recipe browsing, and dedicated pages for exploring meals.',
    tags: ['React', 'JavaScript', 'Recipe UI'],
    tone: 'ai',
    image: '/assets/project/recipe-app-home.jpg',
    live: '',
    github: 'https://github.com/Faizi605/Recipe-app',
  },
]
