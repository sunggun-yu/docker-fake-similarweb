docker-fake-similarweb
======================

Mock JSON based Restful API Server Docker Image for SimilarWeb API.

## Usage
### Build Docker Image
```bash
docker build -t fake-similarweb:latest .
```

### Run Docker Container
```bash
docker run -d --name fake-similarweb \
  -p 9081:9081 \
  fake-similarweb
```

### Push to the registry

Tag :
```bash
docker tag sunggun/fake-similarweb
```

Push :
```bash
docker push sunggun/fake-similarweb
```

### Pull from the registry
```bash
docker pull sunggun/fake-similarweb
```

### Run Docker Container from pulled image
```bash
docker run -d --name fake-similarweb \
  -p 9081:9081 \
  sunggun/fake-similarweb
```

## Author
Sunggun Yu (sunggun.dev@gmail.com)
