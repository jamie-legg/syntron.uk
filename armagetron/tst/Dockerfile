FROM fedora:39

ENV UID=0
ENV GID=0

COPY ./ZThread-2.3.2 /app/tmp/zthread
COPY ./template /app/server/server
COPY ./start.sh /

# Install necessary packages
RUN dnf install -y \
  which \
  findutils \
  git \
  automake \
  bison \
  g++ \
  libxml2-devel \
  boost-devel \
  protobuf-devel \
  mesa-libGLU-devel \
  php \
  php-json \
  php-mysqlnd \
  php-sqlite3 \
  php-xml \
  php-bcmath \
  php-curl \
  python3 \
  python3-pip

# Create temporary directory
RUN mkdir -p /app/tmp

# Clone the ArmagetronAd source code
RUN git clone --depth 1 -b hack-0.2.8-sty+ct+ap https://github.com/ArmagetronAd/armagetronad.git /app/tmp/src

# Build and install ZThread
WORKDIR /app/tmp/zthread
RUN ./configure CXXFLAGS="-fpermissive" --prefix=/usr/ && make && make install && ldconfig

# Build and install ArmagetronAd
WORKDIR /app/tmp/src
RUN ./bootstrap.sh && \
    ./configure --prefix=/app/server --disable-glout --enable-authentication --with-zthread --disable-sysinstall --disable-useradd --disable-etc --disable-desktop --disable-uninstall && \
    make && make install

# Set up Python environment
WORKDIR /app/server
COPY requirements.txt /app/server/requirements.txt
RUN pip3 install -r requirements.txt

# Cleanup temporary files
RUN chmod 755 /app/server/bin && rm -R /app/tmp

# Set entrypoint
ENTRYPOINT ["/start.sh"]
