# EventEase – React Implementation

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

This is the React implementation of EventEase, a comprehensive ticket management application. Built with React 18, Vite, and modern web technologies, this version provides a seamless user experience with performance optimizations.

## ✨ Features

- **Modern React 18** with functional components and hooks
- **Vite** for fast development and optimized production builds
- **React Router 6** for client-side routing
- **Context API** for state management
- **Tailwind CSS** for utility-first styling
- **Responsive Design** that works on all devices
- **Form Validation** with real-time feedback
- **Toast Notifications** for user feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or later
- npm 9 or later (or pnpm/yarn)

### Installation

1. Clone the repository
2. Navigate to the React app directory:
   ```bash
   cd stage_2_project_EventEase/react
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create a `dist` directory with optimized production assets.

To preview the production build locally:

```bash
npm run preview
```

## 🛠️ Project Structure

```
react/
├── public/           # Static files
├── src/
│   ├── assets/       # Local assets (images, fonts, etc.)
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── services/     # API and service layer
│   ├── styles/       # Global styles and Tailwind config
│   ├── utils/        # Utility functions
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── .eslintrc.cjs     # ESLint configuration
├── .prettierrc.json  # Prettier configuration
├── index.html        # HTML template
├── package.json      # Project dependencies and scripts
└── vite.config.js    # Vite configuration
```

## 🔧 Configuration

Environment variables can be configured in `.env` files:

- `.env` - Default environment variables
- `.env.development` - Development environment overrides
- `.env.production` - Production environment overrides

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🚀 Deployment

### Static Hosting

Deploy the `dist` directory to any static hosting service:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Important Notes

- Ensure the root `/assets` directory is included in your deployment
- Set up proper redirects for client-side routing
- Configure environment variables in your hosting platform

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
