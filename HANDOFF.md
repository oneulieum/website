# 오늘이음 홈페이지 — 작업 기록 및 인수인계 문서

> 이 문서는 향후 Claude(또는 다른 개발자)가 이 프로젝트를 이어받아 수정할 때 참고하는 문서입니다.
> 수정 요청 시 이 파일을 함께 첨부하면 맥락 설명 없이 바로 작업할 수 있습니다.

## 1. 프로젝트 개요

- **회사**: 오늘이음 주식회사 (영문명 **ONEULIEUM Inc.** — 사이트 전체에서 이 표기 사용)
- **브랜드 자산 (사용자 확정, 2026-07-07)**:
  - 미션: 더 나은 내일을 만드는 혁신의 동반자
  - 비전: Trusted Partner for Sustainable Growth (지속가능한 성장을 위한 신뢰받는 파트너)
  - 핵심가치: Reliability(신뢰성), Innovation(혁신), Sustainability(지속가능성), Expertise(전문성), Execution(실행력) → about.html에서 "RISE" 5카드로 표현
  - 슬로건: Together, we RISE towards sustainable growth. (메인 CTA 하단, about 핵심가치, 회사 개요 표에 사용)
  - 메인 히어로 카피: "공공시장의 **오늘**과 **내일**을 데이터로 **잇습니다**" (오늘/내일/잇습니다 오렌지 강조 — 사용자 지정)
- **사업영역(What we do) 4개 고정**: ①데이터 기반 컨설팅 ②연구·정책 용역 ③강의·역량교육 ④사업모델·판로 코칭
- **실적 표기 원칙**: 개별 강의·컨설팅은 건별 나열하지 않고 숫자/연도별 요약으로만(사용자 지정). 연구·용역 계약은 clients.html에 전체 22건, "시작일 – 용역명 – 발주처" 형식·시작일 내림차순
- **업종**: 공공시장(공공구매·공공조달) 데이터 기반 컨설팅·연구용역·강의 전문기업
- **용어 원칙 (2026-07-08 사용자 지정)**: 일반 서술에서는 "사회적경제" 대신 **"사회연대경제"** 사용. 단, 발주처·기관의 공식 명칭(예: 춘천시사회적경제지원센터, 한국사회적기업진흥원)과 실제 용역명은 원문 그대로 유지
- **도메인**: oneulieum.com (보유), ieum.kr (이메일 admin@ieum.kr 사용)
- **호스팅**: GitHub Pages (무료) + 커스텀 도메인. 배포 절차는 `DEPLOY_GUIDE.md` 참고
- **요구사항**: 비용 0원 유지, 사장님이 직접 관리자 페이지에서 게시글 작성·수정
- **작업일**: 2026-07-07, Claude(Cowork)로 제작

## 2. 파일 구조

```
ieum-website/
├── index.html        메인 (히어로, 숫자 스탯, 사업영역, 대표실적, 거래처, 최신글 3건-동적, CTA)
├── about.html        회사소개 (미션·비전, 대표 인사말, 회사 개요 표, 일하는 방식 4단계, 핵심역량)
├── history.html      연혁 (연도별 활동량 바 차트-동적, 2022~2026 타임라인)
├── clients.html      거래처 (스탯, 유형별 기관 칩 4그룹, 대표 용역 실적 표 12건)
├── blog.html         인사이트 목록 (posts.json에서 동적 렌더링, 카테고리 필터)
├── post.html         게시글 상세 (?id=글ID 로 접근, 마크다운 렌더링)
├── contact.html      사업 문의 (폼 → mailto 방식, Formspree로 업그레이드 가능)
├── admin.html        ★ 관리자 페이지 (게시글 CRUD, GitHub Contents API 사용)
├── style.css         공용 스타일 (디자인 토큰은 :root CSS 변수)
├── common.js         공용 스크립트 (모바일 메뉴, 스크롤 리빌, 숫자 카운트업)
├── posts/posts.js  ★ 게시글 데이터 (글 6편 포함, 관리자 페이지가 이 파일을 수정)
├── CNAME             GitHub Pages 커스텀 도메인 (oneulieum.com)
├── DEPLOY_GUIDE.md   배포 가이드 (사용자용)
└── HANDOFF.md        이 문서
```

## 3. 디자인 시스템 (v2, 2026-07-07 전면 개편)

- **컨셉**: 하이브리드 — 다크 네이비 임팩트 히어로(BCG식 데이터 비주얼) + 에디토리얼 화이트 본문(McKinsey식). 에르메스 오렌지는 포인트로만(5~10%)
- **레퍼런스 근거**: McKinsey(화이트·저널형·인사이트 전면), BCG(데이터 시각화 중심), 2026 트렌드(초대형 타이포, 스크롤 모션, 마이크로 인터랙션)
- **컬러 토큰** (style.css `:root`):
  - `--navy: #081F38` / `--navy-2: #0A2540` / `--blue: #1B5FAA` / `--blue-light: #EAF1F9`
  - `--orange: #F37021` (버튼, 강조, 언더라인, 타임라인 도트) / `--orange-dark: #D95E12`
  - `--ink: #16212E` / `--gray: #5B6B7F` / `--line: #E4EAF1` / `--paper-soft: #F7FAFC`
- **서체**: 헤드라인 = Noto Serif KR 900 (`--serif`, Google Fonts) / 본문 = Pretendard (`--sans`). h1·h2·카드 제목이 세리프
- **핵심 컴포넌트**:
  - `.nav`: 투명 시작 → 스크롤 40px 이후 `.scrolled`(화이트 블러) 전환 (common.js)
  - `.hero`: 92vh, 그리드 모티프(`.grid-motif`) + 글로우, 좌측 초대형 세리프 카피(스태거 등장 `.rise .d1~d4`), 우측 연도별 실적 SVG 차트(바 성장 + 라인 드로잉 애니메이션), 스크롤 큐
  - `.stats`: 풀블리드 네이비 밴드, 세로 구분선, 카운트업
  - `.marquee-band`: 파트너 기관명 무한 롤링(hover 시 정지), 트랙 2개 복제 구조
  - `.svc-card`: 번호(01~03) + 세리프 제목 + 호버 시 상단 오렌지 바
  - `.case-row`: 에디토리얼 실적 리스트(인덱스 번호, 호버 시 들여쓰기+오렌지)
  - `.cta-section`: 풀블리드 네이비 CTA (구 `.cta` 오렌지 박스도 CSS에 유지 — 서브페이지에서 사용 중)
- **모션**: `.reveal` = IntersectionObserver 페이드업 + 형제 자동 스태거(`--stagger`, common.js) / `[data-count]` 카운트업 / `prefers-reduced-motion` 대응 포함
- **네비/푸터**: 전 페이지 동일 마크업 복붙 구조. 페이지 추가 시 기존 페이지에서 복사하고 `active` 클래스만 이동, head에 Noto Serif KR 링크 포함할 것

## 4. 블로그 시스템 작동 방식 (중요)

- 게시글 원본은 **`posts/posts.js` 단일 파일**. 정적 HTML 게시글 파일은 없음 (이전 버전의 post-1~6.html은 삭제되고 JSON으로 이관됨)
- 글 스키마:
  ```json
  {
    "id": "YYYY-MM-DD-slug (또는 date-timestamp, 고유값)",
    "title": "제목",
    "category": "trend | se | edu",   // 공공구매 동향 | 사회적경제 | 교육·행사
    "date": "YYYY-MM-DD",
    "emoji": "썸네일 이모지",
    "theme": "blue | alt | navy",     // 썸네일 배경 (alt=오렌지톤)
    "summary": "목록 카드용 요약",
    "body": "마크다운 본문 (## 소제목, > 인용문 지원)"
  }
  ```
- 렌더링: blog.html(전체 목록+필터), index.html(최신 3건), post.html(상세, marked.js로 마크다운 파싱)
- 카테고리 추가 시 수정할 곳: blog.html 필터 버튼 + 각 파일의 `CAT_LABEL`/`CAT` 매핑 + admin.html의 select 옵션
- **데이터 로딩 방식**: `posts/posts.js`가 `window.POSTS_DATA` 전역 변수로 데이터를 제공하고 각 페이지가 `<script src>`로 로드 (fetch 아님 → file://로 직접 열어도 작동). 관리자 저장 시 `window.POSTS_DATA = {...};` 래퍼를 유지해야 함

## 5. 관리자 페이지(admin.html) 작동 방식

- 서버 없음. 브라우저에서 GitHub Contents API를 직접 호출해 `posts/posts.js`을 커밋하는 구조
- 인증: Fine-grained PAT (해당 저장소 Contents: Read/Write만) → `localStorage`(`ieum_admin_cfg`)에 저장
- 저장 흐름: `loadPosts()`로 최신 sha 확보 → posts 배열 수정 → `PUT /repos/{owner}/{repo}/contents/posts/posts.js` (base64는 UTF-8 안전 인코딩 함수 `b64enc/b64dec` 사용)
- 저장 시 GitHub Pages가 자동 재배포 (1~2분 소요)
- 페이지 문구(히어로 카피 등) 수정은 관리자 페이지 범위 밖 → HTML 직접 수정 또는 Claude에 요청

## 6. 데이터 출처

- 실적 수치는 사용자 제공 엑셀 `03. 컨설팅+강의+용역_수행내역자료.xlsx` 기준 (2026-07-07):
  - 강의·컨설팅 255회 (2022: 2 / 2023: 7 / 2024: 75 / 2025: 113 / 2026: 58 진행 중), 컨설팅 147·강의 77
  - 연구·용역 계약 22건, 협력 기관 약 60곳
  - 주요 발주처: 한국사회적기업진흥원(2), 춘천시사경센터(4, 2023~2026 연속), 경기연구원, 관악·용산·안성 사경센터, 전주·은평·공주·광명·관악 지자체 등
- 실적 갱신 시 수정할 곳: index.html·clients.html의 `data-count` 값, history.html 타임라인·바 차트(`data-h`는 최대값 대비 %)

## 7. 미완성/추후 과제

- [x] 대표 성함: 이규호 (about.html 대표 인사말에 반영, 2026-07-08)
- [ ] 로고 이미지 (현재 텍스트 로고 + SVG 파비콘)
- [x] 문의 폼: 사이트 자체 디자인 폼 → 구글폼 formResponse로 직접 POST (숨김 iframe 방식, 2026-07-07 연동 완료).
  - 구글폼: "오늘이음 사업 문의" (1FAIpQLScwgnDNVDiq4Nei_pgMjXkfMbIG9B3jcyZD1jSeRqoYajHyYw)
  - 필드 매핑: 성함 entry.370228893 / 소속 기관 entry.33721403 / 이메일 entry.367852832 / 문의 유형 entry.386159031 (객관식: 컨설팅·연구ㆍ용역·강의ㆍ교육, 기타는 __other_option__) / 문의 내용 entry.481117570
  - 주의: 구글폼에서 질문을 추가·삭제·수정하면 entry ID가 바뀔 수 있으므로 contact.html 매핑도 함께 갱신해야 함 (추출 방법: viewform 페이지 콘솔에서 FB_PUBLIC_LOAD_DATA_[1][1] 확인)
- [ ] 게시글 이미지 업로드 (현재 이모지 썸네일만. 필요 시 admin.html에 GitHub API 이미지 업로드 기능 추가 가능)
- [ ] SEO: sitemap.xml, og:image, 각 페이지 meta description 보강
- [ ] ieum.kr 도메인 → oneulieum.com 리다이렉트 여부 결정

## 8. 수정 요청 예시 (사용자용)

Claude에게 이 폴더를 열어주고 이렇게 요청하면 됩니다:
- "HANDOFF.md 읽고, 메인 히어로 문구를 ~로 바꿔줘"
- "연혁에 2027년 실적 추가해줘"
- "거래처에 ○○시청 추가해줘"
- "contact.html을 Formspree로 연결해줘"
- 수정 후에는 바뀐 파일을 GitHub 저장소에 다시 업로드(덮어쓰기)하면 반영됩니다
