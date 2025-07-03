export const _libraries = [
  {
    id: 1,
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    logo: '⚛️',
    tags: ['UI', 'Framework'],
    stars: 220000,
    github: 'https://github.com/facebook/react',
    overview:
      'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
    features: [
      'Virtual DOM',
      'Component-Based',
      'Declarative',
      'Learn Once, Write Anywhere',
    ],
    installation: 'npm install react react-dom',
    usage: `import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Building amazing UIs with components!</p>
    </div>
  );
}

// Component with state
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    resources: [
      { name: 'Official Docs', url: 'https://react.dev' },
      { name: 'Tutorial', url: 'https://react.dev/learn' },
    ],
  },
  {
    id: 2,
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development',
    logo: '🎨',
    tags: ['CSS', 'UI', 'Utility'],
    stars: 78000,
    github: 'https://github.com/tailwindlabs/tailwindcss',
    overview:
      'Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    features: [
      'Utility-First',
      'Responsive Design',
      'Hover, Focus, & Other States',
      'Dark Mode',
    ],
    installation: 'npm install -D tailwindcss\nnpx tailwindcss init',
    usage: `<!-- Add to your HTML -->
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold">Hello Tailwind!</h1>
  <p class="mt-2">This card uses Tailwind utility classes.</p>
</div>`,
    resources: [
      { name: 'Official Docs', url: 'https://tailwindcss.com' },
      { name: 'Play CDN', url: 'https://play.tailwindcss.com' },
    ],
  },
  {
    id: 3,
    name: 'Lodash',
    description: 'A modern JavaScript utility library delivering modularity',
    logo: '🔧',
    tags: ['Utility', 'JavaScript'],
    stars: 58000,
    github: 'https://github.com/lodash/lodash',
    overview:
      'Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.',
    features: ['Modular', 'Performant', 'Extensive API', 'FP Support'],
    installation: 'npm install lodash',
    usage: `import _ from 'lodash';

// Array manipulation
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];

const names = _.map(users, 'name');
console.log(names); // ['John', 'Jane']

// Debounce function
const debouncedSearch = _.debounce(searchFunction, 300);`,
    resources: [
      { name: 'Official Docs', url: 'https://lodash.com' },
      {
        name: 'FP Guide',
        url: 'https://github.com/lodash/lodash/wiki/FP-Guide',
      },
    ],
  },
  {
    id: 4,
    name: 'Axios',
    description: 'Promise based HTTP client for the browser and node.js',
    logo: '🌐',
    tags: ['HTTP', 'Utility'],
    stars: 104000,
    github: 'https://github.com/axios/axios',
    overview:
      'Axios is a simple promise based HTTP client for the browser and node.js. It provides a simple to use library in a small package.',
    features: [
      'Request/Response Interceptors',
      'Request/Response Transformation',
      'Cancel Requests',
      'JSON Data Handling',
    ],
    installation: 'npm install axios',
    usage: `// Fetch API with modern async/await
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST request
const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};`,
    resources: [
      { name: 'Official Docs', url: 'https://axios-http.com' },
      { name: 'GitHub', url: 'https://github.com/axios/axios' },
    ],
  },
  {
    id: 5,
    name: 'Framer Motion',
    description: 'A production-ready motion library for React',
    logo: '🎭',
    tags: ['Animation', 'UI', 'React'],
    stars: 22000,
    github: 'https://github.com/framer/motion',
    overview:
      'Framer Motion is a production-ready motion library for React. It brings declarative animations, effortless layout transitions and gestures to your React components.',
    features: ['Declarative API', 'Layout Animations', 'Gestures', 'Variants'],
    installation: 'npm install framer-motion',
    usage: `import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-blue-500 p-4 rounded-lg"
    >
      Hover me!
    </motion.div>
  );
}`,
    resources: [
      { name: 'Official Docs', url: 'https://www.framer.com/motion' },
      { name: 'Examples', url: 'https://www.framer.com/motion/examples' },
    ],
  },
  {
    id: 6,
    name: 'Redux Toolkit',
    description:
      'The official, opinionated, batteries-included toolset for Redux',
    logo: '🔄',
    tags: ['State', 'Redux'],
    stars: 10000,
    github: 'https://github.com/reduxjs/redux-toolkit',
    overview:
      'Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.',
    features: [
      'Simple Store Setup',
      'Immutable Updates',
      'Built-in DevTools',
      'RTK Query',
    ],
    installation: 'npm install @reduxjs/toolkit react-redux',
    usage: `// Simple state management pattern
const createStore = (reducer, initialState) => {
  let state = initialState;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  
  return { getState, dispatch, subscribe };
};

// Counter reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};`,
    resources: [
      { name: 'Official Docs', url: 'https://redux-toolkit.js.org' },
      { name: 'Redux Docs', url: 'https://redux.js.org' },
    ],
  },
]
