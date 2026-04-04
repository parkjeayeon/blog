# 📝 Ref's Blog

Obsidian + Quartz 4 기반 개인 기술 블로그. 
Obsidian에서 작성한 마크다운을 Quartz 4로 빌드하여 Cloudflare Pages에 자동 배포.

**배포 주소**: [viakiro.com](https://viakiro.com)

## claude code
해당 프로젝트는 claude code를 통한 prd 테스트을 위해 생성한 프로젝트입니다.<br/>
**개발기한**: 04.04~ 04.05

```
만들고자 하는 프로젝트 선택 (Obsidian Blog)
  ↓
agent 생성 ( Obsidian + git 전문가, 이를 통한 blog 프로젝트의 숙달자)
  ↓
생성한 agent한테 프로젝트 간단 설명 + 진행하는데 필요한 방법을 분석해달라 or 어떻게 접근해야하는지 분석해달라 
  ↓
답변 나오면 prd-generator agent한테 프로젝트 간단설명 + MVP PRD를 작성하는 메타 프롬프트를 생성해달라
파일생성위치: docs/PRD_PROMPT.md 
  ↓
답변복붙 or 위치
파일생성위치: docs/PRD.md
  ↓
답변복붙 or 위치 / 왜 이거 안쓰고 저거 썻냐? 
prd-vaidator agent에게 검증해달라

```


---

## 기술 스택

| 역할 | 기술 |
|------|------|
| 편집기 | Obsidian |
| 정적 사이트 생성기 | Quartz 4 |
| 호스팅 | Cloudflare Pages |
| CI/CD | GitHub Actions |
| 이미지 호스팅 | Cloudflare R2 |
| 댓글 | Giscus (GitHub Discussions) |

---

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:8080)
npx quartz build --serve

# 빌드만
npx quartz build
```

---

## 배포 흐름

```
Obsidian 글 작성 (draft: true)
  ↓
작성 완료 → draft: false
  ↓
Obsidian Git 자동 commit (30분 주기) → 수동 push
  ↓
GitHub Actions → Quartz 빌드 → Cloudflare Pages 배포
  ↓
viakiro.com 반영 (push 후 최대 10분)
```

---

## 디렉토리 구조

```
blog/
├── content/            # 게시 대상 마크다운 (Git 추적)
│   ├── index.md        # 블로그 메인 페이지
│   └── dev/            # 카테고리 폴더 (root에 직접 파일 저장 금지)
├── assets/             # 로컬 임시 이미지 (업로드 후 R2 URL로 교체됨)
├── templates/          # Templater 템플릿 (gitignore)
├── quartz/             # Quartz 4 소스 (커스텀 컴포넌트/스타일 포함)
├── quartz.config.ts    # 사이트 설정 (폰트, 색상, 플러그인)
├── quartz.layout.ts    # 레이아웃 설정 (사이드바, 컴포넌트 배치)
└── .github/workflows/  # GitHub Actions 배포 워크플로우
```

---

## 글 작성 워크플로우

**새 글 작성**:
1. `Cmd+P` → `Templater: Create new note from template` → `new-post.md` 선택
2. 파일명 입력 → 카테고리 폴더 지정
3. 글 작성 → 이미지 붙여넣기 후 `Cmd+Shift+U`로 R2 업로드
4. `draft: false`로 변경 → Obsidian Git push

**새 카테고리 폴더**:
1. 폴더 생성 → `index.md` 생성
2. `Templater: Open Insert Template Modal` → `folder-index.md` 선택

---

## Obsidian 플러그인

| 플러그인 | 용도 |
|----------|------|
| Obsidian Git | 자동 commit (30분) + 수동 push |
| Templater | 글/폴더 index 템플릿 |
| Image Upload Toolkit | 이미지 → Cloudflare R2 업로드 |
