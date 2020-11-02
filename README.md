
# Home Website on RaspberryPi Kubernetes Cluster 

### K3s Cluster Setup
```sh
curl https://releases.rancher.com/install-docker/19.03.sh | sh
curl -sfL https://get.k3s.io | sh -s - --docker
```

### Build Image for RaspberryPi
```sh
docker buildx build --platform linux/arm/v7,linux/arm/v6 --output type=registry -t jamesmthorne/pi-site:latest .
```