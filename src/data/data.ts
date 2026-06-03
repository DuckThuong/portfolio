import avatarPhoto from "./avatar.jpg";

// ─── INTERFACES ──────────────────────────────────────────────────────────────

export interface Social {
  github: string;
  linkedin: string;
  facebook: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  /** URL ảnh đại diện (import từ src/data hoặc đường dẫn public) */
  avatar: string;
  /** Chữ hiển thị khi ảnh chưa tải được */
  avatarInitials: string;
  avatarColor: string;
  bio: string;
  social: Social;
  cvLink: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface TechnicalSkill {
  name: string;
  level: number;
  color: string;
}

export interface Skills {
  technical: TechnicalSkill[];
  tools: string[];
  soft: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  color: string;
  demo: string;
  github: string;
  featured: boolean;
}

export interface TimelineItem {
  year: string;
  type: "work" | "project" | "education";
  title: string;
  organization: string;
  description: string;
  icon: string;
}

export type TechBgKind = "react" | "scss" | "code";

/** Phần tử nền trang trí (React / SCSS) — chỉnh vị trí & nội dung tại đây */
export interface TechBgItem {
  id: string;
  kind: TechBgKind;
  code?: string;
  top: string;
  left?: string;
  right?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export interface PortfolioData {
  profile: Profile;
  stats: Stat[];
  skills: Skills;
  projects: Project[];
  timeline: TimelineItem[];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const portfolioData: PortfolioData = {
  profile: {
    name: "Trịnh Đức Thưởng",
    title: "FrontEnd ReactJS Developer",
    tagline: "Biến ý tưởng thành giao diện đẹp — từng dòng code một.",
    email: "trinhthuong26022003@gmail.com",
    phone: "0868 472 032",
    location: "Hà Nội, Việt Nam",
    avatar: avatarPhoto,
    avatarInitials: "TT",
    avatarColor: "#6C63FF",
    bio: "Frontend Developer tập trung vào React và TypeScript — thích biến wireframe thành giao diện mượt, dễ bảo trì. Đã làm sản phẩm từ đặt vé, logistics đến e-commerce và ERP. Đang tìm team nơi có thể học thêm, đóng góp code chất lượng và làm việc cùng designer/backend hiệu quả.",
    social: {
      github: "https://github.com/DuckThuong",
      linkedin:
        "https://www.linkedin.com/in/tr%E1%BB%8Bnh-%C4%91%E1%BB%A9c-th%C6%B0%E1%BB%9Fng-a75669413",
      facebook: "https://www.facebook.com/duck.thuongggg/",
    },
    cvLink:
      "https://www.topcv.vn/xem-cv/BgQHAlcFVwVXVQVWXAUBUAVVAgEIWgJVW1FQAQ0924",
  },

  stats: [
    { label: "Dự án hoàn thành", value: "6" },
    { label: "Năm kinh nghiệm", value: "2" },
    { label: "Công nghệ", value: "8+" },
    { label: "Commits GitHub", value: "~ 300+" },
  ],

  skills: {
    technical: [
      { name: "HTML5 / CSS3", level: 90, color: "#E34F26" },
      { name: "ReactJS", level: 85, color: "#61DAFB" },
      { name: "Ant Design", level: 80, color: "#147f92" },
      { name: "JavaScript (ES6+)", level: 80, color: "#F7DF1E" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "TanStack Query", level: 80, color: "#14af2e" },
      { name: "Git / GitHub / GitLab", level: 75, color: "#F05032" },
      { name: "REST API / Axios", level: 72, color: "#FF6B35" },
      { name: "Tailwind CSS", level: 60, color: "#06B6D4" },
      { name: "Redux Toolkit", level: 60, color: "#3b0e85" },
      { name: "SASS", level: 60, color: "#74a31d" },
    ],
    tools: ["VS Code", "Figma", "Postman", "Vercel", "Firebase"],
    soft: [
      "Tư duy logic",
      "Làm việc nhóm",
      "Ham học hỏi",
      "Chủ động",
      "Giao tiếp tốt",
    ],
  },

  projects: [
    {
      id: 1,
      title: "GO-RIDE — Hệ thống đặt vé xe khách",
      description:
        "Luồng tìm chuyến → chọn ghế → thanh toán giả lập, có lọc theo tuyến và ngày. Redux Toolkit gom state booking; TanStack Query cache danh sách chuyến; UI Ant Design kết hợp SASS tùy biến theme.",
      tech: [
        "React",
        "Redux Toolkit",
        "SASS",
        "Ant Design",
        "TanStack Query",
        "HTML5",
        "CSS3",
      ],
      image: "🚌",
      color: "#6C63FF",
      demo: "https://fe-bookings-sigma.vercel.app/",
      github: "https://github.com/DuckThuong/fe-bookings",
      featured: true,
    },
    {
      id: 2,
      title: "MVL Logistics — Landing page công ty vận tải",
      description:
        "Trang giới thiệu dịch vụ vận chuyển: hero, bảng giá, FAQ và form liên hệ có validate. Layout responsive; CSS Modules tách style theo block; Axios + TanStack Query xử lý gửi form.",
      tech: [
        "React",
        "SASS",
        "Ant Design",
        "TanStack Query",
        "CSS Modules",
        "Axios",
      ],
      image: "🚚",
      color: "#FF6B6B",
      demo: "https://fe-logistics.vercel.app/",
      github: "https://github.com/DuckThuong/fe-logistics",
      featured: true,
    },
    {
      id: 3,
      title: "ChaTask — Quản lý công việc cá nhân",
      description:
        "Todo app với CRUD task, filter theo trạng thái, lưu LocalStorage và cập nhật realtime qua Socket.IO. TypeScript giúp type-safe API nội bộ; React Router tách màn hình rõ ràng.",
      tech: [
        "React",
        "TypeScript",
        "Ant Design",
        "SASS",
        "TanStack Query",
        "LocalStorage",
        "Socket.IO",
        "React Router",
        "Redux Toolkit",
      ],
      image: "✅",
      color: "#4ECDC4",
      demo: "#",
      github: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Festaria MD — Hệ thống bán hàng cho CloudMD",
      description:
        "Nền tảng thương mại: catalog sản phẩm, giỏ hàng, checkout và màn hình quản lý tồn kho. Bootstrap + Tailwind cho layout nhanh; Redux Toolkit đồng bộ state đơn hàng giữa các tab.",
      tech: [
        "React",
        "React Router",
        "Redux Toolkit",
        "Tailwind CSS",
        "Bootstrap",
        "LocalStorage",
      ],
      image: "🛍️",
      color: "#45B7D1",
      demo: "#",
      github: "#",
      featured: false,
    },
  ],

  timeline: [
    {
      year: "T3/2026",
      type: "work",
      title: "Frontend Developer",
      organization: "TCOM CORP",
      description:
        "Phụ trách module bán hàng Festaria MD cho CloudMD: luồng đặt hàng, CRUD sản phẩm và đồng bộ tồn kho. Tối ưu form nhiều bước, tách component tái sử dụng và quản lý state với Redux Toolkit.",
      icon: "🛍️",
    },
    {
      year: "T10/2025",
      type: "work",
      title: "Frontend Developer",
      organization: "TCOM CORP",
      description:
        "Phát triển ChaTask — giao diện quản lý task với filter, board và thông báo realtime qua Socket.IO. Áp dụng TypeScript để giảm lỗi khi mở rộng API; TanStack Query cho fetch và cache dữ liệu.",
      icon: "📋",
    },
    {
      year: "T3/2025",
      type: "work",
      title: "Frontend Developer",
      organization: "TCOM CORP",
      description:
        "Làm module chấm công nội bộ trên ERP: bảng chấm công, duyệt đơn nghỉ và export báo cáo. Tích hợp REST API, phân quyền theo vai trò và xử lý edge case timezone/ngày lễ.",
      icon: "⏱️",
    },
    {
      year: "T8/2024",
      type: "work",
      title: "Frontend Developer",
      organization: "TCOM CORP",
      description:
        "Bảo trì Ziraiten — nền tảng truyện tranh thị trường Nhật: lazy-load chapter, sửa lỗi responsive và rút gọn bundle. Phối hợp QA để tái hiện bug đọc trên mobile.",
      icon: "📚",
    },
    {
      year: "T5/2024",
      type: "work",
      title: "Frontend Intern",
      organization: "TCOM CORP",
      description:
        "Thực tập team Fulfillment: fix bug UI, viết component dùng chung và làm quen quy trình review trên GitLab. Học cách estimate task nhỏ và báo cáo tiến độ theo sprint.",
      icon: "🌱",
    },
  ],
};

/** Nền Hero / toàn trang: logo React, nhãn SCSS, đoạn code */
export const techBackgroundItems: TechBgItem[] = [
  {
    id: "react-1",
    kind: "react",
    top: "14%",
    left: "6%",
    size: 72,
    duration: 11,
    delay: 0,
  },
  {
    id: "react-2",
    kind: "react",
    top: "68%",
    right: "7%",
    size: 56,
    duration: 13,
    delay: 1.5,
  },
  {
    id: "react-3",
    kind: "react",
    top: "38%",
    right: "12%",
    size: 40,
    duration: 10,
    delay: 0.8,
  },
  {
    id: "scss-1",
    kind: "scss",
    top: "22%",
    right: "10%",
    size: 80,
    duration: 12,
    delay: 0.3,
  },
  {
    id: "scss-2",
    kind: "scss",
    top: "72%",
    left: "10%",
    size: 64,
    duration: 14,
    delay: 2,
  },
  {
    id: "code-react",
    kind: "code",
    code: "import { useState } from 'react'",
    top: "28%",
    left: "4%",
    duration: 15,
    delay: 1,
  },
  {
    id: "code-jsx",
    kind: "code",
    code: "export default function App()",
    top: "52%",
    left: "3%",
    duration: 16,
    delay: 0.5,
  },
  {
    id: "code-scss-var",
    kind: "code",
    code: "$color-primary: #6c63ff;",
    top: "18%",
    left: "22%",
    duration: 13,
    delay: 1.8,
  },
  {
    id: "code-scss-mixin",
    kind: "code",
    code: "@mixin flex-center { ... }",
    top: "58%",
    right: "5%",
    duration: 14,
    delay: 0.2,
  },
  {
    id: "code-scss-nest",
    kind: "code",
    code: ".hero { &__title { } }",
    top: "78%",
    right: "18%",
    duration: 12,
    delay: 2.5,
  },
  {
    id: "code-hook",
    kind: "code",
    code: "const [open, setOpen] = useState(false)",
    top: "44%",
    right: "4%",
    duration: 17,
    delay: 1.2,
  },
];

export default portfolioData;
