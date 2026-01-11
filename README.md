# 🎓 Academic Priority Tracker

A modern, production-grade web application designed to help Computer Science students (7th/8th semester) effectively manage and prioritize their academic responsibilities over secondary activities like competitive programming and personal projects.

![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC)

## 🌟 Core Concept

**The Primary-Secondary Task System:**
- **🔴 ACADEMIC MODE**: When academic tasks are pending, secondary tasks are locked
- **🟢 FREE MODE**: When all academic tasks are complete, secondary tasks unlock with celebration animations
- **Philosophy**: Academic excellence first, personal growth second

## ✨ Key Features

### 1. Dynamic Priority Status Indicator
- Large, prominent visual indicator that's impossible to miss
- Animated transitions between ACADEMIC MODE (red) and FREE MODE (green)
- Real-time pending task counter
- Smooth color transitions and micro-animations

### 2. Academic Task Management
- ✅ Add/Edit/Delete academic tasks
- 📚 Task fields: Title, Course/Subject, Description, Due Date, Priority, Type
- 🎯 Priority levels: HIGH, MEDIUM, LOW (color-coded)
- 📅 Task types: Assignment, Exam, Project, Lab, Other
- ⚡ Overdue task highlighting with urgency indicators
- 🔄 Mark tasks as complete with satisfying animations
- 📊 Sort by due date and priority

### 3. Secondary Tasks Section (Smart Lock/Unlock)
- 🔒 Visually locked (blurred, grayed) when academic tasks are pending
- 🎉 Celebration animation when unlocking (all academic tasks completed)
- 💼 Track: Competitive Programming, Personal Projects, Learning Goals
- 🎯 Fields: Title, Category, Description, Goal/Target

### 4. Dashboard & Analytics
- 📊 Quick stats overview (pending academic, completed today, due this week, secondary goals)
- 📅 Current date/time display
- 🎨 Beautiful card-based layout with glassmorphism effects

### 5. Modern UI/UX
- 🌗 Dark mode (enabled by default)
- 📱 Fully responsive (mobile-first design)
- ✨ Smooth micro-interactions with Framer Motion
- 🎨 Clean, professional design aesthetic
- ♿ Accessibility features (ARIA labels, keyboard navigation)
- 🎯 Color-coded urgency system (overdue, today, tomorrow, this week)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Custom UI Components** (Button, Card, Badge)
- **Framer Motion** for animations
- **Lucide React** for icons
- **date-fns** for date manipulation

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** with SQLite (easily migrates to PostgreSQL)
- Type-safe database queries

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cthboss001/LIVE-NOW-2026.git
   cd LIVE-NOW-2026
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed with demo data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── academic-tasks/
│   │   │   └── route.ts          # Academic tasks API
│   │   └── secondary-tasks/
│   │       └── route.ts          # Secondary tasks API
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Main dashboard page
│   └── globals.css               # Global styles & theme
├── components/
│   ├── ui/
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card components
│   │   └── badge.tsx             # Badge component
│   ├── dashboard/
│   │   ├── priority-status.tsx   # Priority indicator
│   │   └── stats-overview.tsx    # Statistics cards
│   └── tasks/
│       ├── academic-tasks-list.tsx    # Academic tasks UI
│       └── secondary-tasks-list.tsx   # Secondary tasks UI
├── lib/
│   ├── prisma.ts                 # Prisma client instance
│   ├── utils.ts                  # Utility functions
│   └── types.ts                  # TypeScript types
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data script
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

## 🎨 Color System

### Priority Levels
- 🔴 **HIGH**: Red indicators for urgent tasks
- 🟡 **MEDIUM**: Yellow indicators for moderate priority
- 🟢 **LOW**: Green indicators for lower priority

### Status Colors
- 🔴 **ACADEMIC MODE**: Red/Orange theme when tasks are pending
- 🟢 **FREE MODE**: Green theme when all tasks are complete

### Urgency Indicators
- 🔴 **Overdue**: Red border and text
- 🟠 **Due Today**: Orange indicators
- 🟡 **Due Tomorrow**: Yellow indicators
- 🔵 **Due This Week**: Blue indicators

## 📝 Database Schema

### AcademicTask
```prisma
model AcademicTask {
  id          String   @id @default(cuid())
  title       String
  course      String
  description String?
  dueDate     DateTime
  priority    String   // HIGH, MEDIUM, LOW
  type        String   // ASSIGNMENT, EXAM, PROJECT, LAB, OTHER
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### SecondaryTask
```prisma
model SecondaryTask {
  id          String   @id @default(cuid())
  title       String
  category    String   // CP, PROJECT, LEARNING
  description String?
  goal        String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Database
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with demo data
npx prisma studio    # Open Prisma Studio (database GUI)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Usage Guide

### Managing Academic Tasks

1. **View Tasks**: All academic tasks are displayed in the left panel
2. **Priority Indicators**: Tasks are color-coded by priority and urgency
3. **Complete Tasks**: Click the circle icon to mark tasks as complete
4. **Overdue Alerts**: Overdue tasks are highlighted in red with "OVERDUE" label

### Understanding the Lock System

- **ACADEMIC MODE** 🔴: Secondary tasks section is locked and blurred
- **FREE MODE** 🟢: Secondary tasks unlock when academic queue is empty
- Complete all academic tasks to unlock secondary activities

### Secondary Tasks

- Only accessible when in FREE MODE
- Track competitive programming goals, personal projects, and learning targets
- Categories: CP (Competitive Programming), PROJECT, LEARNING

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production
For production with PostgreSQL, update `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/db_name"
```

Then run migrations:
```bash
npx prisma migrate deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Linear, Notion, and Vercel Dashboard
- Built with modern web technologies for optimal performance
- Created to help students maintain academic excellence while pursuing personal growth

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for Computer Science students who want to excel academically while pursuing their passions.
