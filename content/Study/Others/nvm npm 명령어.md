---
title: nvm npm 명령어
date: 2026-04-09
tags:
  - 
description:
draft: false
---
Node Verver Manager
Node Packge Manager

가끔 쓰는 명령어 정리


## global 설치 모듈 확인

```bash
npm list -g --depth=0
```

## Node 버전업 할때 

현재 노드버전으로 22.19.0v(이전에 쓰던 node 버전)에 설치된 모듈들 복사

```bash
nvm reinstall-packages 22.19.0
```

이전 모듈 삭제

```bash
nvm uninstall 22.13.1
```
