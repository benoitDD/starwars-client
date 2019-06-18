set -x
npm run start &
sleep 1
echo $! > .pidfile
set +x
