// import React, { useMemo, useState } from "react";
// import { Search, Bookmark, ChevronDown, ChevronRight, MapPin, Calendar } from "lucide-react";
// import { motion as Motion } from 'framer-motion';
// import styled from "styled-components";

// /* ==============================
//    PolicyList (CSS-in-JSX Single File)
// ============================== */

// // 신청기간 구분 코드(0057) -> 라벨
// export const ApplyPeriodLabelByCode = {
//   "0057001": "특정기간",
//   "0057002": "상시",
//   "0057003": "마감",
// };



// export default function PolicyList() {
//   const [search, setSearch] = useState("");
//   // const [subject, setSubject] = useState("전체");
//   const [subjects, setSubjects] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // const [bookmarks, setBookmarks] = useState([]);
//   const CATEGORY = [
//     { label: "전체", icon: "" },
//     { label: "주거", icon: "🏡" },
//     { label: "취업", icon: "💼" },
//     { label: "금융", icon: "💰" },
//     { label: "복지", icon: "🎁" },
//     { label: "교육", icon: "📚" },
//   ];


//   const POLICIES = {
//     "items": [
//       {
//         "policyId": 1,
//         "title": "청년 월세 특별지원",
//         "category": "주거",
//         "regionName": "전국",
//         "applyEndDate": "2026-12-31",
//         "isOpen": true,
//         "isBookmarked": true,
//         "description": "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다."
//       },
//       {
//         "policyId": 2,
//         "title": "청년 월세 특별지원",
//         "category": "취업",
//         "regionName": "전국",
//         "applyEndDate": "2026-12-31",
//         "isOpen": true,
//         "isBookmarked": true,
//         "description": "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다."
//       }
//     ],
//     "total": 123
//   }

//   const [open, setOpen] = useState({
//     category: true,
//     regionName: true,
//     ageDate: true,
//     gender: true,
//     jobCd: true,
//     schoolCd: true,
//     plcyMajorCd: true,
//     earnCndSeCd: true,
//     sbizCd: true,
//   });
//   // 필터 상태 (예시)
//   const [filters, setFilters] = useState({
//     category: "전체", //주제(카테고리)
//     regionName: "전체", //지역
//     ageDate: "2026.01.01", // 연령대
//     gender: "", // 상별
//     jobCd: "", //취업상태
//     schoolCd: "", //힉력
//     plcyMajorCd: "", //전공
//     earnCndSeCd: "", //소득요건
//     sbizCd: "", //특화요건
//   });

// const statusClass = {
//   "접수중": "status-open",
//   "마감임박": "status-soon",
//   "마감": "status-close"
// };

//   // 북마크 상태: JSON의 isBookmarked를 초기값으로 세팅
//   const [bookmarks, setBookmarks] = useState(
//     (POLICIES.items || []).filter((p) => p.isBookmarked).map((p) => p.policyId)
//   );

//   const toggleBookmark = (policyId) => {
//     setBookmarks((prev) =>
//       prev.includes(policyId)
//         ? prev.filter((x) => x !== policyId)
//         : [...prev, policyId]
//     );
//   };


// // filter
// const filtered = useMemo(() => {
//   const q = search.trim();

//   return (POLICIES.items || []).filter((p) => {
//     const passCategory =
//       categories.length === 0 ||
//       categories.includes("전체") ||
//       categories.includes(p.category);

//     const passSearch = !q || p.title.includes(q);

//     return passCategory && passSearch;
//   });
// }, [search, categories]);



  

//   // 접수 상태 뱃지(예: isOpen 기반)
//   const getStatusLabel = (p) => (p.isOpen ? "접수중" : "마감");




//   const toggleSection = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));


//   // const reset = () => {
//   //   setFilters({
//   //     category: "전체", //주제(카테고리)
//   //     regionName: "전체", //지역
//   //     ageDate: "2026.01.01", // 연령대
//   //     gender: "", // 상별
//   //     jobCd: "", //취업상태
//   //     schoolCd: "", //힉력
//   //     plcyMajorCd: "", //전공
//   //     earnCndSeCd: "", //소득요건
//   //     sbizCd: "", //특화요건
//   //   });
//   //   setOpen({
//   //     category: true,
//   //     regionName: true,
//   //     ageDate: true,
//   //     gender: true,
//   //     jobCd: true,
//   //     schoolCd: true,
//   //     plcyMajorCd: true,
//   //     earnCndSeCd: true,
//   //     sbizCd: true,
//   //   });
//   // };


//   return (
//     <PolicyWrap>
//       <div className="container">
//         <h1>나에게 맞는 정책 찾기</h1>
//         <p className="sub">현재 {POLICIES.total}개의 정책이 등록되어 있습니다.</p>

//         {/* 검색 */}
//         <div className="search-wrap">
//           <div className="search-box">
//             <Search size={18} className="search-icon" />
//             <input
//               placeholder="정책명 또는 키워드로 검색해보세요"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="layout">
//           {/* 사이드바 */}
//           <aside className="sidebar">
//             <div className="sidebar-title">
//               <h2>검색필터</h2>
//               <p>초기화</p>
//             </div>

//             {/* 01 주제 */}
//             <button className="toggle-btn" onClick={() => toggleSection("category")}>주제<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.category ? "" : "hidden"}`}>
//               {CATEGORY.map((c) => (
//               <li key = {c.label}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={categories.includes(c.label)}
//                     onChange={() =>
//                       setCategories((prev) =>
//                         prev.includes(c.label)
//                           ? prev.filter((v) => v !== c.label)
//                           : [...prev, c.label]
//                       )
//                     }
//                   />
//                   <span style={{ marginRight: 8 }}>{c.icon}</span>
//                   {c.label}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 지역 */}
//             <button className="toggle-btn" onClick={() => toggleSection("regionName")}>지역<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.regionName ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((r) => (
//               <li key = {r}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(r)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(r)
//                           ? prev.filter((v) => v !== r)
//                           : [...prev, r]
//                       )
//                     }
//                   />
//                   {r}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 연령대 */}
//             <button className="toggle-btn" onClick={() => toggleSection("ageDate")}>연령대<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.ageDate ? "" : "hidden"}`}>
//                 <li>
//                   <input className="ageDate-input"
//                     type="input"
//                     placeholder="2000.01.01"
//                   />
//                 </li>
//             </ul>

//             {/* 성별 */}
//             <button className="toggle-btn" onClick={() => toggleSection("gender")}>성별<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.gender ? "" : "hidden"}`}>
//               {["남", "여"].map((g) => (
//               <li key = {g}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(g)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(g)
//                           ? prev.filter((v) => v !== g)
//                           : [...prev, g]
//                       )
//                     }
//                   />
//                   {g}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 취업상태 */}
//             <button className="toggle-btn" onClick={() => toggleSection("jobCd")}>취업상태<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.jobCd ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((item) => (
//               <li key = {item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(item)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((v) => v !== item)
//                           : [...prev, item]
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 학력상태 */}
//             <button className="toggle-btn" onClick={() => toggleSection("schoolCd")}>학력상태<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.schoolCd ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((item) => (
//               <li key = {item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(item)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((v) => v !== item)
//                           : [...prev, item]
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 전공 */}
//             <button className="toggle-btn" onClick={() => toggleSection("plcyMajorCd")}>전공<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.plcyMajorCd ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((item) => (
//               <li key = {item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(item)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((v) => v !== item)
//                           : [...prev, item]
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 소득요건 */}
//             <button className="toggle-btn" onClick={() => toggleSection("earnCndSeCd")}>소득요건<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.earnCndSeCd ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((item) => (
//               <li key = {item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(item)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((v) => v !== item)
//                           : [...prev, item]
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               </li>
//               ))}
//             </ul>

//             {/* 특화요건 */}
//             <button className="toggle-btn" onClick={() => toggleSection("sbizCd")}>특화요건<ChevronDown size={16} /></button>
//             <ul id="myList" className={`list ${open.sbizCd ? "" : "hidden"}`}>
//               {["항목 1", "항목 2", "항목 3"].map((item) => (
//               <li key = {item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={subjects.includes(item)}
//                     onChange={() =>
//                       setSubjects((prev) =>
//                         prev.includes(item)
//                           ? prev.filter((v) => v !== item)
//                           : [...prev, item]
//                       )
//                     }
//                   />
//                   {item}
//                 </label>
//               </li>
//               ))}
//             </ul>

//           </aside>

//           {/* 카드 영역 */}
//           <section className="cards">
//             {filtered.map(p => (
//               <Motion.div>
//                 <div key={p.policyId} className="card">
//                   <div>
//                     <div className="card-top">
//                       {/* 접수중 */}
//                       {/* <span className="status tag-status">{p.status}</span>  */}
//                       <span className={`status tag-status ${statusClass[p.status]}`}>{p.status}</span>
//                       {/* 주거, 취업, ... */}
//                       <span className="category tag-catList">{p.category}</span>
//                       <button
//                         className={`bookmark ${bookmarks.includes(p.policyId) ? "active" : ""}`}
//                         onClick={() => toggleBookmark(p.policyId)}
//                       >
//                         <Bookmark
//                           size={18}
//                           fill={bookmarks.includes(p.policyId) ? "currentColor" : "none"}
//                         />
//                       </button>
//                     </div>

//                     <div className="card-title">{p.title}</div>
//                     <div className="desc">{p.description}</div>
//                   </div>

//                   <div className="meta">
//                     <div>
//                       <MapPin size={12} /> {p.regionName}
//                     </div>
//                     <div>
//                       <Calendar size={12} /> {p.applyEndDate}
//                     </div>
//                     <button className="detail-btn">
//                       자세히 보기 <ChevronRight size={14} />
//                     </button>
//                   </div>
//                 </div>
//               </Motion.div>
//             ))}
//           </section>
//         </div>
//       </div>
//     </PolicyWrap>
//   );
// }

// const PolicyWrap = styled.div`
//   margin:0;
//   font-family: Pretendard, sans-serif;
    
//   .container{
//      max-width:1200px;
//      margin:0 auto;
//      padding:40px 0;
//   }

//   h1{
//     font-size:24px;
//     font-weight: 600;
//     margin:0 20px 6px 20px;
//   }

//   .sub{
//     color:#64748b;
//     margin: 0 20px 30px 20px;
//   }

//   /* 검색바 */
//   .search-wrap{
//     display:flex;
//     justify-content:center;
//     padding:100px 0;
//     background-color: #F1F5F9;
//   }

//   .search-box{
//     width:520px;
//     position:relative;
//   }

//   .search-box input{
//     width:100%;
//     padding:14px 16px 14px 46px;
//     border-radius:14px;
//     border:1px solid #e2e8f0;
//     font-size:14px;
//     background-color: #fff;
//     cursor: pointer;
//   }
  
//   .search-box input:focus{
//     border: 1px solid var(--blue-primary);
//     outline: none;
//   }

//   .search-icon{
//     position:absolute;
//     left:14px;
//     top:50%;
//     transform:translateY(-50%);
//     color:#94a3b8;
//   }

//   /* 레이아웃 */
//   .layout{
//     display:grid;
//     grid-template-columns:260px 1fr;
//     gap:24px;
//     padding: 50px 20px;
//   }

//   /* 사이드바 */
//   .sidebar{
//     background:#fff;
//     border-radius:16px;
//     /* padding:20px; */
//     border:1px solid #e5eaf1;
//     height:fit-content;

//     .sidebar-title{
//       display: flex; align-items: center; justify-content: space-between; padding:20px; background-color: #F1F5F9; border-radius: 16px 16px 0 0 ;
//       h2{ font-size: 20px; font-weight: 600; }
//       p{ font-size: 16px; font-weight: 500; cursor:pointer; }
//     }
//     .toggle-btn{ width: 100%; display: flex; align-items: center; padding: 10px 20px; justify-content: space-between; font-size: 18px; font-weight: 700; color:var(--blue-800);  }

//     .list{ width: 100%; }
//     .list label{ max-width: 258px; box-sizing:border-box; }
//     .list > li { padding: 10px 12px; cursor: pointer; margin:4px 8px; border-radius:8px;  }
//     .list > li:hover { background-color: #F1F5F9;  }
//     .list > li:active { background-color: #F1F5F9;  }
//   }
//   .sidebar h3{
//     font-size:15px;
//     margin-bottom:10px;
//   }
//   .ageDate-input{ width:100%; padding: 10px 12px; border-radius:8px; font-size: 17px; border: 1px solid #e5eaf1; }


//   /* 카드 리스트 */
//   .cards{
//     display:grid;
//     grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
//     gap:20px;
//   }

//   .card{
//     background:#fff;
//     border-radius:18px;
//     padding:20px;
//     border:1px solid #e5eaf1;
//     display:flex;
//     flex-direction:column;
//     justify-content:space-between;
//     transition:.2s;
//     cursor: pointer;

//     .card-top{
//       display: flex;
//       padding-bottom: 16px;
//       .category{ margin-left: 2px; }

//       .bookmark{ margin-left: auto; }
//     }
//   }

//   .card:hover{
//     box-shadow:0 10px 30px rgba(0,0,0,0.08);
//   }

//   .status{
//     display:inline-block;
//     font-size:12px;
//     padding:4px 10px;
//     border-radius:20px;
//     background:#ecfdf5;
//     color:#059669;
//     font-weight:600;
//   }

//   .bookmark{
//     background:none;
//     border:none;
//     cursor:pointer;
//     color:#94a3b8;
//   }

//   .bookmark.active{
//     color: var(--blue-primary);
//   }

//   .card-title{
//     font-size:17px;
//     font-weight:700;
//     margin-bottom: 6px;
//   }

//   .desc{
//     font-size:14px;
//     color:#64748b;
//     margin-bottom:16px;
//   }

//   .meta{
//     display:flex;
//     gap: 18px;
//     font-size:12px;
//     color:#94a3b8;
//     border-top:1px solid #f1f5f9;
//     padding-top:12px;

//     div{ display: flex; align-items: center; gap:4px; }
//   }

//   .detail-btn{
//     background:none;
//     border:none;
//     color: var(--blue-primary);
//     font-weight:600;
//     cursor:pointer;
//     display:flex;
//     align-items:center;
//     gap:4px;
//     margin-left: auto;
//   }

// /* 공통 뱃지 스타일 */
// .tag-status, .tag-catList{
//   font-size:12px;
//   padding:4px 12px;
//   border-radius:20px;
//   font-weight:600;
//   display:inline-block;
// }

// .tag-catList{
//   background-color: #F1F5F9;
//   color: #62748E;
//   border: 1px solid #E7ECF1;
// }

// /* 접수중 */
// .status-open{
//   background: #ECFDF5;
//   color: #009966;
// }

// /* 마감임박 */
// .status-soon{
//   background: #FFFBEB;
//   color: #E17100;
// }

// /* 마감 */
// .status-close{
//   background: #F1F5F9;
//   color: #62748E;
// }

// `;



import React, { useMemo, useState } from "react";
import { Search, Bookmark, ChevronDown, ChevronRight, MapPin, Calendar, RotateCcw, UserCheck, Filter } from "lucide-react";
import { motion as Motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components";

/* ==============================
    필터 옵션 데이터 (DB 공통코드 기반)
============================== */
const FILTER_DATA = {
  jobCd: [
    { id: "0013001", label: "재직자" }, { id: "0013003", label: "미취업자" },
    { id: "0013004", label: "프리랜서" }, { id: "0013006", label: "(예비)창업자" },
    { id: "0013010", label: "제한없음" }
  ],
  schoolCd: [
    { id: "0049005", label: "대학 재학" }, { id: "0049007", label: "대학 졸업" },
    { id: "0049008", label: "석·박사" }, { id: "0049010", label: "제한없음" }
  ],
  plcyMajorCd: [
    { id: "0011001", label: "인문계열" }, { id: "0011002", label: "사회계열" },
    { id: "0011005", label: "공학계열" }, { id: "0011009", label: "제한없음" }
  ],
  earnCndSeCd: [
    { id: "0043001", label: "무관" }, { id: "0043002", label: "연소득" }, { id: "0043003", label: "기타" }
  ],
  sbizCd: [
    { id: "0014001", label: "중소기업" }, { id: "0014002", label: "여성" },
    { id: "0014008", label: "지역인재" }, { id: "0014010", label: "제한없음" }
  ],
  region: ["전국", "서울특별시", "경기도", "부산광역시", "대구광역시"]
};

// 테스트용 목데이터 (DB 스키마 필드명 반영)
const MOCK_POLICIES = {
  items: [
    {
      policyId: 1,
      title: "청년 월세 특별지원",
      category: "주거",
      regionName: "서울특별시",
      applyEndDate: "2026-12-31",
      isOpen: true,
      description: "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다.",
      job_code: "0013004", 
      school_code: "0049005",
      major_code: "0011001",
      income_code: "0043002"
    },
    {
      policyId: 2,
      title: "공학도 혁신 취업 장려금",
      category: "취업",
      regionName: "경기도",
      applyEndDate: "2026-11-15",
      isOpen: true,
      description: "공학 계열 전공자를 위한 맞춤형 취업 장려금 지원 사업입니다.",
      job_code: "0013003",
      school_code: "0049007",
      major_code: "0011005",
      income_code: "0043001"
    }
  ],
  total: 123
};

const statusClass = {
  "접수중": "status-open",
  "마감임박": "status-soon",
  "마감": "status-close"
};

export default function PolicyList({ bookmarks = [], toggleBookmark }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: "전체",
    ageDate: "",
    jobCd: [],
    schoolCd: [],
    plcyMajorCd: [],
    earnCndSeCd: "",
    sbizCd: [],
  });

  const getStatusLabel = (p) => (p.isOpen ? "접수중" : "마감");

  // 7대 요건 기반 필터링 로직
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (MOCK_POLICIES.items || []).filter((p) => {
      const passSearch = !q || p.title.toLowerCase().includes(q);
      const passRegion = filters.region === "전체" || p.regionName === filters.region;
      const passJob = filters.jobCd.length === 0 || filters.jobCd.includes(p.job_code);
      const passSchool = filters.schoolCd.length === 0 || filters.schoolCd.includes(p.school_code);
      const passMajor = filters.plcyMajorCd.length === 0 || filters.plcyMajorCd.includes(p.major_code);
      const passIncome = !filters.earnCndSeCd || p.income_code === filters.earnCndSeCd;

      return passSearch && passRegion && passJob && passSchool && passMajor && passIncome;
    });
  }, [search, filters]);

  const reset = () => {
    setFilters({ region: "전체", ageDate: "", jobCd: [], schoolCd: [], plcyMajorCd: [], earnCndSeCd: "", sbizCd: [] });
    setSearch("");
  };

  return (
    <PolicyWrap>
      <div className="container">
        <header className="page-header">
          <h1>나에게 맞는 정책 찾기</h1>
          <p className="sub">현재 {filtered.length}개의 맞춤 정책이 있습니다.</p>
        </header>

        <div className="search-wrap">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              placeholder="정책명 또는 키워드로 검색해보세요" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="layout">
          <aside className="sidebar">
            <div className="sidebar-title">
              <h2><Filter size={18} /> 검색필터</h2>
              <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> 초기화</button>
            </div>

            <div className="filter-group">
              <div className="group-label"><UserCheck size={14} /> 필수 요건</div>
              
              <div className="item-box">
                <label>지역</label>
                <select value={filters.region} onChange={(e) => setFilters(p => ({ ...p, region: e.target.value }))}>
                  <option value="전체">전체 지역</option>
                  {FILTER_DATA.region.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="item-box">
                <label>취업 상태</label>
                <div className="chip-group">
                  {FILTER_DATA.jobCd.map(j => (
                    <button 
                      key={j.id}
                      className={`chip ${filters.jobCd.includes(j.id) ? "active" : ""}`}
                      onClick={() => setFilters(p => ({
                        ...p, jobCd: p.jobCd.includes(j.id) ? p.jobCd.filter(id => id !== j.id) : [...p.jobCd, j.id]
                      }))}
                    >{j.label}</button>
                  ))}
                </div>
              </div>

              <div className="item-box">
                <label>학력 상태</label>
                <div className="chip-group">
                  {FILTER_DATA.schoolCd.map(s => (
                    <button 
                      key={s.id}
                      className={`chip ${filters.schoolCd.includes(s.id) ? "active" : ""}`}
                      onClick={() => setFilters(p => ({
                        ...p, schoolCd: p.schoolCd.includes(s.id) ? p.schoolCd.filter(id => id !== s.id) : [...p.schoolCd, s.id]
                      }))}
                    >{s.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-group optional">
              <div className="group-label">추가 선택</div>
              <div className="item-box">
                <label>전공분야</label>
                <div className="chip-group">
                  {FILTER_DATA.plcyMajorCd.map(m => (
                    <button 
                      key={m.id}
                      className={`chip ${filters.plcyMajorCd.includes(m.id) ? "active" : ""}`}
                      onClick={() => setFilters(p => ({
                        ...p, plcyMajorCd: p.plcyMajorCd.includes(m.id) ? p.plcyMajorCd.filter(id => id !== m.id) : [...p.plcyMajorCd, m.id]
                      }))}
                    >{m.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="cards">
            {filtered.length > 0 ? (
              filtered.map((p) => {
                const status = getStatusLabel(p);
                const isBookmarked = bookmarks.includes(p.policyId);

                return (
                  <Motion.div key={p.policyId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="card">
                      <div>
                        <div className="card-top">
                          <span className={`status tag-status ${statusClass[status] || ""}`}>
                            {status}
                          </span>
                          <span className="category tag-catList">{p.category}</span>

                          <button
                            type="button"
                            className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark?.(p.policyId);
                            }}
                          >
                            <Bookmark size={20} fill={isBookmarked ? "#3b82f6" : "none"} color={isBookmarked ? "#3b82f6" : "#cbd5e1"} />
                          </button>
                        </div>

                        <div className="card-title">{p.title}</div>
                        <div className="desc">{p.description}</div>
                      </div>

                      <div className="meta">
                        <div><MapPin size={12} /> {p.regionName}</div>
                        <div><Calendar size={12} /> {p.applyEndDate}</div>
                        <button className="detail-btn" type="button">
                          자세히 보기 <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </Motion.div>
                );
              })
            ) : (
              <div className="empty-msg">조건에 맞는 정책이 없습니다.</div>
            )}
          </section>
        </div>
      </div>
    </PolicyWrap>
  );
}

const PolicyWrap = styled.div`
  background: #fcfdfe; min-height: 100vh; font-family: 'Pretendard', sans-serif;
  .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
  .page-header { margin-bottom: 40px; h1 { font-size: 28px; font-weight: 800; color: #1e293b; } .sub { color: #64748b; margin-top: 8px; } }
  .search-wrap { background: #fff; padding: 40px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 40px; display: flex; justify-content: center; }
  .search-box { width: 100%; max-width: 600px; position: relative; input { width: 100%; padding: 16px 50px; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 16px; &:focus { border-color: #3b82f6; outline: none; } } .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #94a3b8; } }
  .layout { display: grid; grid-template-columns: 320px 1fr; gap: 40px; }
  .sidebar { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; height: fit-content; position: sticky; top: 20px; }
  .sidebar-title { padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; h2 { font-size: 18px; display: flex; align-items: center; gap: 8px; } .reset-btn { background: none; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; } }
  .filter-group { padding: 24px; border-bottom: 1px solid #f1f5f9; &.optional { background: #fcfdfe; } .group-label { font-size: 13px; font-weight: 700; color: #3b82f6; margin-bottom: 20px; display: flex; align-items: center; gap: 6px; } }
  .item-box { margin-bottom: 24px; label { display: block; font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 12px; } select { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #e2e8f0; } }
  .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 8px 14px; border-radius: 10px; border: 1px solid #f1f5f9; background: #f8fafc; font-size: 13px; cursor: pointer; &.active { background: #3b82f6; color: #fff; font-weight: 600; } }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
  .card { background: #fff; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; justify-content: space-between; transition: 0.2s; &:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); } }
  .card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; .bookmark-btn { margin-left: auto; background: none; border: none; cursor: pointer; } }
  .card-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #1e293b; }
  .desc { font-size: 14px; color: #64748b; margin-bottom: 20px; line-height: 1.5; height: 3em; overflow: hidden; }
  .meta { display: flex; gap: 16px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; align-items: center; .detail-btn { margin-left: auto; background: none; border: none; color: #3b82f6; font-weight: 600; cursor: pointer; display: flex; align-items: center; } }
  .tag-status { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .status-open { background: #ecfdf5; color: #059669; }
  .tag-catList { padding: 4px 10px; border-radius: 20px; background: #f1f5f9; color: #64748b; font-size: 12px; }
  .empty-msg { text-align: center; padding: 100px 0; color: #94a3b8; grid-column: 1/-1; }
`;