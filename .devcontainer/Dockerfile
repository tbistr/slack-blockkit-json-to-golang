FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-24.04

ARG TARGETARCH \
  GO_VERSION=1.23.2\
  NODE_VERSION=v20.18.0 

ENV PATH /usr/local/go/bin:/home/vscode/go/bin:$PATH

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -fL "https://go.dev/dl/go${GO_VERSION}.linux-${TARGETARCH}.tar.gz" \
  | tar -C /usr/local -xz --strip-components=1

RUN curl -fL "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-${TARGETARCH}.tar.gz" \
  | tar -C /usr/local -xz --strip-components=1

RUN npm install -g yarn
