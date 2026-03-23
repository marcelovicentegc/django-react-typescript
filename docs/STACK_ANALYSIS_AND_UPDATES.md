# Stack analysis and update recommendations

Analysis date: February 2025. See also the changes already applied in this branch (Django 5.1, USE_L10N removed, Tailwind content paths fixed, Webpack asset modules, Jest added). This document summarizes the current boilerplate stack, latest versions, and concrete steps to modernize and align with the “AI-friendly” reality (e.g. Tailwind-first, widely known tooling).

---

## 1. Django

### Current
- **pyproject.toml**: `django = "^5.0.6"`
- **Python**: `^3.12`
- **Settings**: `core/settings/base.py` still references Django 3.0 in docstrings and uses **deprecated `USE_L10N`** (deprecated in 4.0, removed in 5.0 — has no effect; locale formatting is always on).

### Latest
- **Django 6.0** is the current stable (e.g. 6.0.2 on PyPI). Requires Python ≥ 3.12.
- **Django 5.1** is the latest 5.x LTS-friendly line.

### How to leverage the latest Django

1. **Upgrade version**
   - For latest features and Python 3.12+ only: `django = "^6.0"` (or `"^5.1"` for a conservative jump).
   - Run tests and `python manage.py check` after upgrading.

2. **Remove deprecated setting**
   - In `core/settings/base.py`, **remove** `USE_L10N = True` (no longer valid in Django 5+).

3. **Update settings docstrings**
   - Replace Django 3.0 references in `base.py` with the actual version (e.g. 5.0 / 6.0) and current docs URLs.

4. **Optional Django 5/6 features you can adopt**
   - **Database-computed defaults**: `Field.db_default` for DB-level defaults.
   - **GeneratedField**: DB-generated columns from expressions.
   - **Form field groups**: `{{ form.field.as_field_group }}` in templates.
   - **Async**: `async` views, `aget_object_or_404`, async auth helpers if you move to async views.

---

## 2. React and frontend build

### Current
- **React**: `^18.3.1`
- **Build**: Webpack 5, TypeScript 5, Babel for React.
- **Frontend entry**: `index.tsx`; components are **`.tsx`** under `lib/`.

### Latest
- **React 19** is current (e.g. 19.2.4). React 18 remains supported.

### Recommendations
- **React 19**: Upgrade to `react@^19` and `react-dom@^19` when ready; update `@types/react` and `@types/react-dom` to versions that support React 19. Run the test suite and fix any type or behavior changes.
- **Build**: Webpack 5 is still fine. Alternative for a future refresh: Vite (faster dev, simple config, very common and LLM-friendly).

---

## 3. Tailwind and “AI-friendly” design system

### Current
- **Tailwind CSS**: `^3.4.4` (v3).
- **Plugins**: `@tailwindcss/forms`, `@tailwindcss/typography`, **flowbite-react**.
- **Config**: `frontend/tailwind.config.js` — **content paths list only `*.js`**, but all React sources are **`.tsx`**. So Tailwind is **not** scanning your components; utility classes used only in TSX can be purged incorrectly. This is a **bug**.

### Does it come with Tailwind by default?
**Yes.** The boilerplate is already Tailwind-based, which is a design system LLMs are highly proficient at. No change of design system is required for “AI reality.”

### Fixes and improvements

1. **Fix content paths (important)**
   - In `tailwind.config.js`, include TSX (and JS/JSX if any):
   - e.g. `"./lib/**/*.{js,jsx,ts,tsx}"`, `"./index.tsx"`, and keep `./templates/frontend/**/*.html` and `flowbite.content()`.

2. **Tailwind v4 (optional, larger change)**
   - Tailwind v4 is available (new engine, CSS-first config). Staying on v3 is fine for stability; v4 can be a follow-up migration.

3. **Flowbite**
   - Heavily used in this boilerplate (navbar, cards, buttons, inputs, spinner). Keep for now; if you want to reduce dependencies later, you could replace with headless components + Tailwind. Not required for “AI-friendly” — Tailwind itself is the main lever.

4. **Safelist**
   - The current safelist is broad. Once content paths include `.tsx`, you can often shrink the safelist and rely on Tailwind’s scan; only keep patterns that are truly dynamic (e.g. class names built in JS).

---

## 4. Dependencies: unnecessary or deprecated

### Backend (Python)
- **django-better-admin-arrayfield**: Verify you still use array fields in the admin; if not, remove.
- **twilio**: Only needed if you use Twilio (SMS/whatsapp). Remove if unused.
- **cloudinary**: Only if you use it as CDN; keep or replace per your deployment.
- **sentry-sdk**, **gunicorn**, **django-cors-headers**, **django-filter**, **djangorestframework**, **pillow**, **psycopg2-binary**, **python-dotenv**: All current and commonly used; keep.

### Frontend
- **file-loader**: Webpack 5 prefers **Asset Modules** (e.g. `type: "asset/resource"`) instead of `file-loader`. Migrating avoids a deprecated loader.
- **Jest**: The `test` script in `frontend/package.json` runs `jest`, but **Jest is not listed in devDependencies**; it only appears in the lockfile as a transitive dependency. Either add `jest`, `ts-jest`, and necessary types as devDependencies or remove/fix the test script.
- **dayjs**, **query-string**, **react-router-dom**, **@heroicons/react**: All in common use; keep unless you intentionally replace them.

---

## 5. Summary: what to do first

| Priority | Action |
|----------|--------|
| High     | Fix Tailwind **content** paths to include `**/*.tsx` (and relevant JS/JSX) so Tailwind scans all component files. |
| High     | Remove **USE_L10N** from `core/settings/base.py` (Django 5+). |
| High     | Update **Django** to `^5.1` or `^6.0` in `pyproject.toml` and refresh lockfile; update settings docstrings. |
| Medium   | Replace **file-loader** in Webpack with Asset Modules. |
| Medium   | Add **Jest** (and ts-jest/types) to frontend devDependencies or adjust test script. |
| Medium   | Upgrade to **React 19** and matching types when ready. |
| Low      | Consider **Tailwind v4** later; optional. |
| Low      | Drop **twilio** / **django-better-admin-arrayfield** / **cloudinary** if not used. |

---

## 6. Tailwind = default and AI-friendly

The boilerplate **already uses Tailwind by default**. That aligns well with the “AI reality”: LLMs are very good at generating and modifying Tailwind utility classes. No need to add Tailwind for that reason; the main fix is ensuring Tailwind actually sees your `.tsx` files via correct `content` paths.
