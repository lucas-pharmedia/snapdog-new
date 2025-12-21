import React from 'react';
import { 
  BookOpen, 
  Heart, 
  Briefcase, 
  Users, 
  Phone, 
  Mail, 
  Star, 
  QrCode, 
  ArrowRight
} from 'lucide-react';
import { cn } from '../../utils';

const Scenarios: React.FC = () => {
  const tags = ['展場', '活動', '快閃品牌']
  const cards = [
    {
      icon: <BookOpen className="text-blue-400 w-6 h-6" />,
      title: '知識型互動體驗',
      desc: '博物館、藝術展、主題展覽。自由組合帶有文字資訊的素材。',
      img: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Heart className="text-blue-400 w-6 h-6" />,
      title: '婚禮與派對慶典',
      desc: '婚禮、生日、抓周、聚會。相框、AI 功能等創意素材妝點回憶。',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Briefcase className="text-blue-400 w-6 h-6" />,
      title: '各式公開展覽',
      desc: '展覽會、品牌快閃店、招商活動。活動現場吸引人潮體驗酷拍活動。',
      img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Users className="text-blue-400 w-6 h-6" />,
      title: '企業活動與內部交流',
      desc: '年會、尾牙、員工日。拍照結合品牌自訂素材，加強品牌溝通力道。',
      img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="scenarios" className="py-15">
      <div className="mx-auto px-5 md:px-0 md:max-w-480">
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-[#0F172B] text-center mb-3">
          滿足多樣化的活動場景
        </h2>
      <div className="flex gap-1 justify-center mb-5 md:mb-10">
        {tags.map((tag, i) => (
          <div key={i} className="text-base md:text-lg px-6 py-1.5 md:px-10 md:py-2 bg-[#0F172B] text-white rounded-full">{tag}</div>
        ))}
      </div>
        <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar cursor-grab select-none">
          {cards.map((item, i) => (
            <div 
              key={i}
              className={cn("w-[285px] shrink-0 group relative h-[400px] rounded-[1.25rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-200",
                "md:rounded-none md:aspect-[1.185] md:h-auto md:grow"
              )}
            >
              <div className="absolute inset-0 bg-slate-100 group-hover:scale-105 transition-transform duration-700">
                <img src={item.img} className="w-full h-full object-cover opacity-90" alt={item.title} />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/50 to-transparent px-5 py-6 flex flex-col justify-end text-white">
                <div className="mb-2 flex justify-center items-center w-12 h-12 rounded-full bg-black/20">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2 leading-tight">{item.title}</h3>
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
      icon:<img src='/business-value-icon-1.jpg' />,
      title: '低門檻無痛導流',
      desc: '用戶掃描 QR Code 獲取照片時，即可引導加入 LINE 官方帳號，為品牌快速累積好友名單，擴大流量池。'
    },
    {
      icon:<img src='/business-value-icon-2.jpg' />,
      title: '活動數據標籤化',
      desc: '後台紀錄活動成效與用戶 Tagging，清楚掌握潛在客戶輪廓與關注議題，為未來的再行銷做好精準佈局。'
    },
    {
      icon:<img src='/business-value-icon-3.jpg' />,
      title: '延續互動熱度',
      desc: '運用官方帳號一對一私訊功能，持續與潛在客戶互動，提供專屬優惠或下單引導，將互動轉化為實際收益。'
    }
  ];

  return (
    <section id="business-value" className="py-15">
      <div className="max-w-312 mx-auto px-6">
        <div className="text-center mx-auto mb-5 md:mb-10">
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-[#0F172B] text-center mb-3 leading-tight">
            串接 <span className='text-[#2563EB]'>LINE 官方帳號</span><br className="md:hidden" /> 啟動高效獲客引擎
          </h2>
          <p className="text-[#45556C] text-xl hidden md:block">
            拍照即加好友，將線下人流轉化為品牌資產，建立長期顧客關係。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group flex flex-col items-center p-8 md:p-10 rounded-4xl bg-white border border-slate-100 shadow-[box-shadow: 0px 4px 20px 0px #0000000D] hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-500 text-center"
            >
              <div className="w-35 mb-3 flex items-center justify-center group-hover:scale-[1.1] transition-all duration-500">
                 {card.icon}
              </div>
              <h3 className="text-xl md:text-[1.5rem] font-bold text-[#0F172B] mb-3">{card.title}</h3>
              <p className="text-[#45556C] text-base leading-[1.8]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    { q: '租賃費用包含什麼？', a: '費用包含機台租借、專人到場安裝與撤場、AI 濾鏡客製化、相框設計以及雲端相簿 QR Code 分享功能。' },
    { q: 'AI 濾鏡可以完全客製嗎？', a: '可以，我們會根據您的品牌調性、活動主題需求，專屬訓練適合的風格模型，確保每個拍出的畫面都獨一無二。' },
    { q: '活動現場需要網路嗎？', a: '是的，機台運行及其雲端 QR Code 功能需穩定網路環境。我們也可以提供 4G/5G 行動網路租借方案。' }
  ];

  return (
    <section id="faq-section" className="py-15">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">常見問題</h2>
          <p className="text-[#45556C]">關於 Snapdog 的服務細節，這裡有您想知道的答案</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-xs border border-slate-200">
               <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
               <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-slate-900 text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="md:w-1/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">S</div>
                <span className="text-2xl font-bold tracking-tight text-white">Snapdog</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">一起玩轉回憶，<br />創造有效互動！</h2>
              <p className="text-slate-400 text-lg mb-8">立即聯絡我們，打造專屬的照片互動體驗</p>
              
              <div className="space-y-4 mb-10 text-white">
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-500 w-5 h-5" />
                  <span className="text-lg font-medium">02-2772-5579</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Mail className="text-blue-500 w-5 h-5" />
                  <span className="text-lg font-medium">service@hypermex.io</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Star className="text-blue-500 w-5 h-5 fill-blue-500" />
                  <span className="text-lg font-medium text-slate-300">不定時上線節慶素材免費加入體驗</span>
                </div>
              </div>
            </div>

            <div className="cursor-pointer group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                <QrCode className="text-green-500 w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white mb-0.5">LINE 線上諮詢</div>
                <div className="text-xs text-slate-400">專人一對一服務規劃</div>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-white transition-colors w-5 h-5" />
            </div>
          </div>

          <div className="md:w-2/3 bg-slate-800/30 backdrop-blur-sm p-8 md:p-12 rounded-4xl border border-white/5">
             <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">您的姓名 *</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all text-white" placeholder="王小明" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">聯絡電話 *</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all text-white" placeholder="0912-345-678" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">電子郵件 *</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all text-white" placeholder="service@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">活動需求描述</label>
                  <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 h-32 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all text-white resize-none" placeholder="請簡述您的活動類型、日期與預估人數..."></textarea>
                </div>
                <button className="md:col-span-2 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all mt-4 flex items-center justify-center gap-2 group">
                  <span>送出規劃需求</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
    <section 
    id="marketing-sections"
    className='bg-[#F8FAFC] z-5 relative shadow-[0_20px_40px_rgba(0,0,0,0.05)]' 
    >
      <Scenarios />
      <BusinessValue />
      <FAQ />
      <Contact />
    </section>
  );
};

export default MarketingSections;
