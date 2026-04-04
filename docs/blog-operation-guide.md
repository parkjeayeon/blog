# Obsidian + Quartz 4 블로그 운영 가이드라인

## 1. 권장 폴더 구조

```
content/
├── index.md                     # 랜딩 페이지
├── about.md                     # 자기소개
├── dev/                         # 개발 기록
│   ├── projects/                # 프로젝트 경험
│   │   └── project-name.md
│   └── til/                     # Today I Learned
│       └── 2026-04-05-topic.md
├── study/                       # 학습 정리
│   ├── backend/
│   ├── frontend/
│   ├── devops/
│   └── cs/
└── blog/                        # 에세이, 회고, 생각 정리
    └── 2026-04-monthly-retrospective.md
```

**설계 원칙:**
- `content/` root에 파일을 직접 저장하지 않는다. 반드시 카테고리 폴더 안에 저장.
- 폴더명은 **영문 소문자 + 하이픈**으로 통일 (URL 친화적)
- 이미지는 `assets/` 폴더에 임시 저장 후 R2에 업로드

---

## 2. Frontmatter 권장 템플릿

### 2.1 기본 템플릿

Quartz는 frontmatter에서 다음 필드를 인식한다.

```yaml
---
title: "포스트 제목"
date: 2026-04-05
tags:
  - backend
  - kotlin
description: "검색 결과 및 OG 카드에 표시될 1~2줄 설명"
draft: true
---
```

### 2.2 필드별 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `title` | 권장 | 미지정 시 파일명이 제목이 됨. 파일명에 특수문자가 있으면 반드시 지정 |
| `date` | 권장 | `YYYY-MM-DD` 형식. Quartz가 생성일로 사용 (`defaultDateType: "created"` 설정) |
| `tags` | 권장 | YAML 배열 형식. Quartz 태그 페이지에 자동 반영 |
| `description` | 선택 | 미지정 시 본문 앞부분을 자동 추출 |
| `draft` | 선택 | `true`로 설정하면 빌드에서 제외 (`RemoveDrafts` 플러그인) |
| `aliases` | 선택 | 다른 이름으로도 검색/링크 가능하게 함 |

### 2.3 Templater 템플릿

`templates/new-post.md`:

```markdown
---
title: <% tp.file.title %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  -
description:
draft: true
---
```

`templates/folder-index.md`:

```markdown
---
title: <% tp.file.folder(true).split('/').pop() %>
---
```

**사용 방법:**

새 글:
1. `Cmd+P` → `Templater: Create new note from template` → `new-post.md`
2. 파일명 입력 → 카테고리 폴더로 이동 후 작성
3. 완성 후 `draft: false` 변경

새 카테고리 폴더 index:
1. 폴더 생성 → `index.md` 파일 생성
2. `Cmd+P` → `Templater: Open Insert Template Modal` → `folder-index.md`

---

## 3. 태그 전략

### 3.1 태그 네이밍 규칙

- **영문 소문자**로 통일
- **하이픈(`-`)**으로 단어 구분 (예: `react-query`, `clean-architecture`)
- 너무 일반적인 태그 지양 (예: `dev`, `code`)

### 3.2 권장 태그 분류

| 카테고리 | 태그 예시 | 용도 |
|----------|-----------|------|
| 언어/프레임워크 | `kotlin`, `nextjs`, `spring`, `react` | 기술 스택 분류 |
| 도메인 | `backend`, `frontend`, `devops`, `database` | 영역 분류 |
| 콘텐츠 유형 | `project`, `til`, `retrospective`, `tutorial` | 글 성격 분류 |

### 3.3 태그 관리 원칙

- 태그 총 개수는 **20~30개 이내**로 유지
- 새 태그 추가 전 기존 태그로 대체 가능한지 검토
- 폴더가 분류를 담당하고, 태그는 **횡단 검색**용으로 사용
  - 예: `study/backend/ktor.md`에 `#kotlin` `#backend` 태그
  - 예: `dev/projects/metrics-server.md`에 `#kotlin` `#project` 태그
  - `#kotlin`으로 검색하면 폴더를 관통하여 관련 글 모두 조회

---

## 4. 마크다운 작성 시 주의사항

### 4.1 Quartz가 지원하는 Obsidian 문법

현재 설정에서 `ObsidianFlavoredMarkdown` 플러그인이 활성화되어 있으므로 다음 문법이 모두 작동한다.

| 문법 | 예시 | 지원 여부 |
|------|------|-----------|
| Wikilink | `[[다른 노트]]` | O |
| 임베드 | `![[이미지.png]]` | O |
| Callout | `> [!note]` | O |
| 하이라이트 | `==강조==` | O |
| 수식 | `$E=mc^2$` | O (KaTeX) |
| 머메이드 | ` ```mermaid ` | O |
| 태그 링크 | `#태그` | O |

### 4.2 링크 방식

`CrawlLinks`가 `markdownLinkResolution: "shortest"`로 설정되어 있으므로:

```markdown
# 권장: Wikilink (Obsidian 네이티브, 가장 간결)
[[포스트 제목]]
[[포스트 제목|표시 텍스트]]

# 헤딩 링크
[[포스트 제목#특정 섹션]]
```

- `shortest` 설정 덕분에 파일명만으로 링크 가능 (전체 경로 불필요)
- 동명의 파일이 있으면 전체 경로를 명시해야 함

### 4.3 이미지 관리

이미지는 **Cloudflare R2**에 호스팅한다. 로컬 파일은 임시 저장 후 업로드.

```
이미지 붙여넣기/드래그 → assets/ 폴더에 임시 저장
    ↓
Cmd+Shift+U (Image Upload Toolkit) → R2 업로드
    ↓
마크다운 링크가 R2 URL로 자동 교체
```

- Obsidian 설정: **Files & Links** → **Default location for new attachments** → `assets`
- 파일명은 **영문, 하이픈, 소문자** 사용 (URL 인코딩 문제 방지)

### 4.4 헤딩 규칙

```markdown
# H1은 제목 (frontmatter title과 동일하게, 또는 생략)

## H2부터 본문 시작

### H3 소제목
```

- H1은 문서당 **1개만** 사용 (Quartz가 `ArticleTitle` 컴포넌트로 별도 렌더링)
- frontmatter에 `title`을 지정했으면 본문에서 H1 생략 가능
- Table of Contents는 H2~H4를 기준으로 생성됨

### 4.5 피해야 할 패턴

| 패턴 | 문제 | 대안 |
|------|------|------|
| 파일명에 특수문자 (`!`, `?`, `#`) | URL 인코딩 깨짐 | 영문+하이픈 사용 |
| 한글 파일명 | URL이 길어지고 공유 시 불편 | 영문 slug 사용, title에 한글 |
| HTML 태그 직접 사용 | Quartz 렌더링 불안정 | 마크다운/callout 활용 |

---

## 5. Git 커밋 전략

### 5.1 배포 흐름

```
Obsidian에서 글 작성 (draft: true)
    ↓
작성 완료 → draft: false 변경
    ↓
Obsidian Git 자동 commit (30분 주기)
    ↓
수동 push (Cmd+P → "Obsidian Git: Push")
    ↓
GitHub Actions → Quartz 빌드 → Cloudflare Pages 배포
    ↓
viakiro.com 반영 (push 후 최대 10분)
```

### 5.2 Obsidian Git 설정

| 설정 | 값 | 이유 |
|------|-----|------|
| Auto commit interval | 30분 | 작성 중 자동 백업 |
| Auto push interval | 비활성화 | Cloudflare Pages 무료 빌드 500회 보호 |
| Commit message | `auto: {{date}}` | 자동 commit 메시지 |

### 5.3 수동 커밋 메시지 컨벤션

| 상황 | 메시지 예시 |
|------|-------------|
| 새 글 작성 완료 | `feat: Ktor 프레임워크 학습 정리 추가` |
| 기존 글 수정 | `fix: Ktor 포스트 코드 예시 보완` |
| 설정 변경 | `chore: 다크모드 색상 테마 조정` |
| 폴더 구조 변경 | `refactor: study 폴더 하위 카테고리 재구성` |

### 5.4 Draft 관리

배포하고 싶지 않은 글은 frontmatter `draft` 필드 사용:

```yaml
---
title: "작성 중인 글"
draft: true
---
```

- `RemoveDrafts` 플러그인이 빌드 시 자동 제외
- Git에는 추적되지만 사이트에는 나타나지 않음
- 자동 push를 허용해도 draft 글은 배포되지 않음

---

## 6. content/ 폴더 파일 관리

### 6.1 파일 네이밍 컨벤션

```
# 일반 포스트
understanding-kotlin-coroutines.md      # 영문 kebab-case

# TIL (날짜 접두사)
2026-04-05-docker-network-debugging.md

# 프로젝트 기록
metrics-handling-server.md
```

- **파일명 = URL slug**가 되므로 신중하게 결정
- 한번 배포된 파일명은 변경 자제 (외부 링크 깨짐 방지)
- 변경이 필요하면 frontmatter `aliases`로 리다이렉트 설정

### 6.2 index.md 활용

각 폴더에 `index.md`를 두면 해당 폴더의 랜딩 페이지가 된다.

```markdown
---
title: "Study Notes"
---

학습 정리 노트 모음입니다.
```

- 미작성 시 Quartz가 자동으로 파일 목록 페이지를 생성
- Templater의 `folder-index.md` 템플릿으로 빠르게 생성 가능

### 6.3 배포 전 체크리스트

- [ ] frontmatter에 `title`, `date`, `tags` 작성 완료
- [ ] `draft: true`가 남아있지 않은지 확인
- [ ] 이미지 R2 업로드 완료 (로컬 경로 없는지 확인)
- [ ] 내부 링크(`[[]]`)가 유효한지 확인
- [ ] 파일명에 특수문자나 공백이 없는지 확인

---

## 7. 현재 프로젝트 설정 참고

### 7.1 빌드 트리거 조건 (GitHub Actions)

`main` 브랜치에 다음 경로가 변경되면 자동 배포:
- `content/**` — 콘텐츠 변경
- `quartz/**` — Quartz 소스 변경
- `quartz.config.ts`, `quartz.layout.ts` — 설정 변경
- `package.json` — 의존성 변경

### 7.2 빌드 제외 패턴 (`ignorePatterns`)

```typescript
ignorePatterns: ["private", "templates", ".obsidian", "drafts", "docs"]
```

이 폴더들은 `content/` 안에 있어도 빌드에서 제외된다.

### 7.3 날짜 우선순위

```typescript
CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] })
```

1. frontmatter의 `date` 필드
2. Git 커밋 이력의 최초 추가 시점
3. 파일 시스템 생성일

frontmatter에 `date`를 명시하면 가장 정확한 날짜가 표시된다.
