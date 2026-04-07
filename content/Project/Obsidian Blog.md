---
title: Obsidian Blog
date: 2026-04-05
tags:
  - claude-code
  - project
description: 클로드 코드 과제
draft: false
---
# ✅ Obsidian 블로그 배포

## 1. 프로젝트 개요

Claude Code를 활용해 Obsidian 기반 기술 블로그를 구축하고 자동 배포 파이프라인을 완성한 프로젝트.

Obsidian에서 마크다운으로 글을 작성하면 GitHub Actions가 자동으로 감지해 Quartz 4로 빌드하고 Cloudflare Pages에 배포한다. 글쓰기 이외의 모든 과정이 자동화되어 있다.

**배포 주소**: [viakiro.com](https://viakiro.com)
**깃허브**: [viakiro.com](https://viakiro.com)
## 2. 아키텍쳐 구상도

![Obsidian Blog 1775558251585](https://pub-b0493813f2034054b2928bb2344d833a.r2.dev/2026/04/Obsidian%20Blog-1775558251585.webp)

## 3. 주요 기능 정의

| 기능 | 설명 |
|------|------|
| 자동 commit | Obsidian Git이 30분 주기로 변경사항을 자동 commit |
| 수동 push | Cloudflare Pages 무료 빌드(월 500회) 보호를 위해 push는 수동 실행 |
| Draft 관리 | frontmatter `draft: true`로 작성 중인 글을 빌드에서 제외 |
| 이미지 호스팅 | Cloudflare R2에 업로드 후 퍼블릭 URL로 교체 (Git 저장소에 바이너리 미포함) |
| 자동 배포 | `content/**` 변경 감지 시 GitHub Actions → Quartz 빌드 → Cloudflare Pages 배포 |
| 댓글 | Giscus (GitHub Discussions 기반) |

## 4. 스펙 정의

### 4-1. 기술 스택

| 역할         | 기술                          | 선정 이유                                                    | 비고                                                             |
| ---------- | --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| 편집기        | Obsidian                    | 평소 즐겨쓰는 메모Tool이고 팀 블로그가 <br>아니라 개인 블로그라서 선정              |                                                                |
| 정적 사이트 생성기 | Quartz 4 (Preact 기반)        | 태생이 Obsidian을 웹사이트 형태로 <br>게시하기 위한 도구로 설계됨               | [문서](https://quartz.jzhao.xyz/features/Obsidian-compatibility) |
| 호스팅        | Cloudflare Pages            | 무료                                                       |                                                                |
| CI/CD      | GitHub Actions              | 무료                                                       |                                                                |
| 이미지 호스팅    | Cloudflare R2               | 무료                                                       |                                                                |
| 댓글         | Giscus (GitHub Discussions) | 댓글창을 구현하고 싶은데 서버 없이 사용을 원했고<br>github repo를 활용한 해당 스택 채택 |                                                                |

EC2 + Nginx + 서버 사용 안한 이유는
블로그는 지속성이 있어야한다고 생각해서 돈이 안나가는 방향으로 설계


### 4-2. Obsidian 플러그인

| 플러그인 | 용도 |
|----------|------|
| Obsidian Git | 30분 자동 commit + 수동 push |
| Templater | 글/폴더 index 템플릿 자동 생성 |
| Image Upload Toolkit | 이미지 → R2 업로드 (수동 트리거) |

### 4-3. 콘텐츠 규칙

- `content/` root에 파일 직접 저장 금지 → 반드시 카테고리 폴더 안에 저장
- 파일명은 영문 kebab-case (URL slug가 됨)
- frontmatter 필수 필드: `title`, `date`, `tags`, `draft`
