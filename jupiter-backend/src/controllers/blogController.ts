import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn('Prisma Client initialised with warning; blog in-memory fallback active.');
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  date: string;
  image: string;
  tags: string[];
  keyTakeaways: string[];
  views: number;
}

// Helper to format Prisma blog records to match API interface
const formatBlog = (b: any): BlogArticle => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  content: b.content,
  category: b.category,
  readTime: b.readTime,
  author: {
    name: b.authorName || b.author?.name || 'Jupiter Editorial Team',
    role: b.authorRole || b.author?.role || 'Technical Specialist',
    avatar: b.authorAvatar || b.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  authorName: b.authorName || b.author?.name,
  authorRole: b.authorRole || b.author?.role,
  authorAvatar: b.authorAvatar || b.author?.avatar,
  date: b.date,
  image: b.image,
  tags: b.tags || [],
  keyTakeaways: b.keyTakeaways || [],
  views: b.views || 0,
});

// In-memory persistent collection initialized with high-value industrial manufacturing guides
let blogsList: BlogArticle[] = [
  {
    id: 'BLOG-01',
    slug: 'complete-guide-fly-ash-brick-manufacturing-plant-setup',
    title: 'Complete Guide to Setting Up a Fully Automatic Fly Ash Brick Plant in 2024',
    excerpt: 'Step-by-step roadmap covering land requirement, raw material mix ratio, machinery selection, and government subsidy schemes in India.',
    content: `Fly ash bricks have revolutionized modern construction across India due to their uniform shape, high compressive strength (up to 12-14 N/mm²), and low water absorption. For entrepreneurs and construction contractors, establishing an automatic fly ash brick plant provides substantial return on investment.

### 1. Land & Power Requirements
To install a standard 8-cavity or 10-cavity automatic brick making unit with pan mixer, batching bins, conveyor belts, and hydraulic stacking system, you require:
- **Total Area:** 0.75 to 1.5 Acres (including open yard curing and raw material stockpiles)
- **Covered Shed:** 2,500 - 3,500 sq.ft for machine unit and electrical PLC panel
- **Connected Power:** 25 HP to 45 HP 3-Phase connected load
- **Water Supply:** 3,000 - 5,000 Litres / day for batch mixing and water curing

### 2. Standard Raw Material Formulation
The ideal mix ratio by weight for high-density fly ash bricks:
- **Fly Ash (Class F or C):** 55% - 60%
- **Sand / Stone Dust:** 20% - 25%
- **Hydrated Lime or OPC 53 Cement:** 8% - 12%
- **Gypsum:** 3% - 5%

### 3. Key Machinery Components in Turnkey Line
1. **Planetary Pan Mixer:** High torque gear-driven mixing arms ensure zero lumps.
2. **Hydraulic Press Unit:** 80 to 120 Ton compressive hydraulic pressure ensures sharp edges.
3. **Automatic Pallet Feeder & Stacker:** Reduces manual labour by 70%.
4. **Colour Feeder Attachment:** Optional feeder for multi-colour interlocking paver blocks.

### 4. Government Subsidies & Environmental Norms
Under state industrial policies and PMEGP/MSME subsidy schemes, project subsidies up to 25% - 35% on capital machinery are accessible with guaranteed bank credit assistance.`,
    category: 'Brick Making',
    readTime: '6 min read',
    author: {
      name: 'Er. R. Sundaram',
      role: 'Chief Technical Director, Jupiter Industries',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    authorName: 'Er. R. Sundaram',
    authorRole: 'Chief Technical Director, Jupiter Industries',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    date: '10 Sep 2024',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Fly Ash Bricks', 'Plant Setup', 'Project Report', 'Subsidies'],
    keyTakeaways: [
      'Mix ratio: 60% Fly ash, 25% Stone dust, 10% Cement/Lime, 5% Gypsum',
      'Requires 25-40 HP power & 1 acre land footprint',
      'Eligible for MSME capital investment subsidies up to 35%',
      'Daily production output ranges from 8,000 to 18,000 bricks/shift',
    ],
    views: 1420,
  },
  {
    id: 'BLOG-02',
    slug: 'concrete-block-machine-vs-fly-ash-brick-machine-comparison',
    title: 'Concrete Hollow Block Machine vs Fly Ash Brick Machine: Which is More Profitable?',
    excerpt: 'Detailed comparison of capital costs, market demand, per-unit profit margins, and production speeds to help you invest wisely.',
    content: `When venturing into precast machinery manufacturing, one of the most critical decisions is whether to invest in a dedicated Concrete Hollow Block Machine or a High-Pressure Fly Ash Brick Plant.

### 1. Market Demand & Applications
- **Concrete Hollow & Solid Blocks:** Ideal for commercial high-rise buildings, compound walls, load-bearing exterior walls, and seismic-resistant frameworks.
- **Fly Ash Bricks:** Primary substitute for traditional red clay bricks in residential houses, government infrastructure, and apartments.

### 2. Profit Margin Analysis
- **Cost of production (Concrete Block 8-inch):** ₹28 - ₹34 per block. Market selling price: ₹45 - ₹55 per block. Net profit: ₹12 - ₹18/block.
- **Cost of production (Fly Ash Brick):** ₹3.20 - ₹3.80 per brick. Market selling price: ₹5.50 - ₹7.00 per brick. Net profit: ₹1.80 - ₹2.50/brick.

### 3. Production Cycle & Curing
Concrete block machines utilize vibration tables with hydraulic compression to demould blocks instantly onto wooden or PVC pallets, enabling rapid water curing within 14 days.`,
    category: 'Concrete Blocks',
    readTime: '5 min read',
    author: {
      name: 'K. Balakrishnan',
      role: 'Senior Machinery Consultant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    authorName: 'K. Balakrishnan',
    authorRole: 'Senior Machinery Consultant',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    date: '28 Aug 2024',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    tags: ['Concrete Blocks', 'Profitability', 'Precast Plants', 'Machinery ROI'],
    keyTakeaways: [
      'Concrete blocks offer higher per-unit profit margin (₹12-18/block)',
      'Fly ash bricks offer higher daily volumetric turnover (10,000+ units/day)',
      'Dual-purpose Jupiter machinery can manufacture both blocks and bricks with quick mould changeover',
    ],
    views: 980,
  },
  {
    id: 'BLOG-03',
    slug: 'hydraulic-power-pack-preventative-maintenance-checklist',
    title: 'Top 7 Preventative Maintenance Rules for Hydraulic Brick & Block Machines',
    excerpt: 'Avoid costly plant downtime and maintain 100-ton clamping force with these essential daily and weekly maintenance routines.',
    content: `Hydraulic power packs and electrical PLC panels are the heart of automated brick and block machinery. Without timely preventative care, oil overheating, seal wear, and pressure drops can reduce plant efficiency by over 30%.

### Daily Checklist:
1. **Hydraulic Oil Level & Temperature:** Verify the oil level sight glass. Oil temperature must remain between 40°C to 55°C during continuous operation.
2. **Greasing Moving Pillars:** Apply high-grade lithium grease to hard-chrome tie bars and guide bush shafts every 8 hours.
3. **Mould Cleaning:** Clear any settled concrete or aggregate residue from mould cavity teeth after each production shift.

### Weekly Checklist:
1. **Filter Cleaning:** Inspect suction strainer and return line hydraulic filters. Clean with solvent or replace if clogged.
2. **Hydraulic Hose & Valve Tightening:** Check for micro-leaks around manifold valves and high-pressure hose crimps.
3. **Electrical Panel Dust Blowout:** Use dry compressed air to remove stone dust from contactors, SMPS, and PLC terminals.`,
    category: 'Maintenance',
    readTime: '4 min read',
    author: {
      name: 'M. Senthil Kumar',
      role: 'Head of Service Engineering',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    authorName: 'M. Senthil Kumar',
    authorRole: 'Head of Service Engineering',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    date: '15 Aug 2024',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    tags: ['Hydraulics', 'Maintenance', 'Machine Care', 'PLC Automation'],
    keyTakeaways: [
      'Maintain hydraulic oil temperature under 55°C',
      'Daily greasing of chrome tie bars prevents premature seal failure',
      'Replace hydraulic return filters every 1,500 operating hours',
    ],
    views: 1240,
  },
  {
    id: 'BLOG-04',
    slug: 'hollow-block-vs-solid-block-manufacturing-comparison',
    title: 'Hollow Blocks vs Solid Blocks: Machinery Selection & Profitability Comparison',
    excerpt: 'Detailed cost-benefit analysis of producing hollow concrete blocks vs solid masonry units for commercial builders.',
    content: `Choosing between hollow block and solid block machinery depends on regional market demand, architectural requirements, and raw material availability. Hollow blocks offer lighter dead weight and superior acoustic/thermal insulation, whereas solid blocks provide unmatched load-bearing strength.

### Key Production Metrics
- **Cycle Time:** 20-25 seconds per mould stroke
- **Curing Time:** 14-21 days water curing or 24 hours steam curing
- **Compressive Strength:** Solid blocks (7.5 - 15 N/mm²), Hollow blocks (3.5 - 7 N/mm²)

### Mould Versatility
With Jupiter block machines, changing moulds from standard 8" hollow block to 4" partition blocks or solid bricks takes under 45 minutes.`,
    category: 'Concrete Blocks',
    readTime: '5 min read',
    author: {
      name: 'P. Murugan',
      role: 'Senior Production Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    authorName: 'P. Murugan',
    authorRole: 'Senior Production Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    date: '28 Jul 2024',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    tags: ['Hollow Block', 'Solid Block', 'Concrete Machinery', 'Profitability'],
    keyTakeaways: [
      'Hollow blocks reduce structural building weight and cement consumption',
      'Dual vibration systems ensure maximum aggregate compaction',
      'Quick-change mould designs maximize plant operational versatility',
    ],
    views: 980,
  },
  {
    id: 'BLOG-05',
    slug: 'government-subsidies-pmegp-msme-brick-plant-india',
    title: 'Complete Guide to PMEGP & MSME Subsidies for Brick & Block Manufacturing in India',
    excerpt: 'How to claim up to 35% government capital subsidy on brick and paver machinery with guaranteed bank project loan approval.',
    content: `The Government of India actively prioritizes eco-friendly construction materials like fly ash bricks and paver blocks through schemes like PMEGP and state MSME capital subsidy policies.

### Subsidy Percentages Under PMEGP:
- **General Category (Urban):** 15% Project Cost Subsidy
- **General Category (Rural):** 25% Project Cost Subsidy
- **Special Category / SC / ST / Women / Ex-Servicemen (Urban):** 25% Subsidy
- **Special Category / SC / ST / Women / Ex-Servicemen (Rural):** 35% Subsidy`,
    category: 'Business & Subsidies',
    readTime: '7 min read',
    author: {
      name: 'Er. R. Sundaram',
      role: 'Chief Technical Director, Jupiter Industries',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    authorName: 'Er. R. Sundaram',
    authorRole: 'Chief Technical Director, Jupiter Industries',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    date: '05 Jul 2024',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=800&q=80',
    tags: ['PMEGP Subsidy', 'MSME Loan', 'Project Report', 'Bank Finance'],
    keyTakeaways: [
      'Up to 35% capital subsidy for rural and special category entrepreneurs',
      'Bank credit link up to 90-95% of total project cost',
      'Jupiter Industries provides certified project reports for bank approval',
    ],
    views: 2150,
  },
];

// GET /api/blogs
export const getBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;

    let dbBlogs: any[] = [];

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        const whereClause: any = {};
        if (category && category !== 'All') {
          whereClause.category = { equals: category, mode: 'insensitive' };
        }
        if (search) {
          whereClause.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ];
        }
        dbBlogs = await prisma.blog.findMany({
          where: whereClause,
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbError) {
        console.warn('Database query for blogs failed, falling back to in-memory blogs:', dbError);
      }
    }

    if (dbBlogs && dbBlogs.length > 0) {
      res.status(200).json({
        success: true,
        count: dbBlogs.length,
        data: dbBlogs.map(formatBlog),
      });
      return;
    }

    // Fallback
    let results = [...blogsList];
    if (category && category !== 'All') {
      results = results.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:slugOrId
export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.params.slug as string;
    let blog: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        blog = await prisma.blog.findFirst({
          where: {
            OR: [{ id: slug }, { slug: slug }],
          },
        });
        if (blog) {
          // Increment view
          await prisma.blog.update({
            where: { id: blog.id },
            data: { views: { increment: 1 } },
          }).catch(() => {});
          blog.views += 1;
        }
      } catch (dbError) {
        console.warn('Database query for single blog failed:', dbError);
      }
    }

    if (!blog) {
      const memBlog = blogsList.find(b => b.slug === slug || b.id === slug);
      if (memBlog) {
        memBlog.views += 1;
        blog = memBlog;
      }
    }

    if (!blog) {
      res.status(404).json({
        success: false,
        message: `Blog article '${slug}' not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: formatBlog(blog),
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/blogs
export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, excerpt, content, category, image, tags, keyTakeaways, readTime, authorName, authorRole, authorAvatar } = req.body;

    if (!title || !content) {
      res.status(400).json({
        success: false,
        message: 'Title and Content are required fields.',
      });
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let savedBlog: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        savedBlog = await prisma.blog.create({
          data: {
            slug,
            title,
            excerpt: excerpt || title.substring(0, 120),
            content,
            category: category || 'Brick Making',
            readTime: readTime || '5 min read',
            authorName: authorName || 'Jupiter Editorial Team',
            authorRole: authorRole || 'Machinery Specialist',
            authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
            tags: Array.isArray(tags) ? tags : ['Brick Machine', 'Jupiter'],
            keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : ['Heavy-duty engineering', 'Pan-India technical support'],
            views: 1,
          },
        });
      } catch (dbError) {
        console.warn('Database create blog failed, using in-memory store:', dbError);
      }
    }

    if (!savedBlog) {
      const newArticle: BlogArticle = {
        id: `BLOG-0${blogsList.length + 1}`,
        slug,
        title,
        excerpt: excerpt || title.substring(0, 120),
        content,
        category: category || 'Brick Making',
        readTime: readTime || '5 min read',
        author: {
          name: authorName || 'Jupiter Editorial Team',
          role: authorRole || 'Machinery Specialist',
          avatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        },
        authorName: authorName || 'Jupiter Editorial Team',
        authorRole: authorRole || 'Machinery Specialist',
        authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        tags: Array.isArray(tags) ? tags : ['Brick Machine', 'Jupiter'],
        keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : ['Heavy-duty engineering', 'Pan-India technical support'],
        views: 1,
      };
      blogsList.unshift(newArticle);
      savedBlog = newArticle;
    }

    res.status(201).json({
      success: true,
      message: 'Blog article published successfully.',
      data: formatBlog(savedBlog),
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id
export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    let updatedBlog: any = null;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        updatedBlog = await prisma.blog.update({
          where: { id },
          data: req.body,
        });
      } catch (dbError) {
        console.warn('Database blog update failed:', dbError);
      }
    }

    if (!updatedBlog) {
      const index = blogsList.findIndex(b => b.id === id || b.slug === id);
      if (index !== -1) {
        blogsList[index] = {
          ...blogsList[index],
          ...req.body,
        };
        updatedBlog = blogsList[index];
      }
    }

    if (!updatedBlog) {
      res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog article updated successfully',
      data: formatBlog(updatedBlog),
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    let deleted = false;

    if (prisma && process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_supabase')) {
      try {
        await prisma.blog.delete({ where: { id } });
        deleted = true;
      } catch (dbError) {
        console.warn('Database blog delete failed:', dbError);
      }
    }

    const prevLength = blogsList.length;
    blogsList = blogsList.filter(b => b.id !== id && b.slug !== id);
    if (blogsList.length < prevLength) {
      deleted = true;
    }

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Blog article not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog article deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
