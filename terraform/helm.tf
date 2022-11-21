provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "cert_manager" {
  name = "cert-manager"

  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "v1.4.0"
  namespace        = "cert-manager"
  create_namespace = true

  set {
    name  = "installCRDs"
    value = "true"
  }
}

resource "helm_release" "external_dns" {
  name = "external-dns"

  repository       = "https://charts.helm.sh/stable"
  chart            = "external-dns"
  namespace        = "cert-manager"
  create_namespace = true

  set {
    name  = "aws.accessKey"
    value = var.aws_access_key_id
  }
  set {
    name  = "aws.secretKey"
    value = var.aws_secret_access_key_id
  }
  set {
    name  = "aws.region"
    value = "us-east-1"
  }
  set {
    name  = "policy"
    value = "upsert-only"
  }
  set {
    name  = "domainFilters"
    value = "{api.${var.domain}}"
  }
}

resource "helm_release" "ingress_nginx" {
  name = "ingress-nginx"

  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  create_namespace = true

  values = [
    file("helm/nginx-values.yaml")
  ]
}

# resource "helm_release" "elasticsearch" {
#   name       = "elasticsearch"

#   repository = "https://helm.elastic.co"
#   chart      = "elasticsearch"
#   namespace  = "observability"
#   create_namespace = true

#   values = [
#     file("helm/elasticsearch-values.yaml")
#   ]
# }

# resource "helm_release" "logstash" {
#   name       = "logstash"

#   repository = "https://helm.elastic.co"
#   chart      = "logstash"
#   namespace  = "observability"
#   create_namespace = true
# }

# resource "helm_release" "metricbeat" {
#   name       = "metricbeat"

#   repository = "https://helm.elastic.co"
#   chart      = "metricbeat"
#   namespace  = "observability"
#   create_namespace = true
# }

# resource "helm_release" "filebeat" {
#   name       = "filebeat"

#   repository = "https://helm.elastic.co"
#   chart      = "filebeat"
#   namespace  = "observability"
#   create_namespace = true

#   values = [
#     file("helm/filebeat-values.yaml")
#   ]
# }

# resource "helm_release" "apm-server" {
#   name       = "apm-server"

#   repository = "https://helm.elastic.co"
#   chart      = "apm-server"
#   namespace  = "observability"
#   create_namespace = true
# }

# resource "helm_release" "kibana" {
#   name       = "kibana"

#   repository = "https://helm.elastic.co"
#   chart      = "kibana"
#   namespace  = "observability"
#   create_namespace = true
# }

# resource "helm_release" "prometheus" {
#   name       = "prometheus"

#   repository = "https://prometheus-community.github.io/helm-charts"
#   chart      = "kube-prometheus-stack"
#   namespace  = "observability"
#   create_namespace = true

#   values = [
#     file("helm/prometheus-values.yaml")
#   ]
# }

# resource "helm_release" "jaeger" {
#   name       = "jaeger"

#   repository = "https://jaegertracing.github.io/helm-charts"
#   chart      = "jaeger"
#   namespace  = "observability"
#   create_namespace = true

#   values = [
#     file("helm/jaeger-values.yaml")
#   ]
# }
