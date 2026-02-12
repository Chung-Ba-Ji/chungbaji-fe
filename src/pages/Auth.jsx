import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, Heart } from 'lucide-react';
import api from '../api/axios';

const Auth = ({ mode = 'login', onToggleMode, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DB 옵션 데이터 저장소
  const [options, setOptions] = useState({
    sido: [],
    sigungu: [],
    jobs: [],
    educations: [],
    majors: [],
    incomes: [],
    specials: []
  });

  // 필드
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone_num: '',
    nickname: '', gender: '', birth_date: '', 
    region_sido: '', region_sigungu: '',
    job_code: '', education_code: '', major_code: '',
    income_code: '', special_code: ''
  });

  // 초기 로드: 시도 및 공통 코드 목록 가져오기
  useEffect(() => {
    if (mode === 'signup') {
      const fetchInitialData = async () => {
        try {
          const [sido, jobs, edus, majors, incomes, specials] = await Promise.all([
            api.get('/api/regions/sido'),
            api.get('/api/codes/jobs'),
            api.get('/api/codes/educations'),
            api.get('/api/codes/majors'),
            api.get('/api/codes/incomes'),
            api.get('/api/codes/specials')
          ]);

          setOptions(prev => ({
            ...prev,
            sido: Array.isArray(sido.data) ? sido.data : [],
            jobs: Array.isArray(jobs.data) ? jobs.data : [],
            educations: Array.isArray(edus.data) ? edus.data : [],
            majors: Array.isArray(majors.data) ? majors.data : [],
            incomes: Array.isArray(incomes.data) ? incomes.data : [],
            specials: Array.isArray(specials.data) ? specials.data : []
          }));
        } catch (error) {
          console.error("데이터 로드 실패:", error);
        }
      };
      fetchInitialData();
    }
  }, [mode]);

  // 시도 변경 시 시군구 목록 동적 로드
  useEffect(() => {
    if (formData.region_sido) {
      const fetchSigungu = async () => {
        try {
          const response = await api.get(`/api/regions/sigungu/${formData.region_sido}`);
          setOptions(prev => ({ 
            ...prev, 
            sigungu: Array.isArray(response.data) ? response.data : [] 
          }));
        } catch (error) {
          console.error("시군구 로드 실패:", error);
        }
      };
      fetchSigungu();
    } else {
      setOptions(prev => ({ ...prev, sigungu: [] }));
    }
  }, [formData.region_sido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'region_sido' && { region_sigungu: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        // --- 로그인 ---
        const response = await api.post('/api/members/login', {
          email: formData.email,
          password: formData.password
        });

        // 사용자 정보는 응답 바디(response.data)에 위치
        const userData = response.data;

        // 토큰은 응답 헤더(headers)에 위치
        const authHeader = response.headers['authorization'];
        
        if (authHeader) {
          const tokenValue = authHeader.startsWith('Bearer ') 
                             ? authHeader.split(' ')[1] 
                             : authHeader;
          localStorage.setItem('token', tokenValue);
        }

        if (onLoginSuccess) onLoginSuccess(userData);
        
      } else {
        // --- 회원가입 ---
        await api.post('/api/members/signUp', formData);
        alert('회원가입이 완료되었습니다! 로그인해 주세요.');
        onToggleMode();
      }
    } catch (error) {
      alert(error.response?.data?.message || '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mx-auto my-4 transition-all duration-500 ease-in-out ${
      mode === 'signup' ? 'w-[95vw] max-w-[1100px]' : 'w-full max-w-[450px]'
    }`}>
      
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto scrollbar-hide">
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-600/20">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            {mode === 'login' ? '환영합니다!' : '청년허브 회원가입'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`grid gap-y-6 ${mode === 'signup' ? 'md:grid-cols-10 md:gap-x-12' : 'grid-cols-1'}`}>
            
            <div className={`${mode === 'signup' ? 'md:col-span-4' : ''} space-y-4`}>
              {mode === 'signup' && <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest border-b pb-1 border-slate-100">계정 정보</p>}
              <div className="grid gap-3">
                <div className="form-group">
                  <label className="label-style">이메일 *</label>
                  <div className="relative">
                    <Mail className="icon-style" size={16} />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" className="input-style" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label-style">비밀번호 *</label>
                  <div className="relative">
                    <Lock className="icon-style" size={16} />
                    <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" className="input-style" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <>
                    <div className="form-group">
                      <label className="label-style">이름 *</label>
                      <div className="relative">
                        <User className="icon-style" size={16} />
                        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="실명 입력" className="input-style" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label-style">별명 *</label>
                      <div className="relative">
                        <Heart className="icon-style" size={16} />
                        <input name="nickname" type="text" value={formData.nickname} onChange={handleChange} placeholder="닉네임 입력" className="input-style" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="label-style">전화번호 *</label>
                      <div className="relative">
                        <Phone className="icon-style" size={16} />
                        <input name="phone_num" type="tel" value={formData.phone_num} onChange={handleChange} placeholder="010-0000-0000" className="input-style" required />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {mode === 'signup' && (
              <div className="md:col-span-6 space-y-5 md:border-l md:border-slate-50 md:pl-10">
                <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest border-b pb-1 border-slate-100">맞춤 정책 정보</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label-style">생년월일 *</label>
                    <input name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} className="input-style-no-icon" required />
                  </div>
                  <div className="form-group">
                    <label className="label-style">성별 *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="input-style-no-icon" required>
                      <option value="">선택</option>
                      <option value="M">남성</option>
                      <option value="F">여성</option>
                    </select>
                  </div>

                  <div className="form-group col-span-2">
                    <label className="label-style">거주 지역 *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select name="region_sido" value={formData.region_sido} onChange={handleChange} className="input-style-no-icon" required>
                        <option value="">시/도 선택</option>
                        {options.sido?.map(opt => (
                          <option key={opt.region_code} value={opt.region_code}>{opt.region_name}</option>
                        ))}
                      </select>
                      <select name="region_sigungu" value={formData.region_sigungu} onChange={handleChange} className="input-style-no-icon" required disabled={!formData.region_sido}>
                        <option value="">시/군/구 선택</option>
                        {options.sigungu?.map(opt => (
                          <option key={opt.region_code} value={opt.region_code}>{opt.region_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="label-style">취업 상태 *</label>
                    <select name="job_code" value={formData.job_code} onChange={handleChange} className="input-style-no-icon" required>
                      <option value="">상태 선택</option>
                      {options.jobs?.map(opt => <option key={opt.code} value={opt.code}>{opt.code_desc}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label-style">최종 학력 *</label>
                    <select name="education_code" value={formData.education_code} onChange={handleChange} className="input-style-no-icon" required>
                      <option value="">학력 선택</option>
                      {options.educations?.map(opt => <option key={opt.code} value={opt.code}>{opt.code_desc}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase text-center tracking-widest">추가 선택 정보</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="label-style">전공 분야</label>
                      <select name="major_code" value={formData.major_code} onChange={handleChange} className="input-style-no-icon bg-white">
                        <option value="">전공 선택</option>
                        {options.majors?.map(opt => <option key={opt.code} value={opt.code}>{opt.code_desc}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-group">
                        <label className="label-style">소득 구간</label>
                        <select name="income_code" value={formData.income_code} onChange={handleChange} className="input-style-no-icon bg-white">
                          <option value="">선택</option>
                          {options.incomes?.map(opt => <option key={opt.code} value={opt.code}>{opt.code_desc}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="label-style">특화 분류</label>
                        <select name="special_code" value={formData.special_code} onChange={handleChange} className="input-style-no-icon bg-white">
                          <option value="">선택</option>
                          {options.specials?.map(opt => <option key={opt.code} value={opt.code}>{opt.code_desc}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50">
            <button type="submit" disabled={isLoading} className="w-full max-w-sm mx-auto py-3.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg flex items-center justify-center gap-2">
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{mode === 'login' ? '로그인' : '가입 완료'}</>}
            </button>
            <div className="mt-4 text-center">
              <button type="button" onClick={onToggleMode} className="text-slate-500 text-xs font-medium hover:text-teal-600 transition-colors">
                {mode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .form-group { display: flex; flex-direction: column; gap: 0.35rem; }
        .label-style { font-size: 0.75rem; font-weight: 700; color: #475569; margin-left: 0.1rem; }
        .input-style { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 0.75rem; background-color: #f8fafc; border: 1px solid #f1f5f9; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-style:focus { border-color: #0d9488; background-color: #fff; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.05); }
        .input-style-no-icon { width: 100%; padding: 0 0.85rem; height: 2.85rem; line-height: 2.85rem; border-radius: 0.75rem; background-color: #f8fafc; border: 1px solid #f1f5f9; outline: none; font-size: 0.85rem; appearance: auto; }
        .icon-style { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Auth;