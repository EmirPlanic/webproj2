#!/usr/bin/env bash
# Jednom komandom: Angular (4200) + IPI stranica u Firefoxu

ROOT="$(cd "$(dirname "$0")" && pwd)"
DASH="$ROOT/life-dashboard"
URL_4200="http://localhost:4200/"

if ! command -v npm >/dev/null 2>&1; then
  echo "Nema npm — instaliraj Node.js."
  exit 1
fi

if [ ! -d "$DASH/node_modules" ]; then
  echo "Prvi put: npm install u life-dashboard..."
  (cd "$DASH" && npm install) || exit 1
fi

server_radi() {
  curl -s -o /dev/null -w "%{http_code}" "$URL_4200" 2>/dev/null | grep -q 200
}

if server_radi; then
  echo "Angular vec radi na $URL_4200"
else
  echo "Pokrecem Angular (npm start)..."
  (cd "$DASH" && npm start) &
  echo "PID Angular procesa: $!"

  echo -n "Cekam server"
  for i in $(seq 1 90); do
    if server_radi; then
      echo " — spremno."
      break
    fi
    echo -n "."
    sleep 1
  done
  echo ""

  if ! server_radi; then
    echo "Server se nije podigao na 4200. Provjeri terminal / npm start."
    exit 1
  fi
fi

if command -v firefox >/dev/null 2>&1; then
  firefox "$ROOT/index.html" &
elif command -v google-chrome >/dev/null 2>&1; then
  google-chrome "$ROOT/index.html" &
else
  echo "Otvori rucno: file://$ROOT/index.html"
fi

echo ""
echo "IPI: file://$ROOT/index.html"
echo "Dashboard: $URL_4200"
echo "Zaustavi Angular: kill \$(lsof -t -i:4200 2>/dev/null) ili zatvori terminal gdje radi npm start"
