# CLAUDE.md

Claude Code가 이 저장소에서 작업할 때 참고하는 가이드.

---

## 프로젝트 개요

Obsidian + Quartz 4 기반 블로그. 배포 주소: viakiro.com

- **Quartz 4**: Preact 기반 정적 사이트 생성기. React가 아님.
- **콘텐츠 경로**: `content/` 폴더
- **커스텀 설정**: `quartz.config.ts`, `quartz.layout.ts`
- **커스텀 컴포넌트**: `quartz/components/`
- **커스텀 스타일**: `quartz/styles/custom.scss`

---

## 개발 명령어

```bash
npx quartz build --serve   # 개발 서버 (localhost:8080)
npx quartz build           # 프로덕션 빌드
```

---

## 핵심 파일

| 파일 | 역할 |
|------|------|
| `quartz.config.ts` | 폰트, 색상, 플러그인, locale, baseUrl 설정 |
| `quartz.layout.ts` | 사이드바/본문 컴포넌트 배치 |
| `quartz/styles/custom.scss` | 커스텀 CSS (모바일 대응 포함) |
| `quartz/components/ProfileImage.tsx` | 프로필 이미지 컴포넌트 |
| `quartz/i18n/locales/ko-KR.ts` | UI 텍스트 한국어/영어 설정 |

---

## 주요 커스터마이징 내역

- **폰트**: Schibsted Grotesk (header), Source Sans Pro (body), JetBrains Mono (code)
- **모바일 헤더**: 햄버거 버튼 우측 배치 (`custom.scss` — `.explorer { order: 999 }`)
- **프로필 이미지**: `DesktopOnly`로 감싸 모바일에서 숨김 — `ProfileImage.tsx`가 `displayClass` prop 수용
- **ContentMeta 숨김**: `quartz.layout.ts`에서 `Component.ContentMeta()` 제거
- **Explorer 이름**: `ko-KR.ts`에서 `explorer.title: "Contents"` 설정
- **댓글**: Giscus (repo: `parkjeayeon/blog`) — `quartz.layout.ts` afterBody

---

## 콘텐츠 규칙

- `content/` root에 파일 직접 저장 금지. 반드시 카테고리 폴더 안에 저장.
- `draft: true` frontmatter가 있으면 빌드 시 제외됨 (RemoveDrafts 플러그인)
- 이미지는 `assets/` 폴더에 임시 저장 → Image Upload Toolkit으로 R2 업로드 후 URL 교체

---

## .gitignore 구조

`/*` (전체 무시) + 필요한 폴더만 허용 방식. `content/`, `quartz/`, 설정 파일만 Git 추적.
`templates/`, `assets/`, `.obsidian/`은 추적 제외.
