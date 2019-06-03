set -x
npm run start-prod &
sleep 1
echo $! > .pidfile
set +x
