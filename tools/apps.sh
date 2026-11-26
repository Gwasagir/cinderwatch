#!/usr/bin/env bash
# Builds the game and its apps into dist/ with one command, printing one line per step.
#
#   tools/apps.sh                  the web build, the Android APK and the iOS .ipa
#   tools/apps.sh android          only some of: web android ios
#
# web      joins src/ into index.html (and copies it to dist/).
# android  builds a release APK locally. Needs JDK 17 (JAVA_HOME, java on the path, or ~/.local/opt/jdk-17*)
#          and the Android SDK (ANDROID_HOME or android/local.properties).
# ios      builds an unsigned .ipa locally with Xcode on a Mac. Anywhere else it downloads the .ipa that the
#          iOS workflow built on GitHub for the current commit (push it first; needs the gh CLI), starting
#          the workflow if it has not run for that commit.
#
# Full build output goes to dist/logs/; on a failure the last lines of the log are shown.
set -uo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd); cd "$ROOT"
DIST=$ROOT/dist; LOGS=$DIST/logs; mkdir -p "$LOGS"
STEPS=("$@"); [ ${#STEPS[@]} -eq 0 ] && STEPS=(web android ios)
ok() { printf '%-8s %s\n' "$1" "$2"; }
fail() { printf '%-8s FAILED: %s\n' "$1" "$2"; [ -n "${3:-}" ] && tail -n 15 "$3" | sed 's/^/         /'; STATUS=1; }
STATUS=0

web() {
  if python3 tools/build.py > "$LOGS/web.log" 2>&1; then cp index.html "$DIST/cinderwatch.html"; ok web "index.html ($(du -k index.html | cut -f1) KB)"
  else fail web "tools/build.py" "$LOGS/web.log"; fi
}

android() {
  local jh=${JAVA_HOME:-}
  if [ -z "$jh" ] && ! command -v java >/dev/null; then jh=$(ls -d "$HOME"/.local/opt/jdk-17* 2>/dev/null | head -n1); fi
  if [ -z "$jh" ] && ! command -v java >/dev/null; then fail android "no JDK 17 found (set JAVA_HOME)"; return; fi
  if ( cd android && JAVA_HOME=${jh:-$JAVA_HOME} ./gradlew --console=plain -q assembleRelease ) > "$LOGS/android.log" 2>&1; then
    cp android/app/build/outputs/apk/release/cinderwatch-release.apk "$DIST/cinderwatch.apk"; ok android "dist/cinderwatch.apk ($(du -k "$DIST/cinderwatch.apk" | cut -f1) KB)"
  else fail android "gradle" "$LOGS/android.log"; fi
}

ios_local() {
  local dd=$DIST/ios-build
  if xcodebuild -project ios/Cinderwatch.xcodeproj -scheme Cinderwatch -configuration Release -sdk iphoneos -destination 'generic/platform=iOS' \
       -derivedDataPath "$dd" CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY="" build > "$LOGS/ios.log" 2>&1; then
    rm -rf "$dd/Payload" && mkdir -p "$dd/Payload" && cp -R "$dd/Build/Products/Release-iphoneos/Cinderwatch.app" "$dd/Payload/" && (cd "$dd" && rm -f "$DIST/cinderwatch-unsigned.ipa" && zip -qr "$DIST/cinderwatch-unsigned.ipa" Payload)
    ok ios "dist/cinderwatch-unsigned.ipa (built with Xcode)"
  else fail ios "xcodebuild" "$LOGS/ios.log"; fi
}

ios_remote() {
  command -v gh >/dev/null || { fail ios "not on a Mac and no gh CLI to fetch the CI build"; return; }
  local sha branch up remote repo id
  sha=$(git rev-parse HEAD); branch=$(git rev-parse --abbrev-ref HEAD)
  up=$(git rev-parse --abbrev-ref '@{u}' 2>/dev/null) || { fail ios "branch $branch is not pushed; push it first"; return; }
  remote=${up%%/*}
  [ "$(git rev-parse "$up")" = "$sha" ] || { fail ios "HEAD is not pushed to $up; push it first"; return; }
  repo=$(git remote get-url "$remote" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')
  id=$(gh run list -R "$repo" --workflow ios.yml --commit "$sha" --limit 1 --json databaseId -q '.[0].databaseId' 2>>"$LOGS/ios.log")
  if [ -z "$id" ]; then
    gh workflow run ios.yml -R "$repo" --ref "$branch" >>"$LOGS/ios.log" 2>&1 || { fail ios "could not start the iOS workflow" "$LOGS/ios.log"; return; }
    for _ in $(seq 30); do sleep 4; id=$(gh run list -R "$repo" --workflow ios.yml --commit "$sha" --limit 1 --json databaseId -q '.[0].databaseId' 2>/dev/null); [ -n "$id" ] && break; done
    [ -n "$id" ] || { fail ios "the iOS workflow did not start"; return; }
  fi
  printf '%-8s waiting for the GitHub build (run %s)...\n' ios "$id"
  gh run watch "$id" -R "$repo" --exit-status --interval 20 >>"$LOGS/ios.log" 2>&1 || { fail ios "the iOS workflow failed: gh run view $id -R $repo --log-failed"; return; }
  rm -f "$DIST/cinderwatch-unsigned.ipa"
  gh run download "$id" -R "$repo" -n cinderwatch-ios -D "$DIST" >>"$LOGS/ios.log" 2>&1 || { fail ios "download failed" "$LOGS/ios.log"; return; }
  ok ios "dist/cinderwatch-unsigned.ipa (built on GitHub, run $id)"
}

for s in "${STEPS[@]}"; do
  case $s in
    web) web ;;
    android) android ;;
    ios) if [ "$(uname)" = Darwin ] && command -v xcodebuild >/dev/null; then ios_local; else ios_remote; fi ;;
    *) fail "$s" "unknown step (use web, android, ios)" ;;
  esac
done
exit $STATUS
