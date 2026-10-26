# DEVLOG / 개발 기록

LGETN 10 Million Production Ceremony – VIP Mobile Invitation (React + Vite + TS + Tailwind)

Reference design / 기준 디자인: "Pasted Image 2" (Accept / Decline section excluded / 수락·거절 섹션 제외)

---

## Step 0 – Plan / 계획 (2026-10-26)

### Existing assets / 보유 에셋 (project root)
| File | Use / 용도 | Note / 비고 |
|---|---|---|
| `lg_logo.webp` | Header logo / 헤더 로고 | Wide logo, transparent bg. Needs 16px clear space / 16px 여백 필수 |
| `앰블럼.jpg` | 10M Milestone emblem / 엠블럼 | White background → `mix-blend-mode: multiply`; rename to `emblem_10m.jpg` / 흰 배경 → multiply 처리, 영문 파일명으로 변경 |
| `menu_korean.png` / `menu_thai.png` / `menu_mexican.png` / `menu_common.png` | Menu carousel / 메뉴 캐러셀 | |
| `favicon.jpg`, `lg-logo-favicon.jpg` | Favicon | |

### Steps / 단계 (review after each step / 단계별 검토 후 진행)
| # | EN | KO | Deliverable |
|---|---|---|---|
| 1 | Project init (Vite + React + TS + Tailwind), move assets to `src/assets/images`, `vite.config.ts` base, `tailwind.config.js` tokens | 프로젝트 초기화, 에셋 이동, 설정, 컬러/폰트 토큰 | Empty app runs / 빈 앱 실행 |
| 2 | Data & i18n: `src/data/content.ts` (`en`/`ko`), `LanguageContext` | 데이터/다국어 구조 | Language switch works / 언어 전환 동작 |
| 3 | Background + Header (sticky blur, logo with `p-4`, ENG/KOR toggle) | 배경 + 헤더 | Matches reference header / 헤더 일치 |
| 4 | Hero (badge, 10 MILLION title, subtitle, date/place, VIP pill, emblem) | 히어로 | Matches reference hero / 히어로 일치 |
| 5 | Schedule timeline (5 groups, red stepper line, Keynote highlight card) | 식순 타임라인 | Matches reference timeline / 타임라인 일치 |
| 6 | Menu carousel (scroll-snap, 4 slides, dot indicator) | 메뉴 캐러셀 | Swipe works / 스와이프 동작 |
| 7 | Footer + assemble `App.tsx` | 푸터 + 조립 | Full page / 전체 페이지 |
| 8 | Responsive QA (320–430px, tablet, desktop, iOS safe-area, `dvh`), Lighthouse, build | 반응형 QA 및 빌드 | Production build / 배포용 빌드 |

### Design system / 디자인 시스템
- Colors: `lg-red #A50034`, deep burgundy title `#6B0F2A`, `champagne-gold #D9A441`~`#F5B942` gradient, warm-white/glass bg
- Fonts: Inter + Pretendard (serif-like display for "10 MILLION" – to match reference)
- Glass card: `bg-white/60 backdrop-blur-xl border border-white/70 shadow` + gold hairline border
- Responsive: fluid widths (`max-w-[430px] w-full`), `clamp()` font sizes, `min-h-dvh`, `env(safe-area-inset-*)`

### Open questions / 확인 필요
1. Event date: reference image says **Tue Nov 10, 2026**, brief says **Fri Nov 13, 2026** / 날짜 불일치
2. Header right side: reference has `VIP ACCESS` + `D-xx` + icon; brief says ENG/KOR toggle / 헤더 우측 구성
3. Schedule label: "11 Sessions" (reference) vs 5 groups (brief) / 세션 수 표기
4. Desktop view: phone frame vs. centered column / 데스크톱 표시 방식

### Decisions / 결정 사항 (2026-10-26)
1. Date: **Friday, Nov 13, 2026 12:00 PM CST** (D-day target `2026-11-13T12:00:00-06:00`)
2. Header: LG logo (left) + `VIP ACCESS` + `D-xx` + ENG/KOR toggle (right)
3. Schedule label: **5 Sessions**
4. Desktop: centered mobile column on swirl background, no phone frame

**Status: Plan approved, awaiting go-ahead for Step 1 / 계획 확정, Step 1 승인 대기**

---

## Step 1 – Project init & assets / 프로젝트 초기화 및 에셋 (2026-10-26)

**Status: Approved / 승인 완료** (emblem colour `#810B25` kept; deploy base `/lgetn-10m-prod-ceremony/` kept, override with `VITE_BASE`)

### Stack / 스택
Vite 8, React 19, TypeScript 7, Tailwind CSS **3.4** (kept v3 so `tailwind.config.js` works as in the brief / 브리프의 `tailwind.config.js` 사용을 위해 v3 유지).
Fonts are self-hosted via npm (no CDN, works offline): Inter Variable, Pretendard Variable (dynamic subset), Playfair Display Variable (display serif for "10 MILLION").

### Files / 파일
- `vite.config.ts`: `base` = `/lgetn-10m-prod-ceremony/` on build, `/` on dev; override with env `VITE_BASE`. Alias `@` → `src`.
- `tailwind.config.js`: tokens `lg-red`, `champagne-gold`, `ink`, screens (`xs 375 / sm 480 / md 768 / lg 1024`), `max-w-app` = 430px, `glass` shadows, safe-area spacing.
- `src/index.css`: base reset, `min-h-dvh`, `.glass` / `.glass-sm`, `.no-scrollbar`, Korean `word-break: keep-all`, reduced-motion, lining numerals for display font.
- `index.html`: `viewport-fit=cover`, theme-color, OG meta, favicon.
- `src/App.tsx`: **temporary** setup-check screen (replaced in Step 7).
- Scripts: `npm run dev`, `npm run build`, `npm run typecheck`.

### Asset changes / 에셋 변경
| Before | After | Why |
|---|---|---|
| `앰블럼.jpg` (white bg) | `src/assets/images/emblem_10m.png` (transparent, cropped) | JPG had off-white bg that left a visible box even with `multiply`; rebuilt alpha from luminance, flat ink colour `#810B25`. Original archived in `docs/source-assets/emblem_10m_original.jpg` |
| `lg_logo.webp` | `src/assets/images/lg_logo.webp` | unchanged |
| `menu_*.png` | `src/assets/images/menu_*.png` | unchanged; sizes differ (465x282 ~ 1200x896), so cards will use a fixed aspect ratio + `object-cover` (Step 6). Convert to WebP then |
| `favicon.jpg`, `lg-logo-favicon.jpg` | `public/favicon.webp`, `public/lg-logo-favicon.webp` | files were actually WebP with `.jpg` extension |

Note: the emblem no longer needs `mix-blend-mode: multiply`.

### Verification / 검증
- `npm run build` passes (typecheck + bundle).
- Checked on 390px viewport: fonts load, Korean renders in Pretendard, "10" uses lining numerals, emblem is transparent over a gradient.

### Open items for later steps / 이후 단계 메모
- Deploy target for `base` (GitHub Pages assumed) – confirm before Step 8.
- Playfair Display is a close match for the reference title; re-compare in Step 4.
- Emblem placement: between event date and SCHEDULE (where the Accept/Decline box was).

---

## Step 2 – Data & i18n / 데이터 및 다국어 (2026-10-26)

**Status: Approved / 승인 완료** (Korean drafts, locations, footer all accepted)

### Files / 파일
- `src/data/content.ts`: `Language`, `ContentData` interfaces and `content: Record<Language, ContentData>` (`en` / `ko`). The Record type makes the compiler reject a missing key in either language. Also holds `EVENT_START_ISO` (`2026-11-13T12:00:00-06:00`) and `EVENT_TIMEZONE` (`America/Chicago`). Menu images are imported here.
- `src/context/LanguageContext.ts`: context + `useLanguage()` → `{ lang, t, setLang, toggleLang }`.
- `src/context/LanguageProvider.tsx`: initial language = saved choice (`localStorage`, safe if blocked) → browser `ko*` → `en`. Updates `<html lang>`, `document.title`, meta description on change. No page reload.
- `src/hooks/useDDay.ts`: `getDDay()` / `useDDay()`; counts calendar days in the event time zone (Chicago), so the label flips at local midnight, not at the viewer's. Returns `upcoming(days)` / `today` / `ended`; refreshes every minute.
- `src/main.tsx`: wraps `<App />` in `<LanguageProvider>`.
- `src/App.tsx`: **temporary** verification screen (real UI in Steps 3–7).

### Content decisions / 콘텐츠 결정
- Hero text is split to match the reference: `keyMessage` + `location` on one line, `date` + `time` on the next; `slogan` is separate (not in the reference image, placement decided in Step 4).
- `sessionCount` is a template (`{count} Sessions` / `{count}개 세션`), count derived from `items.length`.
- Menu: 4 categories (Korean, Thai, Mexican, Dessert & Drink as slide 4 with tagline "Served with every lunch box"). Each dish = `name` + optional `note`.
- Footer has only the single `line` (copyright removed per brief).

### Assumptions to confirm / 확인 필요
1. **Korean translations are drafts** – title `1,000만 대 / 생산 기념식`, `세탁 혁신의 새로운 이정표`, slogan `함께 만들어가는 더 나은 내일`, badge `VIP 디지털 초청장`, session names, dish names (e.g. `단무지` for pickled radish).
2. Location for "Celebration & Awards" is **Main Stage** (not given in the brief). Closing is **Main Entrance** / `정문`.
3. Menu subtitle and the "Served with every lunch box" tagline are my wording.
4. Korean footer: `LG전자, 테네시주 클락스빌 · Built for Excellence` (tagline kept in English).

### Verification / 검증
- `npm run build` passes.
- In-browser test (390px): default `en` → toggle → `ko` (title, `<html lang>`, all text switch) → reload keeps `ko` → toggle back to `en`. D-day shows `D-18` (Oct 26 → Nov 13).

---

## Step 3 – Background & sticky header / 배경 및 스티키 헤더 (2026-10-26)

**Status: Approved / 승인 완료**

### Files / 파일
- `src/components/AppShell.tsx`: page frame. Mobile column (`max-w-app` 430px, pearl `.app-surface`) + `.hero-glow` (crimson left / gold right blooms in the top ~780px, tuned in Step 4 against the reference) + desktop-only fixed `.swirl-bg` (`md:` and up, crimson/wine left, amber/coral right). The swirl is hidden on phones, where it would be fully covered anyway (saves GPU).
- `src/components/Header.tsx`: `sticky top-0 z-50`, blur glass, becomes more opaque + gold hairline + shadow after 8px scroll. Top padding uses `env(safe-area-inset-top)`.
  - Left: `lg_logo.webp`, 16px tall, wrapped in `p-4` → **16px clear space on all sides** (header height 48px + 1px border).
  - Right: `VIP ACCESS` pill (crown icon, gold) and one glass pill with `D-xx` + the language toggle (mirrors the reference's "D-24 + control" pill).
- `src/components/LanguageToggle.tsx`: segmented `ENG | KOR` switch (`role="switch"`, sliding crimson thumb, tap target extended by 8px).
- `tailwind.config.js`: `shadow-column`; `champagne-gold-deep` darkened to `#8F6516` (text contrast on cream).
- `src/App.tsx`: still the **temporary** test content + a 900px filler to test scrolling.

### Responsive behaviour / 반응형
| Viewport | Header |
|---|---|
| ≥ 385px | crown + `VIP ACCESS` / `VIP 초청` label |
| 340–384px | crown icon only (label stays for screen readers) |
| < 340px | VIP pill hidden, `D-xx` + toggle remain |
Measured at 320 / 340 / 360 / 375 / 380 / 390 / 430 / 768px in EN and KO: right padding ≥ 12px and logo clear space ≥ 16px at every width, no horizontal overflow.

### Verification / 검증
- `npm run build` passes.
- Scroll test: header turns frosted with gold line while content scrolls beneath it.
- 1280px: centered 430px column over the swirl backdrop.

### Notes / 메모
- The page scrollbar width (~15px on desktop Chromium) narrows the layout; real phones use overlay scrollbars, so the header will have a little more room there.
- Hero glow positions are placeholders until the hero exists (Step 4).

---

## Step 4 – Hero / 히어로 섹션 (2026-10-26)

**Status: Approved / 승인 완료** (then compacted in Step 5)

Step 3 approved. Desktop is a minimal fallback only (no more desktop background work); 375px keeps the crown-only VIP pill. Hosting target: **GitHub Pages** – `base` already `/lgetn-10m-prod-ceremony/`; workflow + SPA notes go into Step 8.
Step 3 승인. 데스크톱은 최소 폴백만 유지. 호스팅은 GitHub Pages (Step 8에서 배포 워크플로 정리).

### Files / 파일
- `src/components/Hero.tsx` (new), `src/index.css` (`.hero-title-top` / `.hero-title-bottom` fluid sizes, EN and KO), `tailwind.config.js` (`fade-up` animation, horizontal burgundy `title-gradient`).

### Layout (matches reference minus Accept/Decline) / 구성
1. Gold gradient pill `MILESTONE CELEBRATION`.
2. `10 MILLION` (Playfair Display, burgundy gradient text) + `PRODUCTION CEREMONY` (Inter). Sizes use `vw` so both lines have the same width (341px at 390px).
3. `A New Milestone in Laundry Innovation / Clarksville, Tennessee` (one line from ~330px, wraps balanced below) and `Friday, Nov 13, 2026 | 12:00 PM CST`.
4. Outlined gold pill `EXCLUSIVE VIP DIGITAL INVITATION`.
5. Glass card with the 10M emblem + slogan (italic Playfair in EN, upright Pretendard in KO).
- Staggered fade-up entrance; disabled by `prefers-reduced-motion`.
- Korean title: `1,000만 대` in Pretendard 600 (Playfair has no Hangul), `생산 기념식` with wide tracking.

### Verification / 검증
- Build passes; 320–430px in EN and KO: no horizontal overflow; subtitle on one line except 320px EN.

---

## Step 5 – Compact hero, schedule timeline, back-to-top / 히어로 압축, 식순 타임라인, 맨 위로 버튼 (2026-10-26)

**Status: Done, awaiting review / 완료, 검토 대기**

Step 4 approved with the request to shrink the hero so the schedule is visible on first load.
Step 4 승인, 첫 화면에서 식순이 보이도록 히어로 압축 요청.

### Hero compaction / 히어로 압축 (`Hero.tsx`)
- Hero height at 390px: ~560px → **~414px** (EN) / ~423px (KO).
- Badge `py-1.5 → py-1` (10px text); title/subtitle/VIP pill margins reduced; VIP pill `py-2 → py-1.5`.
- Emblem glass card: max width 300 → 224px, padding trimmed; **slogan moved outside the card** as one line between two gold hairlines (no divider inside the card).
- `.hero-glow` moved up (crimson y 340, gold y 310) so the blooms sit behind the new card position. Removed a duplicated `.hero-glow` / `.swirl-bg` / `.app-surface` block that had been left in `index.css` by an earlier edit.

### Timeline / 식순 (`Timeline.tsx`, `hooks/useActiveSession.ts`, `utils/eventTime.ts`)
- Header row: calendar icon + `SCHEDULE • 5 Sessions`, `LIVE SYNC` chip with pulsing amber dot.
- One continuous red line (gradient + soft glow) measured from the first to the last dot (`ResizeObserver`, so it stays correct when text wraps in KO/EN or on narrow screens). Dots are white with red ring and glow; short stub connects each dot to its card.
- Cards: time + bold title on one line, description left / location right (11px). Compact padding (`py-2.5`), 57px for single-line cards.
- Keynote card: gold border + red ring glow, cream gradient, `KEYNOTE • REVEAL` amber badge, larger bold title, `SPECIAL MILLIONTH UNIT REVEAL` chip, larger dot with gold halo.
- **LIVE SYNC is real**: on the event day (Clarksville time) the session in progress gets a pulsing dot (+ red ring on regular cards) and `aria-current="step"`. Checked by faking the clock to 13:10 CST → Keynote card active, header shows `D-DAY`. Outside the event day nothing is highlighted.
- `utils/eventTime.ts` now holds the shared event-time-zone helper; `useDDay` uses it.

### Back to top / 맨 위로 (`BackToTop.tsx`)
- Fixed bottom-right 44px glass button (gold ring, crimson arrow), respects the iPhone safe area; on wide screens it stays inside the 430px column.
- Fades in after 300px of scroll, smooth-scrolls to top (instant if `prefers-reduced-motion`). Hidden state is `aria-hidden` and not focusable.
- Labels: `Back to top` / `맨 위로` (added to `content.ts`).

### Verification / 검증
- `npm run build` passes.
- 320/360/390/430px in EN and KO: no horizontal overflow; line endpoints match first/last dot centers at every width.
- Back-to-top: hidden at top → visible at 700px → click returns to 0 and hides.

### Notes / 메모
- First screen on a 740px-high phone now shows hero + `SCHEDULE` header + ~2.5 cards.
- Active-session highlight uses the times in `content.ts` (24h, CST); change them there if the program changes.

### Revision 5.1 – size trim / 크기 미세 조정
Requested: smaller headline, smaller VIP pill, smaller emblem, **never distort images (keep original aspect ratio)**.
- Title `10 MILLION`: `16.3vw` → `14.4vw` (max 4.5 → 4rem); `PRODUCTION CEREMONY`: `6.6vw` → `5.8vw` (max 1.85 → 1.65rem). KO: `16vw → 14vw`, `8.2vw → 7.2vw`. EN lines stay equal width (302 / 300px at 390px).
- `EXCLUSIVE VIP DIGITAL INVITATION` pill: text 11px → ~9.5px (`clamp(8.5px, 2.5vw, 9.5px)`), padding `px-4 py-1.5` → `px-3 py-1`.
- Emblem card max width 224 → 176px (image ≈ 147px wide); card radius and padding reduced.
- Image rule (applies to all images from now on): sized by **width only** with `height: auto` (`h-auto w-full object-contain`, `w-auto` on the logo) – never both fixed; `width`/`height` attributes are only used to reserve space. Menu images (Step 6) will use `object-cover` inside a fixed-ratio frame, which crops but never stretches.
- Verified rendered vs natural aspect ratio at 320/375/390/430px, EN and KO: logo 6.701 vs 6.702, emblem 1.791 vs 1.791 (identical). Hero height at 390px: ~414 → ~370px.

---

## Step 6 – Menu carousel / 메뉴 캐러셀 (2026-10-26)

**Status: Done, awaiting review / 완료, 검토 대기**

### Assets / 에셋
- `menu_{korean,thai,mexican,common}.png` (≈1.0MB total) → `.webp` (≈165KB total, quality 82). Width-only resize with no enlargement, so aspect ratios are identical (1.690 / 1.649 / 1.940 / 1.339). Originals archived in `docs/source-assets/`.
- `content.ts` imports now point to the `.webp` files.
- Note: Korean/Thai/Mexican sources are small (465–610px wide); they are fine on a ~300px card but will look slightly soft on 3x screens. Higher-resolution originals would help if available.

### `src/components/MenuCarousel.tsx`
- Section header: utensils icon + `SPECIAL VIP LUNCHEON`, `Swipe to explore →` hint, subtitle.
- Native CSS scroll-snap (`snap-x snap-mandatory`, `snap-center`, `snap-always`, `overscroll-x-contain`), no library. Each card is 82% of the width, so the neighbouring slide peeks in on both sides; `px-[9%]` centres the first/last card.
- Card: photo on top, label + dish list below. Dish = name + optional note (`Dakgangjeong · Sweet & Crispy Fried Chicken Bites`). Slide 4 (Dessert & Drink) carries the gold tag `Served with every lunch box`. All cards share the same height.
- **Image rule respected**: frame is 16:10; the photo uses `object-contain` (painted at its natural ratio – never stretched, never cropped) and a blurred copy of the same image fills the spare space. Verified: natural 1.690 / 1.649 / 1.940 / 1.339.
- Dots: active dot is a crimson pill; dots are buttons (`Go to slide n` / `슬라이드 이동 n`) that scroll the matching card to the centre. Active dot follows swipes (rAF-throttled scroll handler).
- A11y: `role="region"` + `aria-roledescription="carousel"`, slides are `group`/`slide` with "n / 4" labels; smooth scroll is instant under `prefers-reduced-motion`. First image loads eagerly, the others lazily.
- `App.tsx`: `MenuCarousel` added after `Timeline`; the temporary spacer is now 200px (removed with the Footer in Step 7).

### Verification / 검증
- `npm run build` passes.
- 390px EN + KO: dots navigate to slides 1→3→4→1 and the card centre lands on the viewport centre (195px); active dot follows; no page-level horizontal overflow.
- Visual check: Korean slide and Dessert slide.

### Notes / 메모
- Slide 4 has the shortest list, so it shows empty space under the list (all cards equal height by design).
- Page background around the carousel was checked for clipped shadows (extra vertical padding added to the scroller).

---

### Revision 6.1 – menu copy removed / 메뉴 문구 삭제 (2026-10-26)
- Removed the `Swipe to explore →` / `옆으로 밀어서 보기 →` hint and the subtitle (`Three international lunch boxes…` / `세계 각국의 도시락 3종과…`) in both languages; `menu.subtitle` and `menu.swipeHint` deleted from `content.ts`. The section now has only the `SPECIAL VIP LUNCHEON` / `VIP 특별 오찬` title.
- New files `Korean_Menu.png`, `Thai_Menu.png`, `Mexican_Menu.png`, `Dessert_Menu.png` were **not used**: they are only 142×88, 170×122, 169×98 and 420×137 px (the current WebPs are 610 / 465 / 547 / 900 px wide), so they would be blurrier. They were left untouched in `src/assets/images` (unused, not bundled). Higher-resolution originals (≥ 900px wide, same aspect ratio) can be dropped in to replace the current ones.

---

## Step 7 – Footer & final assembly / 푸터 및 최종 조립 (2026-10-26)

**Status: Done, awaiting review / 완료, 검토 대기**

### Changes / 변경
- `src/components/Footer.tsx` (new): thin gold hairline with a diamond, then `LG Electronics, Clarksville, TN · Built for Excellence` (KO: `LG전자, 테네시주 클락스빌 · Built for Excellence`), 10–11.5px muted text, one line from 320px up. Bottom padding is 4.75rem + safe area so the text stays clear of the floating back-to-top button (it overlapped at 2rem).
- `src/App.tsx`: final structure `AppShell > Header, <main>{Hero, Timeline, MenuCarousel}</main>, Footer, BackToTop`. Temporary spacer removed.

### Verification / 검증
- `npm run build` passes.
- 320/360/375/390/412/430/768/1280px in EN and KO: no horizontal overflow; footer on one line; footer text never overlaps the back-to-top button (checked at 320/390/430).
- Full page height at 390px: ~1465px (EN) / ~1440px (KO).

### Page map / 페이지 구성
Header (sticky) → Hero → Schedule (5 groups, live highlight) → Special VIP Luncheon (4-slide carousel) → Footer, plus floating Back-to-top.

---

### Revision 7.1 – richer in-screen background / 화면 내부 배경 강화 (2026-10-26)
Requested: bring the deep red swirl mood of the reference (the glow at the screen edges next to the card) into the mobile screen, deeper and more colourful.
- `.hero-glow` in `index.css` rebuilt as 8 layered radial gradients clipped to the screen edges: left side amber → crimson `#BE0A3E` → deep wine `#640624` going down; right side gold → dark crimson → coral; faint pink (left) and gold (right) tails further down the timeline. Layers sit around the VIP pill / emblem card (page y ≈ 240–470) and fade out before the schedule cards so text and the timeline stay readable.
- Previous version was soft pastel (alpha ≈ 0.3); new core alphas are 0.88–0.95.
- Pure CSS gradients (no images, no blur filters), so no extra network or GPU cost. The desktop-only backdrop is unchanged.
- Verified at 390px (EN): colour is concentrated at the edges, centre stays pearl; hero text, timeline line and dots remain legible.

---

## Revision 7.2 – emblem as footer seal + edge-flare background / 엠블럼 인장 + 가장자리 물결 배경 (2026-10-26)

**Status: Done, awaiting review / 완료, 검토 대기** (previous version committed as `7d9c5b8`)

### Emblem → official seal (option 1) / 엠블럼을 하단 공식 인장으로
- Removed the emblem glass card from the hero (it duplicated the `10 MILLION` title). Hero height at 390px: ~370px → **~267px**, so the schedule header now starts at y≈317 and the first two sessions fit on a 740px screen with room to spare.
- `Footer.tsx`: the emblem now sits at the end of the page between two gold hairlines, above the footer line, **100px wide**, sized by width only (`h-auto`). Measured 1.791 shown vs 1.791 natural = no distortion. Lazy-loaded.
- Slogan (`Together We Build A Better Tomorrow`) stays in the hero under the VIP pill, between its two hairlines (the brief lists it as a hero element). It can be moved next to the seal if preferred.

### Background refinement / 배경 다듬기 (`.hero-glow` in `index.css`)
- Flares are now two tilted groups (`::before` left, `::after` right, rotated ∓12° / ±12°): amber → crimson → deep wine on the left, amber → dark crimson → coral on the right, with soft pink/gold tails. Each group has a horizontal mask that fades to nothing toward the centre, so the text column (title, subtitle, VIP pill, slogan, schedule text) stays on clean cream. Colour sits beside the VIP pill / slogan / first schedule cards, like the reference's side glow.
- Boxes are 450px tall so tails fade out instead of ending on a hard edge (a visible cut-off was fixed). Pure CSS, no images.

### Misc
- `MenuCarousel`: extra bottom padding so card shadows are no longer clipped under the dots.
- Verified at 320/390/430px: no horizontal overflow.

---

### Revision 5.2 – live highlight uses Clarksville time; LIVE SYNC dot only blinks while live (2026-10-26)
Question: is the blinking tied to Clarksville local time?
- **Active-session highlight (pulsing dot + red ring + `aria-current`)**: yes. `utils/eventTime.ts` reads the current time in `America/Chicago` (DST-aware, CST on Nov 13) and compares it with the session ranges in `content.ts`; the viewer's own time zone is irrelevant. Verified by faking the clock in Chicago, Seoul and London browser time zones: identical results — none before 12:20 CST, session 1 at 12:20, keynote at 13:10, session 4 at 13:25, session 5 until 15:09, none from 15:10, and nothing on other days.
- **Found**: the amber dot in the `LIVE SYNC` chip pulsed permanently (decorative, not time-based), which looked like a live indicator even on Oct 26. It now pulses **only while a session is in progress** (event day, inside a session window); otherwise it is a static amber dot as in the reference.
- Not changed: header counter shows `D-DAY` for the whole of Nov 13 (Clarksville date), `D-18` today.

---

## Revision 8.0 – header cleanup, days-left counter, swirl band (2026-10-26)

**Status: Done, awaiting review / 완료, 검토 대기**

### Header (`Header.tsx`, `content.ts`)
- Removed the top `VIP ACCESS` pill (and its crown icon); `header.vipAccess` deleted from content.
- Counter now reads **`D-18` + `18 days left`** (KO: `D-18` + `18일 남음`, singular `1 day left`). `D-xx` is bold crimson; the "days left" text is hidden below 340px only. Event day shows `D-DAY`, afterwards `ENDED` / `종료`.
- The `D-DAY` the reviewer saw earlier came from my own test: a fake Playwright clock (13:10 on Nov 13) was left installed in the shared browser. Reset to the real clock; the page shows `D-18` today (Oct 26 → Nov 13, Clarksville date).
- Fit checked at 320/339/340/360/375/390/430/1280px in EN and KO: right padding 12px, logo clear space ≥ 16px, no overflow.

### Hero
- Removed `EXCLUSIVE VIP DIGITAL INVITATION` (and `hero.badgeText` in both languages).
- The freed space plus extra bottom padding (`pb-[104px]`) forms a text-free gap between the slogan and `SCHEDULE`, filled by a new **`SwirlBand.tsx`**: inline SVG, three soft ribbons per side (left amber → crimson → deep wine, right gold → dark crimson → coral) whose tips dissolve into the cream centre. Light Gaussian blur, vertical fade mask (`.hero-swirl`) so nothing touches the slogan or the schedule text. It sits behind everything (`-z-10`; the app column is now an `isolate` stacking context).
- Replaced the previous radial-gradient flares (`.hero-glow`, removed from `AppShell` and CSS) – those looked blotchy in the gap.
- `SCHEDULE • 5 Sessions` title and the `LIVE SYNC` chip got frosted-glass backgrounds so they stay legible where the ribbons end.

### Verification / 검증
- `npm run build` passes; no horizontal overflow at 320–1280px.
- Visual check at 390px (EN, real clock).

---

### Revision 8.1 – ambient glow instead of ribbons; "days left" text removed (2026-10-26)
- **Deleted `SwirlBand.tsx`** (SVG ribbons were too defined/artificial). Replaced by `AmbientGlow.tsx`: seven absolutely positioned `div`s with `radial-gradient(closest-side, …, transparent)` backgrounds and `blur-[64px]` (out-of-focus look, no edges). No crimson / wine: colours are **champagne gold `#F2C26B`, peach `#F8B08A`, salmon `#F79686`, rose `#F08294`** at the left/right edges plus a warm-white core in the centre so the slogan and `SCHEDULE` area stays bright. The vertical fade mask is kept as `.hero-ambient`.
- Blur is 64px rather than 100px+: on top of a `closest-side` gradient a 100px blur diluted the colour to almost nothing (first attempt was nearly invisible) and costs more GPU on phones; the result is equally borderless.
- Header: removed the `18 days left` text; only `D-18` remains (bold crimson) next to the language toggle. `daysLeft` / `daysLeftOne` deleted from `content.ts`.
- Note for dev: after deleting/recreating a component file Tailwind may not regenerate its classes until the dev server is restarted.
- Verified: no horizontal overflow at 320 / 375 / 430 / 1280px; build passes.

---

### Revision 8.2 – vivid colours restored (2026-10-26)
The pastel glow (8.1) left the gap looking empty. `AmbientGlow.tsx` rebuilt with full-strength colours and bigger masses; still pure CSS gradients + blur, no vector edges.
- Colours (solid core, `radial-gradient(closest-side, c 0%, c 55-58%, transparent)` so the blur does not wash them out): left **amber `rgb(250,160,40)` → deep crimson `rgb(200,10,64)` → wine `rgb(104,6,40)`**; right **coral `rgb(248,98,84)` → dark crimson `rgb(168,0,54)` → gold `rgb(252,176,56)`**; a rose bridge `rgb(232,70,100)` across the centre so the middle is filled too.
- Sizes: main masses 320×160px (up from ~250×170 pastel blobs), side masses 240×130 / 250×120; blur 44px (enough to remove every edge without diluting the colour).
- Band moved 12px lower (`-bottom-[76px]`) so the slogan stays on a clean background; the vertical fade mask and the frosted `SCHEDULE` / `LIVE SYNC` chips are unchanged and keep text legible.
- Verified EN + KO at 390px visually and no horizontal overflow at 320 / 390 / 430 / 1280px; build passes.

---

### Revision 8.3 – page-wide colour field + glass for legibility (2026-10-26)
Direction from review: the colour was trapped in the narrow gap under the slogan; the reference has it spread behind the whole schedule, with legibility solved by frosted-glass cards, not by masks.
- **Mask removed**: the vertical fade mask (`.hero-ambient`) is gone from `index.css`.
- **`AmbientGlow` moved to `AppShell`** and scaled up: it is now a 1150px-tall isolated layer at the top of the column (behind everything, `-z-10`), with 9 blobs 220–420px tall: left amber → crimson → wine → rose, right coral → dark crimson → gold → coral, plus a rose bridge in the centre between slogan and schedule. Colour now runs from just under the slogan to the menu header.
- **`mix-blend-screen`** on the bright blobs (the layer is `isolate`d so they only blend with each other): overlaps glow instead of going muddy. The two deepest masses (wine, dark crimson) stay on normal blending so the screen edges keep their depth. Blur 56px.
- **Glassmorphism for readability**: `.glass-sm` is now `bg-white/70` + `backdrop-blur(22px) saturate(150%)` (was 55% / 16px); schedule descriptions/locations use `text-ink-soft` instead of `ink-mute`; the `SPECIAL VIP LUNCHEON` heading became a glass chip like `SCHEDULE`. The keynote card keeps its cream gradient.
- **Timeline over strong colour**: the red line and the dots got a white outline ring so they do not disappear on the crimson edge.
- Slogan area stays clean: the first blob starts below it (top ≈ 270px) and the centre is only touched by the soft rose bridge.
- Verified EN + KO at 320 / 390 / 430 / 1280px: no horizontal overflow, page height unchanged; build passes.

---

### Revision 8.4 – back to a crisp swirl band, clean cream below (2026-10-26)
Direction from review: the page-wide red field (8.3) darkened the schedule and menu and no longer looked like the reference. Reverted to a limited, sharp graphic.
- **Deleted `AmbientGlow.tsx`** and removed it from `AppShell` (no blur, no blend modes, no page-wide colour).
- **`SwirlBand.tsx` restored** as a crisp inline SVG: opaque layered ribbons (wine → crimson, crimson → coral, coral → gold, front gold) crossing the full width, with two thin sheen lines. No filters, no blur, no transparency in the fills. It is anchored to the bottom of the hero and is 96px tall, so it lives **only in the gap between the slogan and `SCHEDULE`** (hero bottom padding 120px; ~8px clear above/below).
- **Below the band everything is the original clean cream**: `.glass-sm` back to white 55% + 16px blur, `SPECIAL VIP LUNCHEON` back to a plain heading, timeline line/dots back to the red-halo style. Schedule descriptions keep the slightly darker `text-ink-soft` for legibility.
- Verified EN + KO at 320 / 390 / 430 / 1280px: no horizontal overflow; build passes.
- Dev note: Tailwind needed a dev-server restart after the component files were deleted/created.

---

### Revision 8.5 – smaller footer emblem (2026-10-26)
- Footer emblem width 100px → **72px** (width only, `h-auto`, so the aspect ratio stays 1.791).

---
