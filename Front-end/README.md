# Mini Headless CMS - Dashboard UI

A production-ready React + Bootstrap 5 dashboard for a headless CMS platform. Built with clean architecture, reusable components, and responsive design.

## 📦 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Fixed sidebar navigation
│   ├── Topbar.jsx           # Header with user info
│   ├── StatCard.jsx         # Stat card component
│   ├── ActionButton.jsx     # Reusable action button
│   ├── PostItem.jsx         # Post list item component
│   └── index.js             # Component exports
│
├── layouts/
│   └── DashboardLayout.jsx  # Main layout wrapper
│
├── pages/
│   └── Dashboard.jsx        # Dashboard page
│
├── styles/                  # Additional styles if needed
├── App.js                   # Main app component
├── App.css                  # Global styles
├── index.js                 # Entry point
└── index.css                # Base styles
```

## 🚀 Features

### 1. **Sidebar Navigation**
- Fixed left sidebar with dark Bootstrap theme
- Collapsible navigation (expand/collapse button)
- Active navigation indicators
- Logout button
- Responsive (hidden on mobile)

### 2. **Topbar Header**
- Sticky page title display
- User profile dropdown
- Notification bell with badge
- Settings button
- Fully responsive

### 3. **Dashboard Content**
- **Welcome Section**: Personalized greeting
- **Stat Cards**: Display key metrics (Total Posts, Published, Drafts)
  - Animated hover effects
  - Trend indicators (up/down)
  - Responsive grid layout
  
- **Quick Actions**: Button group for common tasks
  - Create New Post
  - Import Assets
  - Settings
  
- **Recent Posts Table**:
  - Sortable/filterable post list
  - Status badges (Published/Draft)
  - Author and date information
  - Edit/Delete actions
  - Fully responsive table

### 4. **Design & Styling**
- Bootstrap 5 only (no Tailwind)
- Responsive grid system
- Smooth animations and transitions
- Hover effects on interactive elements
- Mobile-optimized layout
- Professional color scheme

## 🛠️ Component API

### `<Sidebar />`
Renders the fixed sidebar navigation.

```jsx
<Sidebar />
```

**Props**: None (uses internal state)

---

### `<Topbar pageTitle="Overview" />`
Renders the sticky header topbar.

**Props**:
- `pageTitle` (string): Page title to display

```jsx
<Topbar pageTitle="Overview" />
```

---

### `<StatCard />`
Renders a statistic card with icon, value, and trend.

**Props**:
- `title` (string): Card title
- `value` (string): Main value display
- `icon` (string): Bootstrap icon class
- `bgColor` (string): Background color (primary, success, warning, etc.)
- `trend` (object): Trend data `{ type: 'up'|'down', value: number }`

```jsx
<StatCard
  title="Total Posts"
  value="24"
  icon="bi-file-earmark-text"
  bgColor="primary"
  trend={{ type: 'up', value: 12 }}
/>
```

---

### `<ActionButton />`
Reusable action button component.

**Props**:
- `label` (string): Button text
- `icon` (string): Bootstrap icon class
- `variant` (string): Button style variant (primary, secondary, outline-*)
- `onClick` (function): Click handler
- `disabled` (boolean): Disabled state
- `size` (string): Button size (sm, md, lg)

```jsx
<ActionButton
  label="Create Post"
  icon="bi-plus-circle"
  variant="primary"
  onClick={handleCreate}
/>
```

---

### `<PostItem />`
Renders a single post row in the table.

**Props**:
- `id` (number): Post ID
- `title` (string): Post title
- `status` (string): 'published' or 'draft'
- `author` (string): Author name
- `createdAt` (Date): Creation date
- `onEdit` (function): Edit callback
- `onDelete` (function): Delete callback

```jsx
<PostItem
  id={1}
  title="Post Title"
  status="published"
  author="John Doe"
  createdAt={new Date()}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

### `<DashboardLayout>`
Wraps pages with sidebar and topbar.

**Props**:
- `children` (React.ReactNode): Page content
- `pageTitle` (string): Page title for topbar

```jsx
<DashboardLayout pageTitle="Overview">
  <YourPageContent />
</DashboardLayout>
```

---

## 📱 Responsive Breakpoints

- **Desktop (≥769px)**: Full sidebar visible, normal layout
- **Tablet (577px - 768px)**: Responsive grid, adjusted spacing
- **Mobile (≤576px)**: Sidebar hidden, single column layout, touch-friendly

## 🎨 Bootstrap Classes Used

The project extensively uses Bootstrap 5 utility classes:

- **Layout**: `container`, `container-fluid`, `row`, `col-*`
- **Components**: `card`, `badge`, `btn`, `dropdown`, `table`
- **Utilities**: `d-flex`, `align-items-center`, `justify-content-between`, `gap-*`
- **Typography**: `fw-bold`, `text-muted`, `fs-5`
- **Colors**: `bg-primary`, `bg-success`, `text-danger`
- **Spacing**: `p-*`, `m-*`, `mb-*`, `gap-*`

## 🔧 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install bootstrap
   ```

2. **Ensure Bootstrap is imported** in `index.js`:
   ```javascript
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

3. **Use Bootstrap Icons** (add to `public/index.html`):
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
   ```

## 🚀 Usage Example

### Basic Setup in App.js

```jsx
import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
```

### Creating a New Page

```jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const MyPage = () => {
  return (
    <DashboardLayout pageTitle="My Page">
      <div className="container-fluid p-4">
        {/* Your content here */}
      </div>
    </DashboardLayout>
  );
};

export default MyPage;
```

## 📝 Customization

### Change Color Scheme

Edit CSS variables in `App.css`:

```css
:root {
  --primary-color: #0d6efd;
  --success-color: #198754;
  --warning-color: #ffc107;
  --danger-color: #dc3545;
}
```

### Modify Sidebar Items

Edit `Sidebar.jsx`:

```jsx
const navigationItems = [
  { id: 1, label: 'Dashboard', icon: 'bi-speedometer2', route: '/' },
  { id: 2, label: 'Posts', icon: 'bi-file-text', route: '/posts' },
  // Add more items
];
```

### Add More Stat Cards

Edit `Dashboard.jsx` stats array:

```jsx
const stats = [
  {
    title: 'Custom Metric',
    value: '99',
    icon: 'bi-star',
    bgColor: 'warning',
    trend: { type: 'up', value: 5 },
  },
  // Add more
];
```

## 🎯 Best Practices

1. **Component Reusability**: All components are self-contained and reusable
2. **Clean Props**: Components accept only necessary props
3. **Bootstrap Only**: No external CSS frameworks or libraries
4. **Responsive Design**: Mobile-first approach using Bootstrap grid
5. **Performance**: Minimal re-renders using React hooks
6. **Accessibility**: Semantic HTML and proper ARIA labels
7. **Scalability**: Easy to add new pages and components

## 📦 Dependencies

- **React**: UI library
- **React DOM**: React rendering
- **Bootstrap 5**: CSS framework
- **Bootstrap Icons**: Icon library (via CDN)

## 📄 License

This project is open-source and available for commercial use.

## 💡 Tips

- Use `<ActionButton>` for all action buttons to maintain consistency
- Use `<StatCard>` for displaying metrics
- Use `<DashboardLayout>` to wrap all admin pages
- Import from `components/index.js` for cleaner imports
- Leverage Bootstrap utilities for quick styling

## 🔗 Useful Links

- [Bootstrap 5 Docs](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Docs](https://react.dev/)
- [Bootstrap Colors](https://getbootstrap.com/docs/5.0/utilities/colors/)

---

**Built with ❤️ using React + Bootstrap 5**
