import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Smartphone, X } from 'lucide-react';
import { LINE_OA_URL } from '../constans';

const LineModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景遮罩 (Backdrop) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 0 }}
              transition={{
                type: 'spring',
                duration: 0.5,
                bounce: 0.3
              }}
              className="fixed inset-0 z-200 flex items-center justify-center"
              onClick={onClose}
            >
              <div
                className="relative flex w-[90%] max-w-[360px] scale-100 transform flex-col items-center rounded-[2.5rem] bg-white p-8 shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
                <img src="/line-logo.png" alt="Line" className="mb-6" />
                <h3 className="mb-2 text-center text-2xl font-bold text-slate-900">立即體驗 Snapdog</h3>
                <p className="mb-1 text-center text-sm text-slate-500">掃描 QR Code 加入官方帳號</p>
                <p className="mb-6 text-sm text-slate-500">解鎖您的專屬 AI 風格</p>
                <div className="mb-8 rounded-2xl border-2 border-slate-100 bg-white p-3 shadow-inner">
                  <img src="/line-oa-qrcode.png" alt="LINE QR Code" className="h-40 w-40 rounded-lg" />
                </div>
                <a
                  href={LINE_OA_URL}
                  target="_blank"
                  className="group flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 py-3.5 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>手機無法掃描？點擊加入</span>
                  <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LineModal;
