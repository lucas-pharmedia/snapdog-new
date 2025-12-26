import { Phone, Mail, Star, QrCode, ChevronRight, ChevronDown } from 'lucide-react';
import { LINE_OA_URL, SectionId } from '../constans';

const Contact = () => {
  return (
    <section
      id={SectionId.Contact}
      className="relative overflow-hidden bg-slate-900 pt-10 pb-20 text-white lg:pt-20 lg:pb-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col-reverse gap-16 lg:flex-row lg:gap-24">
          <div className="flex flex-col justify-between lg:w-1/3">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <img src="/contact-logo.png" alt="Snapdog" className="w-[195px]" />
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
                  <span className="text-lg font-medium">service@hypernex.io</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                  <span className="text-lg font-medium text-slate-300">不定時上線節慶素材免費加入體驗</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                window.open(LINE_OA_URL, '_blank');
              }}
              className="group hidden cursor-pointer items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-4 text-left transition-all duration-300 hover:bg-slate-800 md:flex"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/10">
                <QrCode className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-xs text-slate-400">點擊顯示 QR Code</div>
                <div className="text-lg font-bold text-white transition-colors group-hover:text-green-400">
                  加入 LINE 官方帳號
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-600 transition-all group-hover:translate-x-2" />
            </button>
          </div>

          <div className="rounded-4xl border border-slate-700 bg-slate-800 p-8 shadow-xl md:p-10 lg:w-2/3">
            <h3 className="mb-6 text-2xl font-bold">聯絡我們</h3>
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                console.log('Form submitted');
              }}
            >
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-400">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  placeholder="姓名"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-1 block text-sm font-medium text-slate-400">
                  公司
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  placeholder="公司名稱"
                  required
                />
              </div>

              <div>
                <label htmlFor="activity-type" className="mb-1 block text-sm font-medium text-slate-400">
                  活動類型
                </label>
                <div className="relative">
                  <select
                    id="activity-type"
                    className="w-full appearance-none rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white transition-all focus:border-blue-500 focus:outline-none"
                    defaultValue={''}
                  >
                    <option value="" disabled>
                      請選擇活動類型
                    </option>
                    <option value="corporate">企業活動</option>
                    <option value="brand">品牌推廣</option>
                    <option value="wedding">婚禮/私人派對</option>
                    <option value="exhibition">展覽</option>
                    <option value="other">其他</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <ChevronDown />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-400">
                    活動日期
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white [color-scheme:dark] transition-all placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-method" className="mb-1 block text-sm font-medium text-slate-400">
                    聯絡方式
                  </label>
                  <input
                    type="text"
                    id="contact-method"
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-3 text-white transition-all placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                    placeholder="電話或 Email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 mb-0 w-full cursor-pointer rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-500"
              >
                提交
              </button>

              <p className="mt-4 text-center text-xs text-slate-400">
                提交表單後，我們將盡快與您聯繫，協助您進行專案細節規劃與提供執行建議。
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
