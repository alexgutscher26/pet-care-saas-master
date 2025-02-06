# Contributing to Pet Care SaaS

Thank you for your interest in contributing to Pet Care SaaS! We're excited to have you join our community. This document provides comprehensive guidelines for making contributions that align with our project's standards and goals.

## 📑 Table of Contents

- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Development Guidelines](#-development-guidelines)
- [Code Quality Standards](#-code-quality-standards)
- [Pull Request Process](#-pull-request-process)
- [Bug Reports](#-bug-reports)
- [Feature Requests](#-feature-requests)
- [Code of Conduct](#-code-of-conduct)
- [License](#-license)

## 🚀 Getting Started

1. **Fork the Repository**
   - Click the 'Fork' button at the top right of this repository
   - This creates your own copy of the repository

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/yourusername/pet-care-landing.git
   cd pet-care-landing
   ```

3. **Set Up Remote**
   ```bash
   git remote add upstream https://github.com/original/pet-care-landing.git
   ```

4. **Stay Updated**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

## 🛠 Development Setup

1. **Prerequisites**
   - Node.js 18.x or higher
   - pnpm 8.x or higher
   - Git
   - A code editor (VS Code recommended)

2. **Environment Setup**
   ```bash
   # Install dependencies
   pnpm install

   # Copy environment variables
   cp .env.example .env.local

   # Set up your environment variables
   # Edit .env.local with your values

   # Start development server
   pnpm dev
   ```

3. **VS Code Setup**
   - Install recommended extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - TypeScript + JavaScript
   - Use workspace settings provided in `.vscode/settings.json`

## 💻 Development Guidelines

### TypeScript Best Practices

- **Type Safety**
  ```typescript
  // ❌ Avoid
  let data: any
  
  // ✅ Do
  interface UserData {
    id: string
    name: string
    email: string
  }
  let data: UserData
  ```

- **Type Inference**
  ```typescript
  // ❌ Avoid
  const numbers: number[] = [1, 2, 3]
  
  // ✅ Do
  const numbers = [1, 2, 3] // TypeScript infers number[]
  ```

### React & Next.js Patterns

- **Server Components**
  ```typescript
  // app/users/page.tsx
  export default async function UsersPage() {
    const users = await fetchUsers()
    return <UserList users={users} />
  }
  ```

- **Client Components**
  ```typescript
  'use client'
  
  export function UserForm({ onSubmit }: UserFormProps) {
    // Client-side logic here
  }
  ```

### Component Architecture

```typescript
// components/feature/ComponentName/index.tsx
import { useState } from 'react'
import type { ComponentProps } from './types'
import { useComponentLogic } from './hooks'
import { SubComponent } from './components'
import { componentStyles } from './styles'

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const { state, actions } = useComponentLogic()
  
  return (
    <div className={componentStyles.root}>
      {/* Component JSX */}
    </div>
  )
}
```

### State Management

- Use React Query for server state
- Use Zustand for client state
- Implement proper loading and error states

### Testing Strategy

1. **Unit Tests**
   ```typescript
   describe('UserComponent', () => {
     it('renders user information correctly', () => {
       const user = { name: 'John', email: 'john@example.com' }
       const { getByText } = render(<UserComponent user={user} />)
       expect(getByText(user.name)).toBeInTheDocument()
     })
   })
   ```

2. **Integration Tests**
   - Test component interactions
   - Test data flow
   - Test error handling

3. **E2E Tests**
   - Critical user flows
   - Authentication flows
   - Payment processes

## 🎯 Code Quality Standards

### Naming Conventions

- **Files & Folders**
  ```
  components/
  ├── feature/
  │   └── ComponentName/
  │       ├── index.tsx
  │       ├── types.ts
  │       ├── hooks.ts
  │       └── styles.ts
  ```

- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

### Code Organization

```typescript
// 1. External imports
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Internal imports
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui'

// 3. Types
interface Props {
  // ...
}

// 4. Constants
const ITEMS_PER_PAGE = 10

// 5. Component
export function ComponentName() {
  // ...
}
```

## 📝 Pull Request Process

1. **Branch Naming**
   ```
   feature/description
   fix/issue-description
   docs/update-description
   refactor/description
   ```

2. **Commit Messages**
   ```
   feat(scope): description
   fix(scope): description
   docs(scope): description
   style(scope): description
   refactor(scope): description
   test(scope): description
   chore(scope): description
   ```

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Changes Made
   - Detailed list of changes
   - With specific implementations

   ## Screenshots
   If applicable, add screenshots

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Integration tests added/updated
   - [ ] Manual testing completed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] All tests passing
   ```

## 🐛 Bug Reports

Use the bug report template:

```markdown
### Description
Clear description of the bug

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Screenshots
If applicable

### Environment
- Browser:
- OS:
- Node version:
- pnpm version:
```

## 💡 Feature Requests

Use the feature request template:

```markdown
### Problem
Description of the problem this feature solves

### Proposed Solution
Detailed description of proposed solution

### Alternative Solutions
Other solutions considered

### Additional Context
Any other context or screenshots
```

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 📄 License

By contributing to Pet Care SaaS, you agree that your contributions will be licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
