import React from 'react';
import { BookOpen, Heart, Briefcase, Users, Phone, Mail, Star, QrCode, ArrowRight } from 'lucide-react';
import { cn } from '../../utils';

const Scenarios: React.FC = () => {
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

  return (
    <section id="scenarios" className="py-15">
      <div className="mx-auto px-5 md:max-w-480 md:px-0">
        <h2 className="mb-3 text-center text-[1.75rem] font-extrabold text-[#0F172B] md:text-[2.25rem]">
          滿足多樣化的活動場景
        </h2>
        <div className="mb-5 flex justify-center gap-1 md:mb-10">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="rounded-full bg-[#0F172B] px-6 py-1.5 text-base text-white md:px-10 md:py-2 md:text-lg"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="hide-scrollbar flex cursor-grab gap-2 overflow-x-auto pb-6 select-none">
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
    <section id="business-value" className="py-15">
      <div className="mx-auto max-w-312 px-6">
        <div className="mx-auto mb-5 text-center md:mb-10">
          <h2 className="mb-3 text-center text-[1.75rem] leading-tight font-extrabold text-[#0F172B] md:text-[2.25rem]">
            串接 <span className="text-[#2563EB]">LINE 官方帳號</span>
            <br className="md:hidden" /> 啟動高效獲客引擎
          </h2>
          <p className="hidden text-xl text-[#45556C] md:block">
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

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: '租賃費用包含什麼？',
      a: '費用包含機台租借、專人到場安裝與撤場、AI 濾鏡客製化、相框設計以及雲端相簿 QR Code 分享功能。'
    },
    {
      q: 'AI 濾鏡可以完全客製嗎？',
      a: '可以，我們會根據您的品牌調性、活動主題需求，專屬訓練適合的風格模型，確保每個拍出的畫面都獨一無二。'
    },
    {
      q: '活動現場需要網路嗎？',
      a: '是的，機台運行及其雲端 QR Code 功能需穩定網路環境。我們也可以提供 4G/5G 行動網路租借方案。'
    }
  ];

  return (
    <section id="faq-section" className="py-15">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">常見問題</h2>
          <p className="text-[#45556C]">關於 Snapdog 的服務細節，這裡有您想知道的答案</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <h4 className="mb-2 font-bold text-slate-900">{faq.q}</h4>
              <p className="text-sm leading-relaxed text-slate-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900 py-24 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-16 md:flex-row md:gap-24">
          <div className="flex flex-col justify-between md:w-1/3">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-md">
                  S
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">Snapdog</span>
              </div>
              <h2 className="mb-4 text-3xl leading-tight font-bold md:text-4xl">
                一起玩轉回憶，
                <br />
                創造有效互動！
              </h2>
              <p className="mb-8 text-lg text-slate-400">立即聯絡我們，打造專屬的照片互動體驗</p>

              <div className="mb-10 space-y-4 text-white">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-lg font-medium">02-2772-5579</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span className="text-lg font-medium">service@hypermex.io</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                  <span className="text-lg font-medium text-slate-300">不定時上線節慶素材免費加入體驗</span>
                </div>
              </div>
            </div>

            <div className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-4 transition-all duration-300 hover:bg-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10">
                <QrCode className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-sm font-bold text-white">LINE 線上諮詢</div>
                <div className="text-xs text-slate-400">專人一對一服務規劃</div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-white" />
            </div>
          </div>

          <div className="rounded-4xl border border-white/5 bg-slate-800/30 p-8 backdrop-blur-sm md:w-2/3 md:p-12">
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-slate-400">您的姓名 *</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-hidden"
                  placeholder="王小明"
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-sm font-medium text-slate-400">聯絡電話 *</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-hidden"
                  placeholder="0912-345-678"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-sm font-medium text-slate-400">電子郵件 *</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-hidden"
                  placeholder="service@example.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-sm font-medium text-slate-400">活動需求描述</label>
                <textarea
                  className="h-32 w-full resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-white transition-all focus:ring-2 focus:ring-blue-500/50 focus:outline-hidden"
                  placeholder="請簡述您的活動類型、日期與預估人數..."
                ></textarea>
              </div>
              <button className="group mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 md:col-span-2">
                <span>送出規劃需求</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const MarketingSections: React.FC = () => {
  return (
    <section id="marketing-sections" className="relative z-5 bg-[#F8FAFC] shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
      <Scenarios />
      <BusinessValue />
      <FAQ />
      <Contact />
    </section>
  );
};

export default MarketingSections;
