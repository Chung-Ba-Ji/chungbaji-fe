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



import React, { useMemo, useState, useEffect } from "react";
import { Search, Bookmark, ChevronDown, ChevronRight, MapPin, Calendar, RotateCcw, UserCheck, Filter } from "lucide-react";
import { motion as Motion, AnimatePresence } from 'framer-motion';
import styled from "styled-components";

// API 연동용 (서버 연결 안될 때를 대비해 try-catch 처리)
// import { fetchSearchPolicies, fetchRecommendPolicies } from "../api/policy"; 

/* ==============================
    필터 옵션 데이터
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
  region: [
    { id: "11000", label: "서울특별시" }, { id: "41000", label: "경기도" },
    { id: "26000", label: "부산광역시" }, { id: "27000", label: "대구광역시" }
  ]
};

/* ==============================
    리얼 목데이터 (10개)
============================== */
const MOCK_DATA = [
  { policyId: 1, title: "청년 월세 특별지원", category: "주거", regionName: "서울특별시", regionCode: "11000", applyEndDate: "2026-12-31", isOpen: true, policyDescription: "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다.", job_code: "0013003", school_code: "0049005", major_code: "0011009" },
  { policyId: 2, title: "공학도 혁신 취업 장려금", category: "취업", regionName: "경기도", regionCode: "41000", applyEndDate: "2026-11-15", isOpen: true, policyDescription: "공학 계열 전공자를 채용하는 기업과 청년에게 장려금을 지원합니다.", job_code: "0013001", school_code: "0049007", major_code: "0011005" },
  { policyId: 3, title: "예술인 창작 지원금", category: "복지", regionName: "서울특별시", regionCode: "11000", applyEndDate: "2026-05-20", isOpen: true, policyDescription: "예체능 전공 미취업 청년들을 위한 창작 활동비를 지원합니다.", job_code: "0013003", school_code: "0049007", major_code: "0011006" },
  { policyId: 4, title: "창업가 리더십 아카데미", category: "교육", regionName: "전국", regionCode: "00000", applyEndDate: "2026-03-10", isOpen: false, policyDescription: "예비 창업자들을 위한 실전 비즈니스 모델링 교육 프로그램입니다.", job_code: "0013006", school_code: "0049010", major_code: "0011003" },
  { policyId: 5, title: "지역인재 정착 지원금", category: "금융", regionName: "부산광역시", regionCode: "26000", applyEndDate: "2026-08-30", isOpen: true, policyDescription: "부산 지역 대학 졸업 후 현지 기업에 취업한 청년에게 정착금을 지원합니다.", job_code: "0013001", school_code: "0049007", major_code: "0011009" },
  { policyId: 6, title: "IT 프리랜서 사회보험료 지원", category: "복지", regionName: "경기도", regionCode: "41000", applyEndDate: "2026-10-12", isOpen: true, policyDescription: "불안정한 소득의 프리랜서들을 위해 사회보험료 일부를 보조합니다.", job_code: "0013004", school_code: "0049010", major_code: "0011005" },
  { policyId: 7, title: "인문학 청년 강사 양성", category: "교육", regionName: "서울특별시", regionCode: "11000", applyEndDate: "2026-04-01", isOpen: true, policyDescription: "인문/사회계열 석박사 학위 소지자를 강사로 매칭해 드립니다.", job_code: "0013003", school_code: "0049008", major_code: "0011001" },
  { policyId: 8, title: "여성 기술창업 디딤돌", category: "취업", regionName: "전국", regionCode: "00000", applyEndDate: "2026-07-22", isOpen: true, policyDescription: "이공계 여성 청년들의 기술 창업 아이템 사업화를 돕습니다.", job_code: "0013006", school_code: "0049005", major_code: "0011004" },
  { policyId: 9, title: "중소기업 재직자 저축 장려금", category: "금융", regionName: "대구광역시", regionCode: "27000", applyEndDate: "2026-09-15", isOpen: true, policyDescription: "대구 소재 중소기업 재직자의 자산 형성을 위한 매칭 저축입니다.", job_code: "0013001", school_code: "0049010", major_code: "0011009" },
  { policyId: 10, title: "사회과학 데이터 분석가 캠프", category: "교육", regionName: "서울특별시", regionCode: "11000", applyEndDate: "2026-02-28", isOpen: true, policyDescription: "사회과학 전공자들을 위한 데이터 분석 역량 강화 교육입니다.", job_code: "0013003", school_code: "0049007", major_code: "0011002" },
];

const statusClass = { "접수중": "status-open", "마감": "status-close" };

export default function PolicyList({ bookmarks = [], toggleBookmark }) {
  const [policies, setPolicies] = useState(MOCK_DATA); // 초기값에 목데이터를 넣어줘야 화면에 뜸!
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    regionCode: "11000",
    jobCode: 0,
    educationCode: 0,
    majorCode: 0,
  });

  // 필터링 로직 (실제 목데이터 기반 클라이언트 필터링)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return policies.filter((p) => {
      const passSearch = !q || p.title.toLowerCase().includes(q);
      const passRegion = filters.regionCode === "00000" || p.regionCode === filters.regionCode || p.regionCode === "00000";
      const passJob = filters.jobCode === 0 || p.job_code === String(filters.jobCode).padStart(7, '0');
      const passEdu = filters.educationCode === 0 || p.school_code === String(filters.educationCode).padStart(7, '0');
      const passMajor = filters.majorCode === 0 || p.major_code === String(filters.majorCode).padStart(7, '0');
      
      return passSearch && passRegion && passJob && passEdu && passMajor;
    });
  }, [search, policies, filters]);

  const reset = () => {
    setFilters({ regionCode: "11000", jobCode: 0, educationCode: 0, majorCode: 0 });
    setSearch("");
  };

  const getStatusLabel = (p) => (p.isOpen ? "접수중" : "마감");

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
              placeholder="정책명 검색..." 
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
                <select value={filters.regionCode} onChange={(e) => setFilters(p => ({ ...p, regionCode: e.target.value }))}>
                  <option value="00000">전국</option>
                  {FILTER_DATA.region.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>

              <div className="item-box">
                <label>취업 상태</label>
                <div className="chip-group">
                  {FILTER_DATA.jobCd.map(j => (
                    <button key={j.id} className={`chip ${filters.jobCode === parseInt(j.id) ? "active" : ""}`}
                      onClick={() => setFilters(p => ({ ...p, jobCode: parseInt(j.id) }))}
                    >{j.label}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="filter-group optional">
              <div className="group-label">전공분야</div>
              <div className="chip-group">
                {FILTER_DATA.plcyMajorCd.map(m => (
                  <button key={m.id} className={`chip ${filters.majorCode === parseInt(m.id) ? "active" : ""}`}
                    onClick={() => setFilters(p => ({ ...p, majorCode: parseInt(m.id) }))}
                  >{m.label}</button>
                ))}
              </div>
            </div>
          </aside>

          <section className="cards">
            {filtered.map((p) => {
              const status = getStatusLabel(p);
              const isBookmarked = bookmarks.includes(p.policyId);
              return (
                <Motion.div key={p.policyId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="card">
                    <div className="card-top">
                      <span className={`status tag-status ${statusClass[status]}`}>{status}</span>
                      <span className="category tag-catList">{p.category}</span>
                      <button className={`bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(p.policyId)}>
                        <Bookmark size={20} fill={isBookmarked ? "#3b82f6" : "none"} color={isBookmarked ? "#3b82f6" : "#cbd5e1"} />
                      </button>
                    </div>
                    <div className="card-title">{p.title}</div>
                    <p className="desc">{p.policyDescription}</p>
                    <div className="meta">
                      <div><MapPin size={12} /> {p.regionName}</div>
                      <div><Calendar size={12} /> {p.applyEndDate}</div>
                      <button className="detail-btn">자세히 보기 <ChevronRight size={14} /></button>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
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
  .search-box { width: 100%; max-width: 600px; position: relative; input { width: 100%; padding: 16px 50px; border-radius: 16px; border: 1px solid #e2e8f0; font-size: 16px; &:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); } } .search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #94a3b8; } }
  .layout { display: grid; grid-template-columns: 320px 1fr; gap: 40px; }
  .sidebar { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; height: fit-content; position: sticky; top: 20px; }
  .sidebar-title { padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; h2 { font-size: 18px; display: flex; align-items: center; gap: 8px; } .reset-btn { background: none; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px; } }
  .filter-group { padding: 24px; border-bottom: 1px solid #f1f5f9; &.optional { background: #fcfdfe; } .group-label { font-size: 13px; font-weight: 700; color: #3b82f6; margin-bottom: 20px; display: flex; align-items: center; gap: 6px; } }
  .item-box { margin-bottom: 24px; label { display: block; font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 12px; } select { width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #e2e8f0; } }
  .chip-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { padding: 8px 14px; border-radius: 10px; border: 1px solid #f1f5f9; background: #f8fafc; font-size: 13px; color: #64748b; cursor: pointer; &.active { background: #3b82f6; border-color: #3b82f6; color: #fff; font-weight: 600; } }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
  .card { background: #fff; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; justify-content: space-between; transition: 0.2s; &:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); } }
  .card-top { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; .bookmark-btn { margin-left: auto; background: none; border: none; cursor: pointer; } }
  .card-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #1e293b; }
  .desc { font-size: 14px; color: #64748b; margin-bottom: 20px; line-height: 1.5; height: 3em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .meta { display: flex; gap: 16px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; align-items: center; .detail-btn { margin-left: auto; background: none; border: none; color: #3b82f6; font-weight: 600; cursor: pointer; display: flex; align-items: center; } }
  .tag-status { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .status-open { background: #ecfdf5; color: #059669; }
  .status-close { background: #f1f5f9; color: #64748b; }
  .tag-catList { padding: 4px 10px; border-radius: 20px; background: #f1f5f9; color: #64748b; font-size: 12px; }
  .empty-msg { text-align: center; padding: 100px 0; color: #94a3b8; grid-column: 1/-1; }
`;