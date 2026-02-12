import React, { useMemo, useState } from "react";
import { Search, Bookmark, ChevronRight, MapPin, Calendar } from "lucide-react";
import { motion as Motion } from 'framer-motion';
import styled from "styled-components";

/* ==============================
   PolicyList (CSS-in-JSX Single File)
============================== */

export default function PolicyList() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("전체");
  // const [bookmarks, setBookmarks] = useState([]);
  const SUBJECTS = [
    { label: "전체", icon: "" },
    { label: "주거", icon: "🏡" },
    { label: "취업", icon: "💼" },
    { label: "금융", icon: "💰" },
    { label: "복지", icon: "🎁" },
    { label: "교육", icon: "📚" },
  ];


  const POLICIES = {
    "items": [
      {
        "policyId": 1,
        "title": "청년 월세 특별지원",
        "category": "주거",
        "regionName": "전국",
        "applyEndDate": "2026-12-31",
        "isOpen": true,
        "isBookmarked": true,
        "description": "청년들의 주거비 부담 경감을 위해 월세를 최대 20만원까지 지원합니다."
      }
    ],
    "total": 123
  }

const statusClass = {
  "접수중": "status-open",
  "마감임박": "status-soon",
  "마감": "status-close"
};

  // 북마크 상태: JSON의 isBookmarked를 초기값으로 세팅
  const [bookmarks, setBookmarks] = useState(
    (POLICIES.items || []).filter((p) => p.isBookmarked).map((p) => p.policyId)
  );

  const toggleBookmark = (policyId) => {
    setBookmarks((prev) =>
      prev.includes(policyId)
        ? prev.filter((x) => x !== policyId)
        : [...prev, policyId]
    );
  };

  // items 배열에서 필터링
  const filtered = useMemo(() => {
    const q = search.trim();
    return (POLICIES.items || []).filter((p) =>
      (subject === "전체" || p.category === subject) &&
      (!q || p.title.includes(q))
    );
  }, [search, subject, POLICIES.items]);

  

  // 접수 상태 뱃지(예: isOpen 기반)
  const getStatusLabel = (p) => (p.isOpen ? "접수중" : "마감");


  const [open, setOpen] = useState({
    subject: true,
    region: true,
    age: true,
    gender: true,
    job: true,
    edu: true,
    major: true,
    income: true,
    special: true,
  });
  // 필터 상태 (예시)
  const [filters, setFilters] = useState({
    subject: "전체",
    region: "전체",
    ageDate: "2026.01.01",
    gender: "",
    job: "",
    edu: "",
    major: "",
    income: "",
    special: "",
  });

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  const sectionTitle = (title, key) => (
    <button type="button" className="sectionHead" onClick={() => toggle(key)}>
      <span className="sectionTitle">{title}</span>
      <span className={`chev ${open[key] ? "on" : ""}`} aria-hidden="true">
        ▾
      </span>
    </button>
  );

  const reset = () => {
    setFilters({
      subject: "전체",
      region: "전체",
      ageDate: "2026.01.01",
      gender: "",
      job: "",
      edu: "",
      major: "",
      income: "",
      special: "",
    });
    setOpen({
      subject: true,
      region: true,
      age: true,
      gender: true,
      job: true,
      edu: true,
      major: true,
      income: true,
      special: true,
    });
  };


  return (
    <PolicyWrap>
      <div className="container">
        <h1>나에게 맞는 정책 찾기</h1>
        <p className="sub">현재 {POLICIES.total}개의 정책이 등록되어 있습니다.</p>

        {/* 검색 */}
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
          {/* 사이드바 */}
          <aside className="sidebar">
            <div className="sidebar-title">
              <h2>검색필터</h2>
              <p>초기화</p>
            </div>
      
            {/* <h3>주제</h3>
            {["전체", "주거", "취업", "금융", "복지", "교육", "창업"].map(cat => (
              <button
                key={cat}
                className={subject === cat ? "active" : ""}
                onClick={() => setSubject(cat)}
              >
                {cat}
              </button>
            ))} */}
            {/* 주제 */}
          <div className="section">
            {sectionTitle("주제", "subject")}
            <div className={`content ${open.subject ? "" : "hidden"}`}>
              <div className="list">
                {SUBJECTS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`rowBtn ${filters.subject === s.label ? "active" : ""}`}
                    onClick={() => setFilters((p) => ({ ...p, subject: s.label }))}
                  >
                    <span className="icon">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          </aside>

          {/* 카드 영역 */}
          <section className="cards">
            {filtered.map(p => (
              <Motion.div>
                <div key={p.id} className="card">
                  <div>
                    <div className="card-top">
                      {/* 접수중 */}
                      {/* <span className="status tag-status">{p.status}</span>  */}
                      <span className={`status tag-status ${statusClass[p.status]}`}>{p.status}</span>
                      {/* 주거, 취업, ... */}
                      <span className="category tag-catList">{p.category}</span>
                      <button
                        className={`bookmark ${bookmarks.includes(p.policyId) ? "active" : ""}`}
                        onClick={() => toggleBookmark(p.policyId)}
                      >
                        <Bookmark
                          size={18}
                          fill={bookmarks.includes(p.policyId) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="card-title">{p.title}</div>
                    <div className="desc">{p.description}</div>
                  </div>

                  <div className="meta">
                    <div>
                      <MapPin size={12} /> {p.regionName}
                    </div>
                    <div>
                      <Calendar size={12} /> {p.applyEndDate}
                    </div>
                    <button className="detail-btn">
                      자세히 보기 <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </Motion.div>
            ))}
          </section>
        </div>
      </div>
    </PolicyWrap>
  );
}

const PolicyWrap = styled.div`
  margin:0;
  font-family: Pretendard, sans-serif;
    
  .container{
     max-width:1200px;
     margin:0 auto;
     padding:40px 0;
  }

  h1{
    font-size:24px;
    font-weight: 600;
    margin:0 20px 6px 20px;
  }

  .sub{
    color:#64748b;
    margin: 0 20px 30px 20px;
  }

  /* 검색바 */
  .search-wrap{
    display:flex;
    justify-content:center;
    padding:100px 0;
    background-color: #F1F5F9;
  }

  .search-box{
    width:520px;
    position:relative;
  }

  .search-box input{
    width:100%;
    padding:14px 16px 14px 46px;
    border-radius:14px;
    border:1px solid #e2e8f0;
    font-size:14px;
    background-color: #fff;
    cursor: pointer;
  }
  
  .search-box input:focus{
    border: 1px solid var(--blue-primary);
    outline: none;
  }

  .search-icon{
    position:absolute;
    left:14px;
    top:50%;
    transform:translateY(-50%);
    color:#94a3b8;
  }

  /* 레이아웃 */
  .layout{
    display:grid;
    grid-template-columns:260px 1fr;
    gap:24px;
    padding: 50px 20px;
  }

  /* 사이드바 */
  .sidebar{
    background:#fff;
    border-radius:16px;
    /* padding:20px; */
    border:1px solid #e5eaf1;
    height:fit-content;

    .sidebar-title{
      display: flex; align-items: center; justify-content: space-between; padding:20px; background-color: #F1F5F9; border-radius: 16px 16px 0 0 ;
      h2{ font-size: 20px; font-weight: 600; }
      p{ font-size: 16px; font-weight: 500; cursor:pointer; }
    }
  }
  .sidebar h3{
    font-size:15px;
    margin-bottom:10px;
  }

  .sidebar button{
    display:block;
    width:100%;
    text-align:left;
    padding:10px;
    border:none;
    background:#fff;
    cursor:pointer;
    border-radius:8px;
    font-size:14px;
  }

  .sidebar button:hover{
    background:#f1f5f9;
  }

  .sidebar .active{
    background:#2563eb;
    color:#fff;
  }

  /* 카드 리스트 */
  .cards{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
    gap:20px;
  }

  .card{
    background:#fff;
    border-radius:18px;
    padding:20px;
    border:1px solid #e5eaf1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    transition:.2s;
    cursor: pointer;

    .card-top{
      display: flex;
      padding-bottom: 16px;
      .category{ margin-left: 2px; }

      .bookmark{ margin-left: auto; }
    }
  }

  .card:hover{
    box-shadow:0 10px 30px rgba(0,0,0,0.08);
  }

  .status{
    display:inline-block;
    font-size:12px;
    padding:4px 10px;
    border-radius:20px;
    background:#ecfdf5;
    color:#059669;
    font-weight:600;
  }

  .bookmark{
    background:none;
    border:none;
    cursor:pointer;
    color:#94a3b8;
  }

  .bookmark.active{
    color: var(--blue-primary);
  }

  .card-title{
    font-size:17px;
    font-weight:700;
    margin-bottom: 6px;
  }

  .desc{
    font-size:14px;
    color:#64748b;
    margin-bottom:16px;
  }

  .meta{
    display:flex;
    gap: 18px;
    font-size:12px;
    color:#94a3b8;
    border-top:1px solid #f1f5f9;
    padding-top:12px;

    div{ display: flex; align-items: center; gap:4px; }
  }

  .detail-btn{
    background:none;
    border:none;
    color: var(--blue-primary);
    font-weight:600;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:4px;
    margin-left: auto;
  }

/* 공통 뱃지 스타일 */
.tag-status, .tag-catList{
  font-size:12px;
  padding:4px 12px;
  border-radius:20px;
  font-weight:600;
  display:inline-block;
}

.tag-catList{
  background-color: #F1F5F9;
  color: #62748E;
  border: 1px solid #E7ECF1;
}

/* 접수중 */
.status-open{
  background: #ECFDF5;
  color: #009966;
}

/* 마감임박 */
.status-soon{
  background: #FFFBEB;
  color: #E17100;
}

/* 마감 */
.status-close{
  background: #F1F5F9;
  color: #62748E;
}

`;
