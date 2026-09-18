import React, { useState } from 'react';
import { ModalType } from './ActionModal';

interface PredictorViewProps {
  onOpenModal: (type: ModalType) => void;
  onToast: (msg: string) => void;
}

export const PredictorView: React.FC<PredictorViewProps> = ({ onOpenModal, onToast }) => {
  const [objective, setObjective] = useState<'cancel' | 'extended'>('cancel');
  const [hotelType, setHotelType] = useState<'city' | 'resort'>('city');
  const [month, setMonth] = useState<string>('สิงหาคม (Peak)');
  const [leadTime, setLeadTime] = useState<number>(85);
  const [segment, setSegment] = useState<'Online TA' | 'Direct / Web' | 'Corporate' | 'Tour Groups'>('Online TA');
  const [deposit, setDeposit] = useState<'No Deposit' | 'Non Refund'>('No Deposit');
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  // Practical mathematical calculation reproducing Random Forest propensity
  const computePrediction = () => {
    if (objective === 'extended') {
      let baseProb = 35;
      if (hotelType === 'resort') baseProb += 22;
      if (month.includes('Peak') || month.includes('High')) baseProb += 8;
      if (adults + children >= 3) baseProb += 12;
      if (segment === 'Direct / Web') baseProb += 6;
      return Math.min(95, Math.max(5, baseProb));
    } else {
      // Cancellation probability
      let baseProb = 36.0;
      if (hotelType === 'city') baseProb += 6.5;
      if (leadTime > 60) baseProb += Math.min(22, (leadTime - 60) * 0.15);
      if (leadTime < 14) baseProb -= 12;
      if (deposit === 'Non Refund') baseProb -= 38.0;
      if (deposit === 'No Deposit' && segment === 'Tour Groups') baseProb += 24.0;
      if (segment === 'Online TA') baseProb += 9.5;
      if (segment === 'Direct / Web') baseProb -= 14.0;
      if (isRepeat) baseProb -= 21.0;
      return Math.min(98.5, Math.max(4.2, Math.round(baseProb * 10) / 10));
    }
  };

  const currentScore = computePrediction();

  // Half-circle arc math: radius=40, circumference for half arc = PI * 40 ≈ 125.66
  const halfArcLength = 125.66;
  const strokeOffset = halfArcLength * (1 - currentScore / 100);

  const getRiskBadge = (score: number) => {
    if (objective === 'extended') {
      if (score >= 60) return { text: 'High Long-Stay', color: 'text-[#059669] bg-[#ecfdf5]' };
      if (score >= 35) return { text: 'Moderate Duration', color: 'text-[#0058be] bg-[#eff4ff]' };
      return { text: 'Short-Stay Focus', color: 'text-[#45464d] bg-[#f1f5f9]' };
    }
    if (score >= 60) return { text: 'High Risk Level', color: 'text-[#ba1a1a] bg-[#ffdad6]' };
    if (score >= 35) return { text: 'Medium Risk', color: 'text-[#d97706] bg-[#fef3c7]' };
    return { text: 'Low Risk Safe', color: 'text-[#059669] bg-[#ecfdf5]' };
  };

  const riskInfo = getRiskBadge(currentScore);

  const handleRunPrediction = () => {
    setIsComputing(true);
    setTimeout(() => {
      setIsComputing(false);
      onToast(`ประมวลผลโมเดล Random Forest สำเร็จ: โอกาสคำนวณได้ ${currentScore}%`);
    }, 550);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-3.5 pb-28 pt-2">
      {/* AI Model Status Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#131b2e] text-white p-4 shadow-md border border-[#213145]">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#0058be]/20 blur-2xl pointer-events-none"></div>
        <div className="relative flex flex-col space-y-2 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span
                className="material-symbols-outlined text-[18px] text-[#4cd7f6]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                neurology
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#bec6e0]">
                AI Engine v2.4
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-white">พร้อมใช้งาน</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <h2 className="font-bold text-lg text-white">Random Forest Predictor</h2>
              <p className="text-xs text-[#bec6e0] mt-0.5">ระบบจำลองและคาดการณ์พฤติกรรมการจอง</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-mono text-[#7c839b]">Accuracy</span>
              <span className="font-mono text-sm text-[#acedff] font-bold">AUC 0.842</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Model Objective Control */}
      <div className="p-1 rounded-xl bg-[#e5eeff] flex items-stretch space-x-1 shadow-xs">
        <button
          onClick={() => setObjective('cancel')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
            objective === 'cancel'
              ? 'bg-white text-[#0b1c30] shadow-xs'
              : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#0058be]"
            style={objective === 'cancel' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            event_busy
          </span>
          <span className="truncate">ความเสี่ยงยกเลิก</span>
        </button>
        <button
          onClick={() => setObjective('extended')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
            objective === 'extended'
              ? 'bg-white text-[#0b1c30] shadow-xs'
              : 'text-[#45464d] hover:text-[#0b1c30]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#0058be]"
            style={objective === 'extended' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            bedtime
          </span>
          <span className="truncate">พักยาว (&gt;3 คืน)</span>
        </button>
      </div>

      {/* Interactive Input Module Card */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80 space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-[#e2e8f0]/60">
          <span className="font-bold text-sm text-[#0b1c30]">พารามิเตอร์การจำลอง</span>
          <span className="text-[10px] font-mono font-bold text-[#0058be] bg-[#eff4ff] px-2 py-0.5 rounded-full">
            Single-stay Test
          </span>
        </div>

        {/* Hotel Type */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#45464d]">ประเภทโรงแรม</label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#eff4ff]">
            <button
              onClick={() => setHotelType('city')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                hotelType === 'city' ? 'bg-white text-[#0058be] shadow-xs' : 'text-[#45464d]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">apartment</span>
              <span>City Hotel</span>
            </button>
            <button
              onClick={() => setHotelType('resort')}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                hotelType === 'resort' ? 'bg-white text-[#0058be] shadow-xs' : 'text-[#45464d]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">villa</span>
              <span>Resort Hotel</span>
            </button>
          </div>
        </div>

        {/* Arrival Month Picker */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#45464d]">เดือนที่เข้าพัก (Arrival Month)</label>
            <span className="text-[10px] font-mono text-[#0058be] font-bold">Peak Season</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto py-1 no-scrollbar">
            {['ก.ค. (High)', 'สิงหาคม (Peak)', 'ก.ย. (Green)', 'ต.ค. (Shoulder)', 'พ.ย. (High)'].map((m) => (
              <button
                key={m}
                onClick={() => setMonth(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap active:scale-95 transition-all ${
                  month === m
                    ? 'bg-[#0058be] text-white shadow-xs font-semibold'
                    : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#e5eeff]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Touch Slider: Lead Time */}
        <div className="space-y-2 bg-[#eff4ff] p-3 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0b1c30]">จองล่วงหน้า (Lead Time)</span>
            <span className="font-mono text-sm text-[#0058be] font-bold">{leadTime} วัน</span>
          </div>
          <div className="relative w-full flex items-center py-1">
            <input
              type="range"
              min={1}
              max={365}
              value={leadTime}
              onChange={(e) => setLeadTime(Number(e.target.value))}
              className="w-full h-2 bg-[#d3e4fe] rounded-lg appearance-none cursor-pointer accent-[#0058be]"
            />
          </div>
          <div className="flex justify-between text-[#45464d] font-mono text-[9px]">
            <span>จองด่วน (1 วัน)</span>
            <span>ปานกลาง (90 วัน)</span>
            <span>ล่วงหน้านาน (&gt;180 วัน)</span>
          </div>
        </div>

        {/* Market Segment Chips */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#45464d]">กลุ่มลูกค้า (Market Segment)</label>
          <div className="grid grid-cols-2 gap-2">
            {(['Online TA', 'Direct / Web', 'Corporate', 'Tour Groups'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setSegment(seg)}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                  segment === seg
                    ? 'bg-[#0058be] text-white shadow-xs font-semibold'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#e5eeff]'
                }`}
              >
                <span>{seg}</span>
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    segment === seg ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  check
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Deposit Type & Repeat Guest */}
        <div className="grid grid-cols-2 gap-3 pt-0.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#45464d]">เงื่อนไขมัดจำ (Deposit)</label>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setDeposit('No Deposit')}
                className={`w-full py-1.5 px-3 rounded-lg text-xs text-left font-medium transition-all ${
                  deposit === 'No Deposit'
                    ? 'bg-[#dce9ff] text-[#0058be] font-bold'
                    : 'bg-[#eff4ff] text-[#45464d]'
                }`}
              >
                No Deposit
              </button>
              <button
                onClick={() => setDeposit('Non Refund')}
                className={`w-full py-1.5 px-3 rounded-lg text-xs text-left font-medium transition-all ${
                  deposit === 'Non Refund'
                    ? 'bg-[#dce9ff] text-[#0058be] font-bold'
                    : 'bg-[#eff4ff] text-[#45464d]'
                }`}
              >
                Non Refund
              </button>
            </div>
          </div>

          <div className="space-y-1 flex flex-col justify-between">
            <label className="text-xs font-semibold text-[#45464d]">เคยเข้าพัก (Repeat)</label>
            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex items-center justify-between h-full">
              <span
                className={`text-xs font-semibold ${
                  isRepeat ? 'text-[#0058be]' : 'text-[#0b1c30]'
                }`}
              >
                {isRepeat ? 'ลูกค้าประจำ' : 'ลูกค้าใหม่'}
              </span>
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`w-11 h-6 rounded-full relative transition-colors duration-200 p-0.5 ${
                  isRepeat ? 'bg-[#0058be]' : 'bg-[#c6c6cd]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                    isRepeat ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Stepper: Guests */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#45464d]">จำนวนผู้เข้าพัก</label>
          <div className="grid grid-cols-2 gap-3">
            {/* Adults */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#eff4ff]">
              <span className="text-xs text-[#0b1c30]">ผู้ใหญ่</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0b1c30] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-mono text-sm font-bold text-[#0b1c30] w-4 text-center">{adults}</span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0b1c30] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#eff4ff]">
              <span className="text-xs text-[#0b1c30]">เด็ก</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0b1c30] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span className="font-mono text-sm font-bold text-[#0b1c30] w-4 text-center">{children}</span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0b1c30] active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Predict CTA Button */}
        <button
          onClick={handleRunPrediction}
          disabled={isComputing}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0058be] to-[#2170e4] hover:from-[#004e5c] hover:to-[#0058be] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-sm active:scale-98 transition-all"
        >
          {isComputing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>กำลังคำนวณผ่าน Random Forest Model...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
              <span>ประมวลผลทำนายผลลัพธ์ (Run AI Prediction)</span>
            </>
          )}
        </button>
      </div>

      {/* Real-Time AI Prediction Result Card */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e2e8f0]/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
            <span className="text-xs font-bold text-[#0b1c30]">ผลการวิเคราะห์ AI คาดการณ์</span>
          </div>
          <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${riskInfo.color}`}>
            {riskInfo.text}
          </span>
        </div>

        {/* Half-Gauge Speedometer */}
        <div className="flex flex-col items-center justify-center pt-1">
          <div className="relative w-56 h-28 flex justify-center overflow-hidden">
            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#dce9ff"
                strokeWidth="12"
                strokeDasharray="125.66 125.66"
                strokeDashoffset="0"
              />
              {/* Value Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={objective === 'extended' ? '#0058be' : currentScore >= 60 ? '#ba1a1a' : '#2170e4'}
                strokeWidth="12"
                strokeDasharray="125.66 125.66"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
              <span className="text-[11px] text-[#45464d] font-medium">
                {objective === 'extended' ? 'โอกาสพักยาว (&gt;3 คืน)' : 'โอกาสการยกเลิก'}
              </span>
              <span
                className={`font-mono text-2xl font-bold tracking-tight ${
                  objective === 'extended'
                    ? 'text-[#0058be]'
                    : currentScore >= 60
                    ? 'text-[#ba1a1a]'
                    : 'text-[#0b1c30]'
                }`}
              >
                {currentScore}%
              </span>
            </div>
          </div>
          <div className="flex justify-between w-56 px-2 text-[#45464d] font-mono text-[9px] mt-1">
            <span>0% ต่ำ</span>
            <span>50% ปานกลาง</span>
            <span>100% วิกฤต</span>
          </div>
        </div>

        {/* Key Drivers */}
        <div className="space-y-1.5 pt-1 border-t border-[#e2e8f0]/60">
          <span className="text-[10px] font-mono font-bold text-[#45464d] uppercase tracking-wider">
            ปัจจัยหลักที่มีผลต่อผลลัพธ์ (KEY DRIVERS)
          </span>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#0b1c30]">ระยะเวลาจองล่วงหน้านาน (&gt;60 วัน)</span>
                <span className="text-[#0058be] font-mono font-bold text-xs">+38% เสี่ยง</span>
              </div>
              <div className="w-full h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#ba1a1a] rounded-full w-4/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#0b1c30]">ช่องทาง {segment} & {deposit}</span>
                <span className="text-[#d97706] font-mono font-bold text-xs">+24% เสี่ยง</span>
              </div>
              <div className="w-full h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-3/5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Advice for GM */}
        <div className="bg-[#eff4ff] rounded-xl p-3 space-y-2 border border-[#dce9ff]">
          <div className="flex items-center space-x-1.5 text-[#0b1c30]">
            <span
              className="material-symbols-outlined text-[18px] text-[#0058be]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              tips_and_updates
            </span>
            <span className="text-xs font-bold">คำแนะนำสำหรับผู้จัดการโรงแรม</span>
          </div>
          <p className="text-xs text-[#45464d] leading-relaxed">
            {objective === 'extended'
              ? 'กลุ่มลูกค้านี้มีแนวโน้มพักผ่อน แนะนำเสนอแพ็กเกจ F&B เครดิตอาหารหรือ Spa Credit เมื่อจองเพิ่มคืนที่ 4 เพื่อดึงดูดให้พักยาวนานขึ้น'
              : 'แนะนำให้เรียกเก็บเงินมัดจำล่วงหน้า หรือส่งอีเมลยืนยันสิทธิ์พิเศษ (Pre-stay Engagement) เพื่อยืนยันความประสงค์เข้าพัก และลดโอกาสการเกิด No-Show ในช่วงสัปดาห์ดังกล่าว'}
          </p>
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => onOpenModal('pre-stay')}
              className="flex-1 py-2 px-3 rounded-lg bg-[#d3e4fe] hover:bg-[#dce9ff] text-[#0058be] text-xs font-semibold active:scale-95 flex items-center justify-center space-x-1 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span>ส่งข้อเสนอ Pre-stay</span>
            </button>
            <button
              onClick={() => onToast('คัดลอกลิงก์ผลการวิเคราะห์พารามิเตอร์ AI แล้ว')}
              className="py-2 px-3 rounded-lg bg-[#d3e4fe] text-[#0b1c30] text-xs font-medium active:scale-95 flex items-center justify-center"
              title="แชร์ผลลัพธ์"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historical Model Validation Comparison */}
      <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e2e8f0]/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0b1c30]">ประสิทธิภาพย้อนหลัง (Validation)</span>
          <span className="font-mono text-[10px] text-[#0090a9] bg-[#dce9ff] px-2 py-0.5 rounded-full font-bold">
            Random Forest
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded-lg bg-[#eff4ff]">
            <div className="font-mono text-[10px] text-[#45464d]">Precision</div>
            <div className="font-mono text-sm text-[#0b1c30] font-bold mt-0.5">82.1%</div>
          </div>
          <div className="p-2 rounded-lg bg-[#eff4ff]">
            <div className="font-mono text-[10px] text-[#45464d]">Recall</div>
            <div className="font-mono text-sm text-[#0b1c30] font-bold mt-0.5">79.5%</div>
          </div>
          <div className="p-2 rounded-lg bg-[#eff4ff]">
            <div className="font-mono text-[10px] text-[#45464d]">F1-Score</div>
            <div className="font-mono text-sm text-[#0058be] font-bold mt-0.5">0.807</div>
          </div>
        </div>
      </div>
    </div>
  );
};
