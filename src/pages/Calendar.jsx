import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, MapPin, Bell } from 'lucide-react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO 
} from 'date-fns';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const CalendarView = ({ bookmarkedPolicies = [] }) => { // 기본값 빈 배열 설정
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-2 mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-800">
            {format(currentMonth, 'yyyy년 M월')}
          </h2>
          <p className="text-sm text-slate-500">북마크한 정책들의 신청 일정을 확인하세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <button 
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            오늘
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="grid grid-cols-7 mb-2 border-b border-slate-100 pb-2">
        {days.map((day, idx) => (
          <div key={idx} className={`text-center text-xs font-bold ${idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        // 해당 날짜에 마감인 정책 필터링
        const dayPolicies = bookmarkedPolicies.filter(p => {
            if (!p.endDate) return false; // deadline -> endDate
            const deadline = parseISO(p.endDate); // 백엔드에서 주는 "2026-03-30" 형태 파싱
            return isSameDay(day, deadline);
        });

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[100px] p-2 border-r border-b border-slate-50 relative group cursor-pointer hover:bg-teal-50/30 transition-colors ${
              !isSameMonth(day, monthStart) ? "bg-slate-50/50 text-slate-300" : "text-slate-700"
            } ${isSameDay(day, selectedDate) ? "bg-teal-50/50" : ""}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm font-semibold ${
                isSameDay(day, new Date()) ? "w-7 h-7 flex items-center justify-center bg-teal-600 text-white rounded-full" : ""
              }`}>
                {formattedDate}
              </span>
            </div>
            <div className="mt-2 space-y-1 overflow-hidden">
                {dayPolicies.map(p => (
                    <div key={p.id} className="text-[10px] p-1 bg-amber-100 text-amber-700 rounded border-l-2 border-amber-500 truncate font-bold">
                        {p.policyTitle}
                    </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 border-l border-t border-slate-50" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">{rows}</div>;
  };

  // 선택된 날짜의 정책 리스트
  const selectedDayPolicies = bookmarkedPolicies.filter(p => 
    p.endDate && isSameDay(selectedDate, parseISO(p.endDate))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        
        <aside className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Bell className="text-teal-600" size={20} />
              {format(selectedDate, 'M월 d일')} 일정
            </h3>
            
            {selectedDayPolicies.length > 0 ? (
              <div className="space-y-4">
                {selectedDayPolicies.map(p => (
                  <div key={p.scheduleId} className="p-4 rounded-xl bg-teal-50 border border-teal-100 group">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-teal-600 text-white text-[10px] font-bold">마감</span>
                      <span className="text-xs font-bold text-teal-700">청년정책</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">{p.policyTitle}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <MapPin size={12} />
                      {p.region}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-300 mb-4">
                  <CalIcon size={24} />
                </div>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  선택한 날짜에 예정된 <br />마감 일정이 없습니다.
                </p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-700 mb-4">내 북마크 정책 리스트</h4>
                <div className="space-y-3">
                    {bookmarkedPolicies.length > 0 ? (
                        bookmarkedPolicies.map(p => (
                            <div key={p.id} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                <span className="text-xs text-slate-600 truncate">{p.title}</span>
                                <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">
                                  {p.endDate ? format(parseISO(p.endDate), 'MM.dd') : '기한없음'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-slate-400">북마크한 정책이 없습니다.</p>
                    )}
                </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CalendarView;