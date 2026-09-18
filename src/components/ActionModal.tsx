import React from 'react';
import { ASSETS } from '../data/mockData';

export type ModalType =
  | 'export-report'
  | 'adjust-yield'
  | 'room-details'
  | 'deposit-policy'
  | 'overbook-setting'
  | 'pre-stay'
  | 'profile'
  | null;

interface ActionModalProps {
  modalType: ModalType;
  onClose: () => void;
  onConfirmToast?: (msg: string) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  modalType,
  onClose,
  onConfirmToast,
}) => {
  if (!modalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#0b1c30]/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl border border-[#e2e8f0] relative flex flex-col gap-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#76777d] hover:text-[#0b1c30] p-1 rounded-full hover:bg-[#eff4ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Content Variants */}
        {modalType === 'export-report' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#0058be] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ส่งออกรายงานสรุปพอร์ตโฟลิโอ</h3>
                <p className="text-xs text-[#45464d]">StayPulse Executive Report Q4</p>
              </div>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              ระบบกำลังรวมข้อมูล Demand, Cancellation Rate, Seasonality Pace และการคาดการณ์จาก Random Forest พร้อมดาวน์โหลดในรูปแบบที่คุณต้องการ
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  onConfirmToast?.('ดาวน์โหลดไฟล์ StayPulse_Executive_Report.pdf สำเร็จ');
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0058be] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                <span>ส่งออกเป็น PDF (รายงานผู้บริหาร)</span>
              </button>
              <button
                onClick={() => {
                  onConfirmToast?.('ดาวน์โหลดไฟล์ Booking_Pace_Dataset.xlsx สำเร็จ');
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#eff4ff] text-[#0058be] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#dce9ff] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">table_view</span>
                <span>ส่งออกเป็น Excel Raw Data (.xlsx)</span>
              </button>
            </div>
          </>
        )}

        {modalType === 'adjust-yield' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d3e4fe] text-[#0058be] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">trending_up</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ปรับอัตราผลตอบแทน (ADR)</h3>
                <p className="text-xs text-[#45464d]">Dynamic Pricing Algorithm Alert</p>
              </div>
            </div>
            <div className="bg-[#eff4ff] p-3 rounded-xl flex flex-col gap-1.5 text-xs text-[#0b1c30]">
              <div className="flex justify-between font-semibold">
                <span>อัตราแนะนำสำหรับ ก.ค. - ส.ค.:</span>
                <span className="text-[#0058be]">+14.5% ADR</span>
              </div>
              <p className="text-[#45464d] text-[11px]">
                จากการวิเคราะห์ช่วง Summer Peak อัตราจองล้นเกิน 88% การปรับราคาจะเพิ่ม RevPAR สุทธิ +18.2%
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onConfirmToast?.('ปรับเพิ่มราคาตามคำแนะนำ (+14.5%) ไปยังระบบ PMS สำเร็จ');
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
              >
                ยืนยันการปรับราคา
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#f1f5f9] text-[#45464d] text-xs font-medium"
              >
                ยกเลิก
              </button>
            </div>
          </>
        )}

        {modalType === 'room-details' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0058be] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">meeting_room</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ข้อมูลห้องพักพอร์ตโฟลิโอ</h3>
                <p className="text-xs text-[#45464d]">City Hotel vs Resort Hotel</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-[#0b1c30]">
              <div className="p-2.5 rounded-lg border border-[#e2e8f0] flex justify-between items-center">
                <div>
                  <span className="font-bold block">City Hotel (Downtown Suite)</span>
                  <span className="text-[11px] text-[#45464d]">Lead Time กลาง 65 วัน • Business Travel</span>
                </div>
                <span className="font-semibold text-[#0058be]">79,330 จอง</span>
              </div>
              <div className="p-2.5 rounded-lg border border-[#e2e8f0] flex justify-between items-center">
                <div>
                  <span className="font-bold block">Resort Hotel (Pool Villa)</span>
                  <span className="text-[11px] text-[#45464d]">Lead Time กลาง 77 วัน • Leisure Long-Stay</span>
                </div>
                <span className="font-semibold text-[#059669]">40,060 จอง</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all"
            >
              ปิดหน้าต่าง
            </button>
          </>
        )}

        {modalType === 'deposit-policy' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">lock_reset</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ปรับนโยบาย Deposit</h3>
                <p className="text-xs text-[#45464d]">AI Yield Advisor Recommendation</p>
              </div>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              สำหรับกลุ่ม <strong>Tour Groups & Corporate</strong> ในช่วงเดือน พ.ย. กำหนดเงื่อนไข Non-Refundable มัดจำ 30% ล่วงหน้า 14 วันเพื่อลดความเสี่ยงยกเลิกที่ 61.1%
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onConfirmToast?.('อัปเดตนโยบายมัดจำ Non-Refundable 30% ล่วงหน้า 14 วัน เรียบร้อย');
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
              >
                บันทึกนโยบาย
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#f1f5f9] text-[#45464d] text-xs font-medium"
              >
                ปิด
              </button>
            </div>
          </>
        )}

        {modalType === 'overbook-setting' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d3e4fe] text-[#0058be] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">tune</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ตั้งค่า Overbooking Limit</h3>
                <p className="text-xs text-[#45464d]">High Season Weekend Buffer</p>
              </div>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              ระบบแนะนำให้เปิด Overbooking +8% ในวันศุกร์และเสาร์ช่วง พ.ย. เพื่อชดเชยอัตรา No-Show จากช่องทาง Online Travel Agency
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onConfirmToast?.('เปิดใช้ Buffer Overbooking +8% สำหรับวันศุกร์-เสาร์ เรียบร้อย');
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
              >
                เปิด Overbooking (+8%)
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#f1f5f9] text-[#45464d] text-xs font-medium"
              >
                ปิด
              </button>
            </div>
          </>
        )}

        {modalType === 'pre-stay' && (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0058be] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">mark_email_read</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-[#0b1c30]">ส่งข้อเสนอ Pre-stay Engagement</h3>
                <p className="text-xs text-[#45464d]">Guest Reconfirmation Campaign</p>
              </div>
            </div>
            <p className="text-xs text-[#45464d] leading-relaxed">
              ส่งอีเมลข้อเสนอพิเศษบริการรถรับส่งสนามบิน หรือเครดิตอาหารเช้าฟรี 15% เพื่อยืนยันการเดินทางล่วงหน้าและป้องกันการยกเลิกกระทันหัน
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onConfirmToast?.('ส่งแคมเปญ Pre-stay Engagement ไปยังกลุ่มเป้าหมายเรียบร้อย');
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
              >
                ส่งอีเมลทันที
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#f1f5f9] text-[#45464d] text-xs font-medium"
              >
                ปิด
              </button>
            </div>
          </>
        )}

        {modalType === 'profile' && (
          <>
            <div className="flex flex-col items-center text-center gap-2 pt-2">
              <div className="relative">
                <img
                  src={ASSETS.sarahPortrait}
                  alt="Sarah Jenkins"
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0b1c30] flex items-center justify-center gap-1">
                  Sarah Jenkins
                  <span className="material-symbols-outlined text-[#0058be] text-[18px]">verified</span>
                </h3>
                <p className="text-xs text-[#45464d]">Hotel Operations Director</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#0058be] text-[11px] font-semibold">
                  Asset Portfolio HQ • Executive Access
                </span>
              </div>
            </div>
            <div className="bg-[#f8f9ff] p-3 rounded-xl text-xs text-[#45464d] space-y-1.5 border border-[#e2e8f0]">
              <div className="flex justify-between">
                <span>จัดการอสังหาริมทรัพย์:</span>
                <span className="font-semibold text-[#0b1c30]">2 Properties (1,240 Keys)</span>
              </div>
              <div className="flex justify-between">
                <span>โมเดล AI ที่เชื่อมต่อ:</span>
                <span className="font-semibold text-[#0058be]">Random Forest v2.4</span>
              </div>
              <div className="flex justify-between">
                <span>สถานะระบบ:</span>
                <span className="font-semibold text-emerald-600">Active • Synced Live</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#0058be] text-white text-xs font-semibold active:scale-95 transition-all shadow-sm"
            >
              ปิด
            </button>
          </>
        )}
      </div>
    </div>
  );
};
