package nodes


var runFile = `
cd /

curl -X POST -H 'Content-Type: application/json' -d "About to clone" http://f7b2b894.ngrok.io/api/node/v1/log

git clone -b v4.1.2-devnet https://github.com/NAVCoin/navcoin-core.git

#curl -X POST -H 'Content-Type: application/json' -d "clone complete" http://f7b2b894.ngrok.io/api/node/v1/log


cd /navcoin-core

#curl -X POST -H 'Content-Type: application/json' -d "cd to navcoin-core" http://f7b2b894.ngrok.io/api/node/v1/log


./autogen.sh

#curl -X POST -H 'Content-Type: application/json' -d "ran autogen" http://f7b2b894.ngrok.io/api/node/v1/log


./configure LDFLAGS="-L/usr/local/berkeley-db-4.8/lib/" \
                CPPFLAGS="-I /usr/local/berkeley-db-4.8/include/" \
                --enable-hardening \
                --without-gui \
                --enable-upnp-default

sleep 120
curl -X POST -H 'Content-Type: application/json' -d "About to Make" http://f7b2b894.ngrok.io/api/node/v1/log


ls
make

#curl -X POST -H 'Content-Type: application/json' -d "Make Complete" http://f7b2b894.ngrok.io/api/node/v1/log
make install
#curl -X POST -H 'Content-Type: application/json' -d "Install Complete" http://f7b2b894.ngrok.io/api/node/v1/log

ls
cd ..

rm -fr /navcoin-core/*
rm -r /navcoin-core/

#curl -X POST -H 'Content-Type: application/json' -d "rm navcoin-src Complete" http://f7b2b894.ngrok.io/api/node/v1/log


navcoind -devnet -rpcuser=hi -rpcpassword=pass &
#curl -X POST -H 'Content-Type: application/json' -d "Start navcoin core Complete" http://f7b2b894.ngrok.io/api/node/v1/log


#curl -X POST -H 'Content-Type: application/json' -d "Sleeping" http://f7b2b894.ngrok.io/api/node/v1/log
sleep 5
#curl -X POST -H 'Content-Type: application/json' -d "awake" http://f7b2b894.ngrok.io/api/node/v1/log

navcoin-cli -testnet -rpcuser=hi -rpcpassword=pass addnode "176.9.19.245" "add"
navcoin-cli -testnet -rpcuser=hi -rpcpassword=pass addnode "46.4.24.136" "add"

#curl -X POST -H 'Content-Type: application/json' -d "add nodes complete" http://f7b2b894.ngrok.io/api/node/v1/log


OUTPUT="$(navcoin-cli -testnet -staking -rpcuser=hi -rpcpassword=pass listreceivedbyaddress 0 true)"
echo "${OUTPUT}"

sleep 120
curl -X POST -H 'Content-Type: application/json' -d "${OUTPUT}" http://f7b2b894.ngrok.io/api/node/v1/log


#curl -X POST -H 'Content-Type: application/json' -d "Finished" http://f7b2b894.ngrok.io/api/node/v1/log


sleep 9999999999`
