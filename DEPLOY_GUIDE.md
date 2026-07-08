# 오늘이음 홈페이지 배포 가이드 (비용 0원)

GitHub Pages(무료)로 oneulieum.com에 사이트를 공개하고, 관리자 페이지에서 직접 게시글을 관리하는 방법입니다. 모든 단계는 한 번만 하면 됩니다.

## 1단계. GitHub 계정과 저장소 만들기

1. https://github.com 에서 회원가입 (무료)
2. 우측 상단 `+` → **New repository**
3. Repository name: `website` (원하는 이름 가능) / **Public** 선택 → **Create repository**

## 2단계. 사이트 파일 올리기

1. 방금 만든 저장소 화면에서 **uploading an existing file** 링크 클릭
2. `ieum-website` 폴더 안의 **모든 파일과 posts 폴더**를 드래그해서 업로드
   - 주의: `ieum-website` 폴더 자체가 아니라 그 **안의 내용물**을 올려야 합니다. `index.html`이 저장소 최상단에 보여야 정상입니다.
   - posts 폴더가 통째로 안 올라가면, 저장소에서 `Add file → Create new file` → 파일명에 `posts/posts.js` 입력 후 내용 붙여넣기
3. 하단 **Commit changes** 클릭

## 3단계. GitHub Pages 켜기

1. 저장소 → **Settings** → 왼쪽 메뉴 **Pages**
2. Source: **Deploy from a branch**, Branch: `main` / `/ (root)` → **Save**
3. 1~2분 후 `https://아이디.github.io/website/` 주소로 사이트가 열립니다

## 4단계. oneulieum.com 도메인 연결

1. 같은 Pages 설정 화면의 **Custom domain**에 `oneulieum.com` 입력 → Save
   (저장소에 이미 CNAME 파일이 포함되어 있어 자동 인식될 수 있습니다)
2. 도메인을 구입한 업체(가비아, 후이즈 등)의 DNS 관리에서 레코드 추가:

   | 구분 | 호스트 | 값 |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | 아이디.github.io |

   ※ IP 주소는 GitHub 공식 문서(docs.github.com → "GitHub Pages custom domain")에서 최신 값을 한 번 확인하세요.
3. DNS 반영(수 분~수 시간) 후 Pages 설정에서 **Enforce HTTPS** 체크

## 5단계. 관리자 페이지 연결 (게시글 작성용)

1. GitHub 우측 상단 프로필 → **Settings** → 맨 아래 **Developer settings**
2. **Personal access tokens → Fine-grained tokens → Generate new token**
   - Repository access: **Only select repositories** → `website` 선택
   - Permissions → Repository permissions → **Contents: Read and write**
   - 만료 기간은 최대(1년)로 설정 (만료되면 같은 방법으로 재발급)
3. 생성된 토큰(`github_pat_...`)을 복사
4. `oneulieum.com/admin.html` 접속 → 사용자명, 저장소명, 브랜치(main), 토큰 입력 → **연결하기**
5. 이후 이 브라우저에서는 바로 글쓰기 화면이 열립니다

## 게시글 관리 방법

- `oneulieum.com/admin.html` → **+ 새 글 쓰기** → 제목/카테고리/요약/본문 입력 → **저장**
- 저장하면 1~2분 내 사이트에 자동 반영됩니다 (블로그 목록·메인 최신글 모두 자동 갱신)
- 본문은 마크다운: `## 소제목`, `**굵게**`, `> 인용문`, `- 목록`

## 주의사항

- **토큰은 비밀번호와 같습니다.** 다른 사람과 공유하지 말고, 공용 PC에서는 관리자 페이지의 "설정 초기화"로 지우세요.
- admin.html 주소는 공개되어 있지만 토큰 없이는 아무것도 수정할 수 없습니다.
- 게시글 데이터는 `posts/posts.js` 한 파일에 저장됩니다. 컴퓨터에서 index.html을 직접 열어도 모든 페이지·게시글이 작동합니다.

## 문의 폼 업그레이드 (선택)

현재 문의하기는 방문자의 메일 프로그램을 여는 방식입니다. 방문자가 폼에서 바로 전송하게 하려면 Formspree(월 50건 무료) 가입 후 폼 주소만 바꾸면 됩니다. 이 작업은 Claude에게 "contact.html을 Formspree로 연결해줘"라고 요청하면 됩니다.
