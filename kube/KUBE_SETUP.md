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

```bash
# Add api.thorne.nz to kube certificate
# https://blog.scottlowe.org/2019/07/30/adding-a-name-to-kubernetes-api-server-certificate/

kubectl -n kube-system get configmap kubeadm-config -o jsonpath='{.data.ClusterConfiguration}' > kubeadm.yaml
# ADD certSANs to kubeadm.yaml
mv /etc/kubernetes/pki/apiserver.{crt,key} ~
kubeadm init phase certs apiserver --config kubeadm.yaml

# Restart kube api server
docker kill $(docker ps | grep kube-apiserver | grep -v pause)
```

# Renew certs
```
# https://stackoverflow.com/questions/49885636/kubernetes-expired-certificate
kubeadm certs renew all
systemctl restart kubelet
cp /root/.kube/config /root/.kube/.old-$(date --iso)-config
cp /etc/kubernetes/admin.conf /root/.kube/config

# May need to copy kubelet.conf data 
# https://serverfault.com/questions/1032367/kubectl-get-nodes-error-you-must-be-logged-in-to-the-server-unauthorized-ho
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
helm upgrade --install  \
  external-dns stable/external-dns \
  --namespace cert-manager \
  --set aws.accessKey=XX \
  --set aws.secretKey=XX \
  --set aws.region=us-east-1 \
  --set policy=upsert-only \
  --set domainFilters={api.thorne.nz}

# Install NGINX ingress controller
helm install \
  ingress-nginx ingress-nginx/ingress-nginx \
  -f nginx-values.yaml
```

```bash
# Resize the fedora node
https://gist.github.com/181192/cf7eb42a25538ccdb8d0bb7dd57cf236
lvresize -L +5G --resizefs /dev/mapper/fedora_fedora-root
```
