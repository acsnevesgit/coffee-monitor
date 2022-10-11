FROM golang:alpine3.16 AS build

RUN mkdir -p /build
WORKDIR /build

COPY go.mod .
RUN go mod download

COPY *.go ./

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /build/api

FROM scratch

WORKDIR /

COPY --from=build /build/api /api

EXPOSE 8080

ENTRYPOINT ["/api"]
