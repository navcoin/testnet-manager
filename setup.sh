

#--------------------------------------------------------------------------------
# Add user and group first to make sure their IDs get assigned consistently,
# regardless of whatever dependencies get added
#--------------------------------------------------------------------------------

groupadd -g 1000 navcoin
useradd -u 1000 -g navcoin -s /bin/bash -m -d /navcoin navcoin

#--------------------------------------------------------------------------------
# Installing packages
#--------------------------------------------------------------------------------
apt-get update
apt-get install -yq --no-install-recommends build-essential
apt-get install -yq --no-install-recommends libcurl3-dev
apt-get install -yq --no-install-recommends libtool
apt-get install -yq --no-install-recommends autotools-dev
apt-get install -yq --no-install-recommends automake
apt-get install -yq --no-install-recommends pkg-config
apt-get install -yq --no-install-recommends libssl-dev
apt-get install -yq --no-install-recommends libevent-dev
apt-get install -yq --no-install-recommends bsdmainutils
apt-get install -yq --no-install-recommends libzmq3-dev
apt-get install -yq --no-install-recommends libqrencode-dev
apt-get install -yq --no-install-recommends qrencode
apt-get install -yq --no-install-recommends wget
apt-get install -yq --no-install-recommends curl
apt-get install -yq --no-install-recommends libboost-system-dev
apt-get install -yq --no-install-recommends libboost-filesystem-dev
apt-get install -yq --no-install-recommends libboost-chrono-dev
apt-get install -yq --no-install-recommends libboost-program-options-dev
apt-get install -yq --no-install-recommends libboost-test-dev
apt-get install -yq --no-install-recommends libboost-thread-dev
apt-get install -yq --no-install-recommends libminiupnpc-dev
apt-get install -yq --no-install-recommends ca-certificates
apt-get install -yq --no-install-recommends libunbound-dev
apt-get install -yq --no-install-recommends git
apt-get install -yq --no-install-recommends  dos2unix
apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


ufw allow 22
ufw allow 44444
ufw allow 44445
ufw allow 44446

sleep 5

#--------------------------------------------------------------------------------
# Install gosu
#--------------------------------------------------------------------------------
GOSU_URL= "https://github.com/tianon/gosu/releases/download/"
GOSU_VER= "1.9"

gpg --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
curl -o /usr/local/bin/gosu -fSL ${GOSU_URL}/${GOSU_VER}/gosu-$(dpkg --print-architecture)
curl -o /usr/local/bin/gosu.asc -fSL ${GOSU_URL}/${GOSU_VER}/gosu-$(dpkg --print-architecture).asc
gpg --verify /usr/local/bin/gosu.asc
rm /usr/local/bin/gosu.asc
chmod +x /usr/local/bin/gosu

#--------------------------------------------------------------------------------
# Build + install Berkeley DB
#--------------------------------------------------------------------------------
BDB_URL="http://download.oracle.com/berkeley-db"
BDB_VER="db-4.8.30.NC"
BDB_PKG="${BDB_VER}.tar.gz"
BDB_CHK="12edc0df75bf9abd7f82f821795bcee50f42cb2e5f76a6a281b85732798364ef"
BDB_DIR="/usr/local/berkeley-db-4.8"
CONFIGURE_FLAGS



mkdir temp
cd temp

mkdir -p ${BDB_DIR}
wget "${BDB_URL}/${BDB_PKG}" -q
echo "${BDB_CHK}  ${BDB_PKG}" | sha256sum -c
tar -xzf ${BDB_PKG}

cd ${BDB_VER}/build_unix/
../dist/configure --enable-cxx \
                      --disable-shared \
                      --with-pic \
                      --prefix=${BDB_DIR}
make install


#--------------------------------------------------------------------------------
# Copy files
#--------------------------------------------------------------------------------
#ADD ./conf/apache2.conf /etc/apache2/
#ADD ./conf/navpi.conf /etc/apache2/sites-available/
#ADD ./bin /usr/local/bin
#ADD docker-entrypoint.sh /usr/local/bin/docker-entrypoint

#--------------------------------------------------------------------------------
## Create ssl certificate
#--------------------------------------------------------------------------------
#mkdir /etc/apache2/ssl && cd /etc/apache2/ssl
#openssl genrsa -des3 -passout pass:x -out tmp-navpi-ssl.key 2048
#openssl rsa -passin pass:x -in tmp-navpi-ssl.key -out navpi-ssl.key
#openssl req -new -key navpi-ssl.key -out navpi-ssl.csr -subj "/C=NZ/ST=Auckland/L=Auckland/O=Nav Coin/OU=Nav Pi/CN=my.navpi.org"
#openssl x509 -req -days 365 -in navpi-ssl.csr -signkey navpi-ssl.key -out navpi-ssl.crt
#rm tmp-navpi-ssl.key navpi-ssl.csr

#--------------------------------------------------------------------------------
## Enable apache modules and site
#--------------------------------------------------------------------------------
#a2enmod rewrite && a2enmod php5 && a2enmod ssl
#a2ensite navpi.conf && a2dissite 000-default.conf
