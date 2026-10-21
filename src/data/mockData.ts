import { MetricCard, Transaction, Product, FeedPost, TaskItem } from '../types';

export const METRIC_CARDS: MetricCard[] = [
  {
    id: 'm1',
    label: 'Total Net Revenue',
    value: '$148,920.40',
    change: '+14.2%',
    isPositive: true,
    period: 'vs previous 30 days',
  },
  {
    id: 'm2',
    label: 'Active Customers',
    value: '12,482',
    change: '+8.1%',
    isPositive: true,
    period: 'vs previous 30 days',
  },
  {
    id: 'm3',
    label: 'Average Order Value',
    value: '$94.65',
    change: '-2.4%',
    isPositive: false,
    period: 'vs previous 30 days',
  },
  {
    id: 'm4',
    label: 'Conversion Rate',
    value: '3.82%',
    change: '+0.6%',
    isPositive: true,
    period: 'vs previous 30 days',
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9021',
    customer: 'Elena Rostova',
    email: 'elena.rostova@nexus.dev',
    amount: '$1,420.00',
    status: 'Completed',
    date: 'Oct 20, 2026 · 14:32',
    method: 'Credit Card',
  },
  {
    id: 'TXN-9020',
    customer: 'Marcus Thorne',
    email: 'm.thorne@vanguard.io',
    amount: '$350.00',
    status: 'Completed',
    date: 'Oct 20, 2026 · 12:15',
    method: 'Wire Transfer',
  },
  {
    id: 'TXN-9019',
    customer: 'Sophia Chen',
    email: 'sophia@archdesign.studio',
    amount: '$2,890.50',
    status: 'Processing',
    date: 'Oct 19, 2026 · 18:44',
    method: 'Credit Card',
  },
  {
    id: 'TXN-9018',
    customer: 'David Kim',
    email: 'dkim@hyperion.tech',
    amount: '$89.00',
    status: 'Pending',
    date: 'Oct 19, 2026 · 11:02',
    method: 'PayPal',
  },
  {
    id: 'TXN-9017',
    customer: 'Amina Diallo',
    email: 'amina@solaris.africa',
    amount: '$640.00',
    status: 'Completed',
    date: 'Oct 18, 2026 · 09:20',
    method: 'Credit Card',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Acoustic Precision Wireless Headphones',
    category: 'Audio Equipment',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 148,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'High-fidelity audio monitors engineered with custom planar magnetic transducers and ambient dampening aluminum chassis.',
    inStock: true,
    badge: 'Flagship Edition',
  },
  {
    id: 'p2',
    title: 'Minimalist Mechanical Desk Timepiece',
    category: 'Workspace',
    price: 180,
    rating: 4.8,
    reviewsCount: 92,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Machined anodized aluminum casing with silent sweep Swiss movement and anti-reflective mineral glass dial.',
    inStock: true,
  },
  {
    id: 'p3',
    title: 'Artisan Ceramic Pour-Over Carafe',
    category: 'Living & Dining',
    price: 85,
    originalPrice: 95,
    rating: 4.7,
    reviewsCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-thrown stoneware vessel glazed in matte chalk finish, designed for consistent extraction and thermal stability.',
    inStock: true,
  },
  {
    id: 'p4',
    title: 'Vegetable-Tanned Leather Portfolio Case',
    category: 'Accessories',
    price: 220,
    rating: 4.9,
    reviewsCount: 110,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: 'Full-grain Italian bridle leather with solid brass snap hardware and padded compartment fitting up to 16-inch laptops.',
    inStock: true,
    badge: 'Limited Run',
  },
  {
    id: 'p5',
    title: 'Titanium Field Writing Instrument',
    category: 'Workspace',
    price: 125,
    rating: 4.6,
    reviewsCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    description: 'Grade 5 titanium bolt-action pen balanced at center of gravity with Schmidt pressurized cartridge refill.',
    inStock: false,
  },
  {
    id: 'p6',
    title: 'Wool & Linen Architectural Throw',
    category: 'Living & Dining',
    price: 165,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    description: 'Jacquard-woven Scandinavian merino blend offering tactile warmth and clean geometric drape lines.',
    inStock: true,
  },
];

export const FEED_POSTS: FeedPost[] = [
  {
    id: 'fp1',
    authorName: 'Soren Lindqvist',
    authorHandle: '@soren.design',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    timestamp: '2 hours ago',
    category: 'Industrial Design',
    title: 'Principles of Subtractive Architecture in Consumer Audio',
    content: 'When stripping away every ornamental bevel and decorative badge, what remains is the pure tactile dialogue between user and mechanical interface. Here is our breakdown of our latest enclosure prototypes.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    likes: 342,
    commentsCount: 28,
    isLiked: false,
    isSaved: true,
    tags: ['Acoustics', 'Materials', 'Hardware'],
  },
  {
    id: 'fp2',
    authorName: 'Camille Beaumont',
    authorHandle: '@cbeaumont',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    timestamp: '5 hours ago',
    category: 'Spatial Systems',
    title: 'Lighting Orchestration for Modern Exhibition Pavilions',
    content: 'Direct natural sunlight through diffused clerestory glass creates rhythmic shadow anchors throughout the daytime cycle, reducing artificial luminaire demand by 62%.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    likes: 519,
    commentsCount: 45,
    isLiked: true,
    isSaved: false,
    tags: ['Architecture', 'NaturalLight', 'Sustainability'],
  },
];

export const TASKS: TaskItem[] = [
  {
    id: 'task-101',
    title: 'Finalize thermal testing matrix for enclosure rev 3',
    description: 'Run 48-hour continuous load stress test under 40°C ambient chamber conditions.',
    status: 'in_progress',
    priority: 'high',
    assignee: {
      name: 'Kai Takahashi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    dueDate: 'Oct 24, 2026',
    subtasksCompleted: 4,
    totalSubtasks: 5,
  },
  {
    id: 'task-102',
    title: 'Review supplier certificates for Grade 5 Titanium stock',
    description: 'Verify chemical composition and tensile tolerance documentation with Swiss metallurgical auditor.',
    status: 'review',
    priority: 'medium',
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    dueDate: 'Oct 25, 2026',
    subtasksCompleted: 3,
    totalSubtasks: 3,
  },
  {
    id: 'task-103',
    title: 'Audit packaging drop-resistance and unboxing feel',
    description: 'Conduct standardized 1.5m drop cycles and record decibel acoustic response of magnetic closure.',
    status: 'backlog',
    priority: 'low',
    assignee: {
      name: 'Julian Vance',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    },
    dueDate: 'Oct 28, 2026',
    subtasksCompleted: 1,
    totalSubtasks: 4,
  },
  {
    id: 'task-104',
    title: 'Deploy firmware v2.1.0 update to pilot batch units',
    description: 'Verified power distribution curves and Bluetooth LE pairing handshakes across 50 test hardware units.',
    status: 'done',
    priority: 'high',
    assignee: {
      name: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    dueDate: 'Oct 18, 2026',
    subtasksCompleted: 6,
    totalSubtasks: 6,
  },
];

export const SAMPLE_HTML_TEMPLATES: { id: string; name: string; description: string; html: string }[] = [
  {
    id: 'portfolio-screen',
    name: 'Architectural Showroom Screen',
    description: 'Curated studio hero with hotlinked photography, clean specs, and structured actions.',
    html: `<div class="bg-white p-8 rounded-xl border border-slate-200">
  <div class="flex items-center justify-between pb-6 border-b border-slate-100">
    <h2 class="text-2xl font-bold text-slate-900">Nordic Living Atelier</h2>
    <span class="text-sm text-slate-500">Copenhagen Studio</span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
    <div>
      <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Minimalist living room pavilion" class="w-full h-72 object-cover rounded-lg" />
      <p class="text-sm text-slate-600 mt-3 leading-relaxed">Solid Douglas fir timbers paired with brushed travertine flooring and acoustic wool panelling.</p>
    </div>
    <div class="space-y-4">
      <h3 class="text-xl font-semibold text-slate-900">Project Specifications</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p><strong>Footprint:</strong> 340 sq meters</p>
        <p><strong>Primary Material:</strong> Untreated Douglas Fir & Gotland Limestone</p>
        <p><strong>Completion:</strong> Autumn 2026</p>
      </div>
      <div class="pt-4">
        <button class="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
          Download Architectural Blueprint
        </button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'product-card-screen',
    name: 'Luxury Chronograph Screen',
    description: 'High-end watch presentation screen with specification grid and purchasing action.',
    html: `<div class="bg-slate-950 text-slate-100 p-8 rounded-xl border border-slate-800">
  <div class="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center">
    <div class="w-full md:w-1/2">
      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" alt="Monochrome sports watch" class="w-full h-80 object-cover rounded-lg" />
    </div>
    <div class="w-full md:w-1/2 space-y-4">
      <span class="text-xs tracking-wider text-indigo-400 font-mono">SERIES 04 · AUTOMATIC</span>
      <h2 class="text-3xl font-bold tracking-tight text-white">Chronometer Noir 42mm</h2>
      <p class="text-slate-400 text-sm leading-relaxed">Ceramic bezel with matte DLC coating, 72-hour power reserve, and sapphire display back.</p>
      <div class="text-2xl font-bold font-mono text-white pt-2">$4,250.00</div>
      <div class="flex gap-3 pt-4">
        <button class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors">Order Timepiece</button>
        <button class="px-4 py-2.5 border border-slate-700 hover:border-slate-500 text-slate-300 text-sm rounded-lg transition-colors">Specs Sheet</button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'user-profile-screen',
    name: 'Executive Member Screen',
    description: 'Clean profile layout with hotlinked avatar, metrics, and recent activities.',
    html: `<div class="bg-white p-6 rounded-xl border border-slate-200">
  <div class="flex items-center gap-5 pb-6 border-b border-slate-100">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Astrid Lindholm" class="w-20 h-20 rounded-full object-cover border-2 border-slate-200" />
    <div>
      <h3 class="text-xl font-bold text-slate-900">Astrid Lindholm</h3>
      <p class="text-sm text-slate-500">Principal Design Systems Architect · Zurich</p>
      <p class="text-xs text-slate-400 font-mono mt-1">astrid@designsystems.ch · Member since 2021</p>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-4 py-6 text-center border-b border-slate-100">
    <div>
      <div class="text-2xl font-bold font-mono text-slate-900">142</div>
      <div class="text-xs text-slate-500">Components Built</div>
    </div>
    <div>
      <div class="text-2xl font-bold font-mono text-slate-900">98.4%</div>
      <div class="text-xs text-slate-500">Accessibility Score</div>
    </div>
    <div>
      <div class="text-2xl font-bold font-mono text-slate-900">38k</div>
      <div class="text-xs text-slate-500">Weekly Imports</div>
    </div>
  </div>
  <div class="pt-4 flex justify-end gap-3">
    <button class="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">View Repositories</button>
    <button class="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800">Contact Astrid</button>
  </div>
</div>`,
  },
];
