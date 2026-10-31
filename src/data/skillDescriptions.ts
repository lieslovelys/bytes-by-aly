import type { skillGroups } from './skills'

type SkillName = (typeof skillGroups)[number]['skills'][number]

export const skillDescriptions: Record<SkillName, string> = {
  JavaScript: 'A programming language used to add interactivity and logic to websites. It can also run on servers through environments such as Node.js.',
  HTML: 'The markup language used to structure web pages, including headings, links, forms, and other content.',
  CSS: 'A stylesheet language used to control the layout, colors, typography, and responsive presentation of web pages.',
  'C++': 'A compiled programming language used for systems software, embedded applications, and other performance-sensitive programs.',
  Python: 'A general-purpose programming language used for automation, data processing, web development, and scripting.',
  'VB.NET': 'A programming language for the .NET platform, used to build applications such as Windows desktop software.',
  'React.js': 'A JavaScript library for building user interfaces from reusable components and updating them when application data changes.',
  'Node.js': 'A JavaScript runtime used outside the browser to build servers, command-line tools, and other applications.',
  'Tailwind CSS': 'A utility-first CSS framework used to style interfaces with small, composable classes directly in markup.',
  GitHub: 'A platform for hosting Git repositories, reviewing code, tracking issues, and collaborating on software projects.',
  Vercel: 'A platform for building, deploying, and hosting web applications, with preview deployments for reviewing changes.',
  Figma: 'A collaborative interface design tool used to create wireframes, visual layouts, and interactive prototypes.',
  Jira: 'A work-tracking tool used to organize tasks, report issues, and plan software development projects.',
  MySQL: 'A relational database management system that uses SQL to store, query, and manage structured data.',
  PostgreSQL: 'An open-source relational database system used to store and query structured data with SQL and support complex application data models.',
  Firebase: 'A collection of application development services from Google, including authentication, hosted databases, and hosting.',
  'Front-End Development': 'The development of the user-facing parts of websites and applications, including layout, interaction, accessibility, and browser behavior.',
  'Project Management': 'The practice of planning and coordinating tasks, resources, and schedules to deliver a project within its agreed scope.',
  'API Integration': 'Connecting applications or services through defined interfaces so they can exchange data and use each other’s functionality.',
  'Real-Time Systems': 'Systems designed to process events and produce responses within defined timing requirements. They are used where timely updates or predictable response times matter.',
  'UI/UX Wireframing': 'Creating simplified interface layouts to plan content, navigation, and user flows before detailed visual design or implementation.',
  'AI-Assisted Coding': 'Using AI tools to suggest or generate code during development. Suggestions require human review and testing before use.',
  'Prompt Writing': 'Formulating instructions and context for AI tools to guide their responses toward a specific task or output format.',
  'AI-Assisted Debugging': 'Using AI tools to help interpret errors, explore possible causes, and suggest fixes that must be verified through testing.',
  'AI-Assisted Research': 'Using AI tools to help explore topics, organize information, or locate research leads. Claims and sources need independent verification.',
}
