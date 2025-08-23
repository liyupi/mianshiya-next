import { API } from '@/api/typings';

// 假用户数据
const mockUsers: API.UserVO[] = [
  {
    id: 1,
    userName: "张三",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    userProfile: "前端开发工程师，热爱技术分享",
    userRole: "user",
    createTime: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    userName: "李四",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    userProfile: "全栈开发工程师，专注于React和Node.js",
    userRole: "user",
    createTime: "2024-01-02T00:00:00Z"
  }
];

// 假文章数据
export const mockArticles: API.ArticleVO[] = [
  {
    id: 1,
    title: "React 18 新特性详解：并发渲染与自动批处理",
    summary: "React 18 带来了许多激动人心的新特性，包括并发渲染、自动批处理、Suspense 服务端渲染等。",
    content: `# React 18 新特性详解

## 并发渲染 (Concurrent Rendering)

React 18 最重要的新特性就是并发渲染。它允许 React 中断和恢复渲染工作，从而提供更好的用户体验。

### 主要优势

1. **更好的响应性**：用户交互不会被长时间渲染阻塞
2. **更流畅的动画**：动画和过渡效果更加流畅
3. **更好的用户体验**：页面响应更快

## 自动批处理 (Automatic Batching)

React 18 默认启用自动批处理，这意味着多个状态更新会被自动合并到一次重新渲染中。

## 总结

React 18 的这些新特性为 React 应用带来了更好的性能和用户体验。`,
    tagList: ["React", "前端", "JavaScript"],
    category: "前端开发",
    createTime: "2024-08-20T10:00:00Z",
    updateTime: "2024-08-20T10:00:00Z",
    user: mockUsers[0],
    userId: 1,
    favourNum: 156,
    thumbNum: 89,
    viewCount: 2341,
    hasFavour: false,
    hasThumb: false
  },
  {
    id: 2,
    title: "TypeScript 高级类型技巧：条件类型与映射类型",
    summary: "TypeScript 的类型系统非常强大，条件类型和映射类型是其中最重要的高级特性。",
    content: `# TypeScript 高级类型技巧

## 条件类型 (Conditional Types)

条件类型允许我们根据输入类型来决定输出类型。

### 基本语法

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

## 映射类型 (Mapped Types)

映射类型允许我们从一个类型创建另一个类型。

### 基本语法

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## 总结

条件类型和映射类型是 TypeScript 类型系统的核心特性。`,
    tagList: ["TypeScript", "类型系统", "前端"],
    category: "前端开发",
    createTime: "2024-08-19T14:30:00Z",
    updateTime: "2024-08-19T16:45:00Z",
    user: mockUsers[1],
    userId: 2,
    favourNum: 203,
    thumbNum: 127,
    viewCount: 3456,
    hasFavour: true,
    hasThumb: false
  }
];

// 获取文章列表（支持分页和搜索）
export function getMockArticles(params: {
  current?: number;
  pageSize?: number;
  searchText?: string;
  category?: string;
  sortField?: string;
  sortOrder?: string;
}): { records: API.ArticleVO[]; total: number; current: number; pageSize: number } {
  let filteredArticles = [...mockArticles];
  
  // 搜索过滤
  if (params.searchText) {
    const searchLower = params.searchText.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title?.toLowerCase().includes(searchLower) ||
      article.content?.toLowerCase().includes(searchLower) ||
      article.summary?.toLowerCase().includes(searchLower)
    );
  }
  
  // 分类过滤
  if (params.category) {
    filteredArticles = filteredArticles.filter(article => 
      article.category === params.category
    );
  }
  
  // 排序
  if (params.sortField && params.sortOrder) {
    filteredArticles.sort((a, b) => {
      const aValue = a[params.sortField as keyof API.ArticleVO];
      const bValue = b[params.sortField as keyof API.ArticleVO];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return params.sortOrder === 'ascend' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return params.sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }
  
  const total = filteredArticles.length;
  const current = params.current || 1;
  const pageSize = params.pageSize || 10;
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  const records = filteredArticles.slice(start, end);
  
  return {
    records,
    total,
    current,
    pageSize
  };
}

// 根据 ID 获取文章详情
export function getMockArticleById(id: number): API.ArticleVO | undefined {
  return mockArticles.find(article => article.id === id);
}

// 获取所有分类
export function getMockCategories(): string[] {
  const categories = new Set(mockArticles.map(article => article.category).filter(Boolean));
  return Array.from(categories);
}
