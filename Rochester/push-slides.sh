#!/usr/bin/env bash
# Commits and pushes ONLY the Rochester Impact 4 lesson decks (every Impact4-*.html in
# Impact-4-Slides) and the images they reference. It does nothing unless one of those files
# actually changed. Anything else in the repo (dashboard, student sync files, backups, lesson
# plans) is never touched.
cd "$(dirname "$0")/.." || exit 1

SLIDES_DIR="Rochester/Impact-4-Slides"
REMOTE=students
BRANCH=master

# every lesson deck in the folder, so new lessons are picked up automatically
PATHS=()
for f in "$SLIDES_DIR"/Impact4-*.html; do [ -f "$f" ] && PATHS+=("$f"); done
[ ${#PATHS[@]} -eq 0 ] && { echo "$(date '+%H:%M:%S') no lesson files found"; exit 0; }

# plus the images those decks use (images that no deck references are never pushed)
for img in $(grep -ohE 'img/[A-Za-z0-9_.-]+\.(png|jpe?g|gif|svg|webp)' "${PATHS[@]}" | sort -u); do
  [ -f "$SLIDES_DIR/$img" ] && PATHS+=("$SLIDES_DIR/$img")
done

git add -- "${PATHS[@]}" 2>/dev/null
if git diff --cached --quiet -- "${PATHS[@]}"; then
  echo "$(date '+%H:%M:%S') nothing to push"
  exit 0
fi

git commit -q -m "Auto-push: update Impact 4 slides ($(date '+%Y-%m-%d %H:%M'))

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" -- "${PATHS[@]}" || exit 1

if git push -q "$REMOTE" "$BRANCH"; then
  echo "$(date '+%H:%M:%S') pushed: $(git log --oneline -1)"
else
  echo "push rejected - trying rebase onto $REMOTE/$BRANCH"
  git pull -q --rebase --autostash "$REMOTE" "$BRANCH" && git push -q "$REMOTE" "$BRANCH" \
    && echo "$(date '+%H:%M:%S') pushed after rebase: $(git log --oneline -1)" \
    || { echo "PUSH FAILED - needs a manual look"; exit 1; }
fi
