# Kubernetes Cluster Setup

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```

```bash
sudo yum install docker-ce

cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "graph": "/mnt/docker-data",
  "storage-driver": "overlay"
}
EOF
```

```bash
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-\$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF

# Set SELinux in permissive mode (effectively disabling it)
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

sudo yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

sudo systemctl enable --now kubelet
```

```bash
kubeadm init --pod-network-cidr=10.244.0.0/16
kubectl apply -f https://docs.projectcalico.org/manifests/canal.yaml
kubectl taint node fedora node-role.kubernetes.io/master-
```

## Helm installations

```bash
# Cert manager for ssl certificates
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.4.0 \
  --set installCRDs=true

# Used for DNS ssl validation
helm install  \
  external-dns stable/external-dns \
  --namespace cert-manager \
  --set aws.accessKey=XX \
  --set aws.secretKey=XX \
  --set aws.region=us-east-1 \
  --set policy=upsert-only \
  --set domainFilters={api.thorney.me}

# Install NGINX ingress controller
helm install \
  ingress-nginx ingress-nginx/ingress-nginx \
  -f nginx-values.yaml
```