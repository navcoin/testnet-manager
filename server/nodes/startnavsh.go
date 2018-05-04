package nodes



var startnavsh = `

navcoind -devnet -staking -rpcuser=hi -rpcpassword=pass -stakervote=%dropletname%-%repoBranch% -zapwallettxes &
curl -X POST -H 'Content-Type: application/json' -d "%dropletname%:Start navcoin core Complete" %callback%/api/node/v1/log

sleep 10
navcoin-cli -devnet -rpcuser=hi -rpcpassword=pass addnode "159.65.46.57" "add"

curl -X POST -H 'Content-Type: application/json' -d "%dropletname%:add nodes complete" %callback%/api/node/v1/log


OUTPUT="$(navcoin-cli -devnet -rpcuser=hi -rpcpassword=pass listreceivedbyaddress 0 true)"
echo "${OUTPUT}"

curl -X POST -H 'Content-Type: application/json' -d "%dropletname%::${OUTPUT}" %callback%/api/node/v1/log/address


curl -X POST -H 'Content-Type: application/json' -d "%dropletname%:Running " %callback%/api/node/v1/log

sleep 9999999999


`
