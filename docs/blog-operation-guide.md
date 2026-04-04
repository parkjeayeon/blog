# Obsidian + Quartz 4 블로그 운영 가이드라인

## 1. 참고 블로그 분석 요약 (Billy's Blog)

### 1.1 폴더 구조

Billy's Blog는 크게 3가지 최상위 카테고리로 구성되어 있다.

```
content/
├── Billy's develop records/     # 실무 경험 기록
│   ├── personal-work/           # 개인 프로젝트
│   │   └── metrics/
│   └── project/                 # 회사/외부 프로젝트
│       ├── Apple Care Service (Coupang)
│       ├── HiteJinro AI platform project
│       └── SKT Adot Project
├── Introduce/                   # 자기소개
├── Study/                       # 학습 기록
│   ├── 0. Backend/
│   │   └── Ktor
│   ├── 1. Frontend/
│   │   ├── Event Processing/
│   │   ├── vue.js/
│   │   ├── Next.js/
│   │   └── Nuxt.js/
│   └── 2. DevOps/
│       ├── Kubernetes/
│       └── Real-Time Communication Methods/
└── index.md
```

**핵심 특징:**
- 폴더명에 번호 접두사 사용 (`0. Backend`, `1. Frontend`) -- Explorer에서 정렬 제어
- 실무 경험과 학습 기록을 명확히 분리
- 프로젝트별 독립 폴더로 관리

### 1.2 태그 전략

총 4개의 태그만 사용: `Frontend`, `infra`, `personal`, `project`

- 태그 수를 최소화하여 관리 부담 감소
- 기술 영역(Frontend, infra) + 콘텐츠 성격(personal, project)으로 이원화
- 폴더 구조가 이미 충분한 분류 역할을 수행하므로 태그는 보조적 역할

### 1.3 포스트 작성 패턴

- frontmatter를 거의 사용하지 않음 (제목은 H1으로 직접 작성)
- 이모지를 헤딩에 활용하여 시각적 구분
- 이미지는 외부 호스팅(imgur) 사용
- 내부 링크는 표준 마크다운 상대경로 방식
- Obsidian callout 미사용

---

## 2. 권장 폴더 구조

현재 프로젝트(`viakiro.com`)에 맞는 폴더 구조를 제안한다. Billy's Blog의 장점을 수용하되, Quartz의 기능을 더 적극 활용하는 방향이다.

```
content/
├── index.md                     # 랜딩 페이지
├── about.md                     # 자기소개
├── dev/                         # 개발 기록
│   ├── projects/                # 프로젝트 경험
│   │   └── project-name.md
│   └── til/                     # Today I Learned (짧은 메모)
│       └── 2026-04-05-topic.md
├── study/                       # 학습 정리
│   ├── backend/
│   ├── frontend/
│   ├── devops/
│   └── cs/
├── blog/                        # 에세이, 회고, 생각 정리
│   └── 2026-04-monthly-retrospective.md
└── attachments/                 # 이미지, 파일 첨부
    └── 2026/
        └── image-name.png
```

**설계 원칙:**
- 폴더명은 **영문 소문자 + 하이픈**으로 통일 (URL 친화적)
- `attachments/`를 별도 관리하여 이미지 경로 일관성 확보
- `drafts/` 폴더는 `ignorePatterns`에 이미 포함되어 있으므로 별도 생성 가능 (Git에서 제외됨)

---

## 3. Frontmatter 권장 템플릿

### 3.1 기본 템플릿

Quartz는 frontmatter에서 다음 필드를 인식한다.

```yaml
---
title: "포스트 제목"
date: 2026-04-05
tags:
  - backend
  - kotlin
description: "검색 결과 및 OG 카드에 표시될 1~2줄 설명"
---
```

### 3.2 필드별 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `title` | 권장 | 미지정 시 파일명이 제목이 됨. 파일명에 특수문자가 있으면 반드시 지정 |
| `date` | 권장 | `YYYY-MM-DD` 형식. Quartz가 생성일로 사용 (`defaultDateType: "created"` 설정) |
| `tags` | 권장 | YAML 배열 형식. Quartz 태그 페이지에 자동 반영 |
| `description` | 선택 | 미지정 시 본문 앞부분을 자동 추출 |
| `draft` | 선택 | `true`로 설정하면 빌드에서 제외 (`RemoveDrafts` 플러그인) |
| `aliases` | 선택 | 다른 이름으로도 검색/링크 가능하게 함 |

### 3.3 Obsidian Templater용 템플릿

Templater 플러그인 사용 시 아래 템플릿을 `templates/` 폴더에 저장한다.

```markdown
---
title: "<% tp.file.title %>"
date: <% tp.date.now("YYYY-MM-DD") %>
tags:
  -
description: ""
---

# <% tp.file.title %>

## 개요



## 본문


```

---

## 4. 태그 전략

### 4.1 태그 네이밍 규칙

- **영문 소문자**로 통일
- **하이픈(`-`)**으로 단어 구분 (예: `react-query`, `clean-architecture`)
- 너무 일반적인 태그 지양 (예: `dev`, `code`)

### 4.2 권장 태그 분류

| 카테고리 | 태그 예시 | 용도 |
|----------|-----------|------|
| 언어/프레임워크 | `kotlin`, `nextjs`, `spring`, `react` | 기술 스택 분류 |
| 도메인 | `backend`, `frontend`, `devops`, `database` | 영역 분류 |
| 콘텐츠 유형 | `project`, `til`, `retrospective`, `tutorial` | 글 성격 분류 |
| 깊이 | `beginner`, `deep-dive` | 난이도 (선택적) |

### 4.3 태그 관리 원칙

- 태그 총 개수는 **20~30개 이내**로 유지
- 새 태그 추가 전 기존 태그로 대체 가능한지 검토
- 폴더가 분류를 담당하고, 태그는 **횡단 검색**용으로 사용
  - 예: `study/backend/ktor.md`에 `#kotlin` `#backend` 태그
  - 예: `dev/projects/metrics-server.md`에 `#kotlin` `#project` 태그
  - `#kotlin`으로 검색하면 폴더를 관통하여 관련 글 모두 조회

---

## 5. 마크다운 작성 시 주의사항

### 5.1 Quartz가 지원하는 Obsidian 문법

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

### 5.2 링크 방식 선택

`CrawlLinks`가 `markdownLinkResolution: "shortest"`로 설정되어 있으므로:

```markdown
# 권장: Wikilink (Obsidian 네이티브, 가장 간결)
[[포스트 제목]]
[[포스트 제목|표시 텍스트]]

# 이미지 임베드
![[image-name.png]]

# 헤딩 링크
[[포스트 제목#특정 섹션]]
```

- Quartz가 wikilink를 자동으로 해석하므로 **wikilink 사용을 권장**
- `shortest` 설정 덕분에 파일명만으로 링크 가능 (전체 경로 불필요)
- 단, **동명의 파일이 있으면** 전체 경로를 명시해야 함

### 5.3 이미지 관리

```markdown
# Obsidian 임베드 (권장)
![[my-screenshot.png]]

# 크기 조절
![[my-screenshot.png|600]]
```

- 이미지는 `content/attachments/` 폴더에 저장
- Obsidian 설정에서 첨부파일 기본 경로를 `attachments/`로 지정
  - Obsidian > 설정 > 파일 및 링크 > 새 첨부파일의 기본 위치 > "지정된 폴더" > `attachments`
- 파일명은 **영문, 하이픈, 소문자** 사용 (URL 인코딩 문제 방지)

### 5.4 헤딩 규칙

```markdown
# H1은 제목 (frontmatter title과 동일하게, 또는 생략)

## H2부터 본문 시작

### H3 소제목
```

- H1은 문서당 **1개만** 사용 (Quartz가 `ArticleTitle` 컴포넌트로 별도 렌더링)
- frontmatter에 `title`을 지정했으면 본문에서 H1 생략 가능
- Table of Contents는 H2~H4를 기준으로 생성됨

### 5.5 피해야 할 패턴

| 패턴 | 문제 | 대안 |
|------|------|------|
| 파일명에 특수문자 (`!`, `?`, `#`) | URL 인코딩 깨짐 | 영문+하이픈 사용 |
| 한글 파일명 | URL이 길어지고 공유 시 불편 | 영문 slug 사용, title에 한글 |
| `content/` 외부 이미지 참조 | 빌드 시 누락 | `attachments/`에 복사 |
| HTML 태그 직접 사용 | Quartz 렌더링 불안정 | 마크다운/callout 활용 |

---

## 6. Git 커밋 전략

### 6.1 커밋 단위

| 상황 | 커밋 시점 | 메시지 예시 |
|------|-----------|-------------|
| 새 글 작성 완료 | 초안 완성 후 | `docs: Ktor 프레임워크 학습 정리 추가` |
| 기존 글 수정 | 의미 있는 수정 후 | `docs: Ktor 포스트 코드 예시 보완` |
| 이미지 추가 | 이미지 파일 추가 시 | `docs: Ktor 포스트 다이어그램 이미지 추가` |
| 설정 변경 | Quartz 설정 수정 시 | `chore: 다크모드 색상 테마 조정` |
| 폴더 구조 변경 | 리팩토링 시 | `refactor: study 폴더 하위 카테고리 재구성` |

### 6.2 Obsidian Git 플러그인 권장 설정

```
Auto commit interval: 0        # 자동 커밋 비활성화 (수동 커밋 권장)
Auto push interval: 0          # 자동 푸시 비활성화
Auto pull interval: 10         # 10분마다 자동 풀 (다른 기기 동기화 시)
Commit message: docs: {{date}} 자동 백업
```

**수동 커밋을 권장하는 이유:**
- 자동 커밋은 의미 없는 중간 상태가 히스토리에 쌓임
- `content/` 변경이 main 브랜치에 푸시되면 **즉시 배포가 트리거**됨
- 작성 중인 글이 반쯤 완성된 상태로 배포되는 것을 방지

### 6.3 배포 흐름

```
Obsidian에서 글 작성
    ↓
Obsidian Git으로 커밋 (Cmd/Ctrl + P → "Commit all changes")
    ↓
Push to main (Cmd/Ctrl + P → "Push")
    ↓
GitHub Actions 트리거 (content/**, quartz/** 변경 감지)
    ↓
Quartz 빌드 → Cloudflare Pages 배포
```

### 6.4 Draft 관리 방법

배포하고 싶지 않은 글은 두 가지 방법 중 선택:

**방법 1: frontmatter `draft` 필드 (권장)**
```yaml
---
title: "작성 중인 글"
draft: true
---
```
- `RemoveDrafts` 플러그인이 빌드 시 자동 제외
- Git에는 추적되지만 사이트에는 나타나지 않음
- 완성 후 `draft: true`를 삭제하고 다시 푸시

**방법 2: `drafts/` 폴더**
```
content/
├── drafts/          # ignorePatterns에 포함 → 빌드 제외
│   └── wip-post.md
└── ...
```
- `quartz.config.ts`의 `ignorePatterns`에 `"drafts"`가 이미 포함
- 완성 후 적절한 폴더로 이동

---

## 7. content/ 폴더 파일 관리

### 7.1 파일 네이밍 컨벤션

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

### 7.2 index.md 활용

각 폴더에 `index.md`를 두면 해당 폴더의 랜딩 페이지가 된다.

```markdown
---
title: "Study Notes"
---

학습 정리 노트 모음입니다.
```

- 미작성 시 Quartz가 자동으로 파일 목록 페이지를 생성
- 폴더 소개, 읽는 순서 안내 등을 작성하면 유용

### 7.3 Obsidian 설정 권장사항

Obsidian vault 설정에서 다음을 조정한다 (설정 > 파일 및 링크):

| 설정 | 권장값 | 이유 |
|------|--------|------|
| 새 첨부파일의 기본 위치 | `content/attachments` | 이미지 경로 일관성 |
| 새 링크의 기본 형식 | Wikilink | Quartz 호환 최적 |
| 위키링크 사용 | 활성화 | shortest path 해석 지원 |
| 삭제 시 .trash 폴더 사용 | 활성화 | Git에서 실수 방지 |

### 7.4 정리 체크리스트

새 글을 배포하기 전 확인할 사항:

- [ ] frontmatter에 `title`, `date`, `tags` 작성 완료
- [ ] `draft: true`가 남아있지 않은지 확인
- [ ] 이미지가 `attachments/`에 있고 임베드가 정상 작동하는지 확인
- [ ] 내부 링크(`[[]]`)가 유효한지 확인
- [ ] 로컬 빌드 테스트: `npx quartz build --serve`로 미리보기
- [ ] 파일명에 특수문자나 공백이 없는지 확인

---

## 8. 현재 프로젝트 설정 참고

### 8.1 빌드 트리거 조건 (GitHub Actions)

`main` 브랜치에 다음 경로가 변경되면 자동 배포:
- `content/**` -- 콘텐츠 변경
- `quartz/**` -- Quartz 소스 변경
- `quartz.config.ts`, `quartz.layout.ts` -- 설정 변경
- `package.json` -- 의존성 변경

### 8.2 빌드 제외 패턴 (`ignorePatterns`)

```typescript
ignorePatterns: ["private", "templates", ".obsidian", "drafts", "docs"]
```

이 폴더들은 `content/` 안에 있어도 빌드에서 제외된다.

### 8.3 날짜 우선순위

```typescript
CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] })
```

1. frontmatter의 `date` 필드
2. Git 커밋 이력의 최초 추가 시점
3. 파일 시스템 생성일

frontmatter에 `date`를 명시하면 가장 정확한 날짜가 표시된다.

---

## 부록: 빠른 시작 체크리스트

1. [ ] `content/` 하위에 폴더 구조 생성 (`dev/`, `study/`, `blog/`, `attachments/`)
2. [ ] 기존 기본 파일 정리 (`환영합니다!.md`, `create a link.md`, `테스트 파일.md` 삭제)
3. [ ] `content/index.md` 랜딩 페이지 커스터마이징
4. [ ] Obsidian에서 첨부파일 기본 경로를 `attachments`로 설정
5. [ ] Templater 플러그인 설치 및 템플릿 등록
6. [ ] 첫 포스트 작성 후 로컬 빌드 확인 (`npx quartz build --serve`)
7. [ ] Git 커밋 및 푸시 → Cloudflare Pages 배포 확인
