export type ScreenId = 'dashboard' | 'storefront' | 'feed' | 'tasks' | 'importer';

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Processing';
  date: string;
  method: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  timestamp: string;
  category: string;
  title: string;
  content: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  subtasksCompleted: number;
  totalSubtasks: number;
}

export interface ExtractedAsset {
  id: string;
  type: 'image' | 'link' | 'heading';
  value: string;
  alt?: string;
  status?: 'loaded' | 'error' | 'testing';
}
