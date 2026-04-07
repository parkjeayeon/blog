---
title: RN에서 지도 선정 기준
date: 2026-04-07
tags:
  - react-native
  - map
description:
draft: true
---
후보리스트 `mapbox` , `webview + maplibre + local http`

## 요구사항
- 모바일 RN 에서 globe 지원하는가?
- 온라인으로 받은 지도를 오프라인(비행기모드)에서도 동작하는가?
- 비용이 무료거나 감당할 수 있는 수준인가?
- 5월까지 프로토타입 출시 후 안정적으로 사용가능한가?
- 타일 z2~z7 사용

---
## Mapbox

###  선택기준
- globe 필수
- 지도보다 비행경로/난류 오버레이 구현에 집중
- 지도 엔진보다 빠른 제품 UX 완성이 목표일 때
### 고려사항
- 장기적인 비용문제

---
## Webview + maplibre + local http

### 선택기준
- 장기적인 비용 절약
- 웹 기반 맵 런타임, 로컬 HTTP 서버, 오프라인 자산 관리까지 직접 운영 가능
- 장기적으로 타일 소스/스타일/오버레이 스택을 완전히 통제하고 싶음
### 고려사항
- **브라우저용 WebGL 지도 엔진을 모바일 WebView 안에 넣는 구조**라서, 오프라인에서는 결국 **style JSON, sprites, glyphs, source URL, tile URL을 전부 로컬 자산 또는 로컬 서버 경로로 관리**해야함
  -> 결국은 MapLibre GL JS은 브라우저용 WebGL 라이브러리이기 때문



## Mapbox 비용 발생 경우의 수

- Mapbox에서 제공해주는 타일에 데이터를 추가해서 커스텀한 타일을 호출하는 경우