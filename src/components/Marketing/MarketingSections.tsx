import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Heart, Briefcase, Users, ChevronDown } from 'lucide-react';
import { cn } from '../../utils';
import { motion, useAnimationControls } from 'framer-motion';
import { SECTION_ID } from '../../constans';
const Scenarios: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [resizeKey, setResizeKey] = useState(0);
  const tags = ['展場', '活動', '快閃品牌'];
  const cards = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-400" />,
      title: '知識型互動體驗',
      desc: '博物館、藝術展、主題展覽。自由組合帶有文字資訊的素材。',
      img: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-400" />,
      title: '婚禮與派對慶典',
      desc: '婚禮、生日、抓周、聚會。相框、AI 功能等創意素材妝點回憶。',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Briefcase className="h-6 w-6 text-blue-400" />,
      title: '各式公開展覽',
      desc: '展覽會、品牌快閃店、招商活動。活動現場吸引人潮體驗酷拍活動。',
      img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: '企業活動與內部交流',
      desc: '年會、尾牙、員工日。拍照結合品牌自訂素材，加強品牌溝通力道。',
      img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        controls.set({ x: 0 });

        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = containerRef.current.scrollWidth;

        setConstraints({
          left: containerWidth - contentWidth,
          right: 0
        });

        setResizeKey((prev) => prev + 1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [controls]);
  return (
    <section id={SECTION_ID.SCENARIOS} className="py-15">
      <div className="mx-auto px-5 md:max-w-480 md:px-0">
        <h2 className="mb-3 text-center text-[1.75rem] font-extrabold text-slate-900 md:text-[2.25rem]">
          滿足多樣化的活動場景
        </h2>
        <div className="mb-5 flex justify-center gap-1 md:mb-10">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="rounded-full bg-slate-900 px-6 py-1.5 text-base text-white md:px-10 md:py-2 md:text-lg"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="overflow-hidden" ref={containerRef} key={resizeKey}>
          <motion.div
            drag={constraints.left < 0 ? 'x' : false}
            dragConstraints={constraints}
            className={cn(
              'hide-scrollbar flex gap-2',
              constraints.left < 0 ? 'cursor-grab active:cursor-grabbing' : ''
            )}
          >
            {cards.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'group relative h-[400px] w-[285px] shrink-0 overflow-hidden rounded-[1.25rem] border border-slate-200 shadow-md transition-all duration-500 hover:shadow-xl',
                  'md:aspect-[1.185] md:h-auto md:grow md:rounded-none'
                )}
              >
                <div className="absolute inset-0 bg-slate-100 transition-transform duration-700 group-hover:scale-105">
                  <img src={item.img} className="h-full w-full object-cover opacity-90" alt={item.title} />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-slate-900/95 via-slate-900/50 to-transparent px-5 py-6 text-white">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-black/20">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-2xl leading-tight font-bold">{item.title}</h3>
                  <p className="text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BusinessValue: React.FC = () => {
  const cards = [
    {
      icon: <img src="/business-value-icon-1.jpg" />,
      title: '低門檻無痛導流',
      desc: '用戶掃描 QR Code 獲取照片時，即可引導加入 LINE 官方帳號，為品牌快速累積好友名單，擴大流量池。'
    },
    {
      icon: <img src="/business-value-icon-2.jpg" />,
      title: '活動數據標籤化',
      desc: '後台紀錄活動成效與用戶 Tagging，清楚掌握潛在客戶輪廓與關注議題，為未來的再行銷做好精準佈局。'
    },
    {
      icon: <img src="/business-value-icon-3.jpg" />,
      title: '延續互動熱度',
      desc: '運用官方帳號一對一私訊功能，持續與潛在客戶互動，提供專屬優惠或下單引導，將互動轉化為實際收益。'
    }
  ];

  return (
    <section id={SECTION_ID.BUSINESS_VALUE} className="py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-5 text-center md:mb-10">
          <h2 className="mb-3 text-center text-[1.75rem] leading-tight font-extrabold text-slate-900 md:text-[2.25rem]">
            串接 <span className="text-blue-600">LINE 官方帳號</span>
            <br className="md:hidden" /> 啟動高效獲客引擎
          </h2>
          <p className="hidden text-xl text-slate-500 md:block">
            拍照即加好友，將線下人流轉化為品牌資產，建立長期顧客關係。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group shadow-[box-shadow: 0px 4px 20px 0px #0000000D] flex flex-col items-center rounded-4xl border border-slate-100 bg-white p-8 text-center transition-all duration-500 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] md:p-10"
            >
              <div className="mb-3 flex w-35 items-center justify-center transition-all duration-500 group-hover:scale-[1.1]">
                {card.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#0F172B] md:text-[1.5rem]">{card.title}</h3>
              <p className="text-base leading-[1.8] text-[#45556C]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void }> = ({
  q,
  a,
  isOpen,
  onClick
}) => {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300')}>
      <button
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50/50"
      >
        <span className={'text-lg font-bold text-[#1E293B]'}>{q}</span>
        <ChevronDown
          className={cn('text-[1.5rem] text-slate-800 transition-transform duration-300', isOpen && 'rotate-180')}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-base leading-relaxed text-slate-600">{a}</div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: '除了現場機台外，使用者需要下載 App 嗎？',
      answer: '不需要，除了機台模式外，可透過串接LINE 官方帳號或掃描 QR Code 開啟編輯頁面，無須額外安裝 App。'
    },
    {
      question: '使用者有哪些選項可以編輯照片？',
      answer: '可依活動需求擴充功能，包括 貼圖、邊框、主題相框 與 AI 風格，打造專屬互動體驗。'
    },
    {
      question: '我的活動可以客製素材嗎？',
      answer: '當然可以！SnapDog 提供多款預設素材，亦可根據活動屬性量身設計相框、貼圖與AI風格主題。'
    },
    {
      question: 'Snapdog 只能製作照片嗎？',
      answer: '我們可依照活動屬性，規劃帶有文字資訊的素材，透過使用者自由組合帶有文字資訊的素材，營造知識型的互動體驗。'
    },
    {
      question: 'SnapDog 有限制體驗人數嗎？',
      answer: '如使用 AI 風格，建議單人拍攝效果最佳，可視需求支援2~3人，其他功能則無人數限制。'
    },
    {
      question: 'AI 影像生成需要多久的時間？',
      answer: '依模型複雜程度不同，基本風格約30~50秒內即可完成。'
    },
    {
      question: '只有實體活動能使用SnapDog嗎？',
      answer: '不一定！SnapDog 支援「實體互動機台」與「線上拍貼」服務，靈活應用於各種活動場景。'
    }
  ];

  return (
    <section id={SECTION_ID.FAQ} className="py-15">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-[2rem] font-extrabold text-[#0F172B] md:text-[2.5rem]">常見問題</h2>
          <p className="text-lg text-slate-500">關於 Snapdog 的服務細節，這裡有您想知道的答案</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.question}
              a={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketingSections: React.FC = () => {
  return (
    <section className="relative z-5 bg-[#F8FAFC] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
      <Scenarios />
      <BusinessValue />
      <FAQ />
    </section>
  );
};

export default MarketingSections;
