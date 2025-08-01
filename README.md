# 🚀 Next.js User Management System

[![Deploy with Vercel](https://vercel.com/button)](VERCEL_DEPLOYMENT_URL_HERE)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)

[![Live Demo](SCREENSHOT_URL_HERE)](VERCEL_DEPLOYMENT_URL_HERE)

> A modern, full-featured user management system built with Next.js 15, featuring authentication, CRUD operations, internationalization, and comprehensive testing. Built on top of the ReqRes.in API for demonstration purposes.

## ✨ Features

### 👥 **User Management**

- **Complete CRUD Operations** (Create, Read, Update, Delete)
- **Advanced Search & Filtering** with URL state persistence
- **Real-time Data Updates** with optimistic UI
- **Bulk Operations** for efficient user management
- **User Profile Management** with avatar support

### 🎨 **Modern UI/UX**

- **Responsive Design** that works on all devices
- **Dark/Light Mode** with system preference detection
- **Accessible Components** following WCAG guidelines
- **Smooth Animations** and micro-interactions
- **Professional Dashboard** with data visualization

### 🌐 **Internationalization**

- **Multi-language Support** (English & Persian/Farsi)
- **RTL Layout Support** for Persian language
- **Locale-based Routing** with automatic detection
- **Dynamic Language Switching** without page reload

### 📊 **Data Management**

- **Advanced Pagination** with customizable page sizes
- **Sorting & Filtering** with persistent URL state
- **Search Functionality** across multiple fields

### 🧪 **Testing & Quality**

- **Comprehensive Test Suite** with 90%+ coverage
- **Unit Tests** for components and utilities
- **Integration Tests** for user flows
- **Code Quality** with ESLint and Prettier

## 🛠️ Tech Stack

### **Core Framework**

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library with concurrent features

### **State Management**

- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Predictable state container
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching and caching
- **[nuqs](https://nuqs.47ng.com/)** - URL state management

### **UI & Styling**

- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### **Internationalization**

- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization for Next.js
- **[ICU Message Format](https://formatjs.io/)** - Advanced message formatting

### **Testing**

- **[Vitest](https://vitest.dev/)** - Fast unit test framework
- **[Testing Library](https://testing-library.com/)** - Simple and complete testing utilities
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[MSW](htt1ps://mswjs.io/)** - API mocking for tests

### **Development Tools**

- **[ESLint](https://eslint.org/)** - Code linting with flat config
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files

### **Deployment & DevOps**

- **[Docker](https://www.docker.com/)** - Containerization
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Git** for version control

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/nextjs-user-management.git
   cd nextjs-user-management
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Edit `.env.local` with your configuration:
   \`\`\`env

   # API Configuration

   NEXT_PUBLIC_API_BASE_URL=https://reqres.in/api
   NEXT_PUBLIC_API_KEY=reqres-free-v1

   # Optional: Skip environment validation in development

   SKIP_ENV_VALIDATION=false
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Authentication

The application uses the ReqRes.in API for authentication. Use these test credentials:

\`\`\`
Email: eve.holt@reqres.in
Password: cityslicka
\`\`\`

### Key Features

#### **Dashboard**

- Overview of user statistics
- Recent activity feed
- Quick action buttons
- Data visualization charts

#### **User Management**

- **List View**: Table with sorting, filtering, and pagination
- **Card View**: Visual card layout with user avatars
- **Search**: Real-time search across name, email, and other fields
- **Filters**: Filter by status, role, registration date
- **Actions**: Create, edit, delete, and bulk operations

#### **Internationalization**

- Switch between English and Persian using the language toggle
- All UI elements are fully translated
- RTL layout automatically applied for Persian

#### **Responsive Design**

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## 🏗️ Project Structure

\`\`\`
├── app/ # Next.js App Router
│ ├── [locale]/ # Internationalized routes
│ │ ├── auth/ # Authentication pages
│ │ ├── dashboard/ # Dashboard page
│ │ ├── users/ # User management pages
│ │ └── layout.tsx # Localized layout
│ └── globals.css # Global styles
├── components/ # Reusable React components
│ ├── ui/ # shadcn/ui components
│ ├── AuthGuard.tsx # Route protection
│ ├── Navbar.tsx # Navigation component
│ └── ... # Other components
├── store/ # Redux store configuration
│ ├── api/ # RTK Query API definitions
│ ├── slices/ # Redux slices
│ └── store.ts # Store configuration
├── lib/ # Utility functions
│ ├── validations/ # Zod validation schemas
│ ├── env.ts # Environment variables
│ └── utils.ts # Helper functions
├── hooks/ # Custom React hooks
├── types/ # TypeScript type definitions
├── messages/ # Internationalization messages
│ ├── en.json # English translations
│ └── fa.json # Persian translations
├── **tests**/ # Test files
│ ├── components/ # Component tests
│ ├── integration/ # Integration tests
│ └── utils/ # Utility tests
├── i18n/ # Internationalization configuration
├── middleware.ts # Next.js middleware
├── docker-compose.yml # Docker configuration
├── Dockerfile # Docker image definition
└── README.md # Project documentation
\`\`\`

## 🧪 Testing

### Running Tests

\`\`\`bash

# Run all tests

npm run test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage

# Run E2E tests

npm run test:e2e

# Run specific test file

npm run test -- UserModal.test.tsx
\`\`\`

### Test Coverage

The project maintains high test coverage across:

- **Components**: UI component testing with React Testing Library
- **Store**: Redux slices and API endpoints
- **Utilities**: Helper functions and validations
- **Integration**: User flows and API interactions
- **E2E**: Complete user journeys

### Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing
- **API Mocking**: MSW for reliable API testing

## 🐳 Docker Support

### Development with Docker

\`\`\`bash

# Build and run with Docker Compose

docker-compose up --build

# Run in detached mode

docker-compose up -d

# View logs

docker-compose logs -f

# Stop services

docker-compose down
\`\`\`

### Production Docker Build

\`\`\`bash

# Build production image

docker build -t nextjs-user-management .

# Run production container

docker run -p 3000:3000 nextjs-user-management
\`\`\`

## 🌍 Internationalization

### Supported Languages

- **English (en)** - Default language
- **Persian/Farsi (fa)** - RTL support included

### Adding New Languages

1. Create a new message file in `messages/[locale].json`
2. Add the locale to `i18n/routing.ts`
3. Update the language switcher component
4. Test RTL layout if applicable

### Message Format

\`\`\`json
{
"auth": {
"login": {
"title": "Sign In",
"email": "Email Address",
"password": "Password",
"submit": "Sign In"
}
},
"dashboard": {
"title": "Dashboard",
"users": {
"total": "Total Users",
"active": "Active Users"
}
}
}
\`\`\`

## 📊 API Integration

### ReqRes.in API

This project uses the [ReqRes.in](https://reqres.in/) API for demonstration purposes:

- **Base URL**: `https://reqres.in/api`
- **Authentication**: Simulated JWT tokens
- **Rate Limiting**: No limits for testing
- **Data**: Realistic user data for development

### API Endpoints

\`\`\`typescript
// Authentication
POST /api/login # User login
POST /api/register # User registration
POST /api/logout # User logout

// Users
GET /api/users # List users (paginated)
GET /api/users/:id # Get user details
POST /api/users # Create user
PUT /api/users/:id # Update user
DELETE /api/users/:id # Delete user
\`\`\`

### Custom API Integration

To integrate with your own API:

1. Update `NEXT_PUBLIC_API_BASE_URL` in environment variables
2. Modify API endpoints in `store/api/`
3. Update authentication flow in `store/slices/authSlice.ts`
4. Adjust data models in `types/user.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nextjs-user-management)

### Other Platforms

#### **Netlify**

\`\`\`bash
npm run build
npm run export

# Deploy the 'out' directory

\`\`\`

#### **Docker**

\`\`\`bash
docker build -t nextjs-user-management .
docker run -p 3000:3000 nextjs-user-management
\`\`\`

#### **Traditional Hosting**

\`\`\`bash
npm run build
npm run start

# Serve on port 3000

\`\`\`

## 🔧 Configuration

### Environment Variables

| Variable                   | Description                 | Default                 | Required |
| -------------------------- | --------------------------- | ----------------------- | -------- |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL                | `https://reqres.in/api` | Yes      |
| `NEXT_PUBLIC_API_KEY`      | API key for authentication  | `reqres-free-v1`        | Yes      |
| `SKIP_ENV_VALIDATION`      | Skip environment validation | `false`                 | No       |

### Customization

#### **Theming**

- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Customize shadcn/ui components in `components/ui/`

#### **Branding**

- Update logo in `components/Navbar.tsx`
- Modify app metadata in `app/layout.tsx`
- Customize favicon and app icons

#### **Features**

- Enable/disable features in `lib/config.ts`
- Modify user permissions in `types/user.ts`
- Customize dashboard widgets

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Flat config with comprehensive rules
- **Prettier**: Consistent code formatting
- **Testing**: Maintain 90%+ coverage
- **Commits**: Conventional commit messages

### Pull Request Process

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the README if needed
5. Request review from maintainers

## 📝 Scripts

| Script                  | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run start`         | Start production server   |
| `npm run lint`          | Run ESLint                |
| `npm run lint:fix`      | Fix ESLint issues         |
| `npm run format`        | Format code with Prettier |
| `npm run test`          | Run tests                 |
| `npm run test:watch`    | Run tests in watch mode   |
| `npm run test:coverage` | Run tests with coverage   |
| `npm run type-check`    | Run TypeScript compiler   |
| `npm run docker:build`  | Build Docker image        |
| `npm run docker:run`    | Run Docker container      |

## 🐛 Troubleshooting

### Common Issues

#### **Environment Variables Not Loading**

\`\`\`bash

# Ensure .env.local exists and has correct format

cp .env.example .env.local

# Restart development server

npm run dev
\`\`\`

#### **TypeScript Errors**

\`\`\`bash

# Clear Next.js cache

rm -rf .next

# Reinstall dependencies

npm install

# Run type check

npm run type-check
\`\`\`

#### **Build Failures**

\`\`\`bash

# Check environment variables

npm run build

# Skip environment validation if needed

SKIP_ENV_VALIDATION=true npm run build
\`\`\`

#### **Test Failures**

\`\`\`bash

# Clear test cache

npm run test -- --clearCache

# Run specific test

npm run test -- UserModal.test.tsx
\`\`\`

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/yourusername/nextjs-user-management/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/nextjs-user-management/discussions)
- **Documentation**: Check the `/docs` folder for detailed guides

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[ReqRes.in](https://reqres.in/)** for providing the demo API
- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful component library
- **[Next.js](https://nextjs.org/)** team for the amazing framework
- **[Vercel](https://vercel.com/)** for the deployment platform
- All the open-source contributors who made this project possible

## 📈 Roadmap

- [ ] **Real-time Features** with WebSocket support
- [ ] **Advanced Analytics** dashboard
- [ ] **File Upload** with drag & drop
- [ ] **Email Notifications** system
- [ ] **Advanced Permissions** and roles
- [ ] **API Rate Limiting** and caching
- [ ] **Mobile App** with React Native
- [ ] **GraphQL** API integration

---

<div align="center">

**[⭐ Star this repo](https://github.com/yourusername/nextjs-user-management)** if you find it helpful!

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
