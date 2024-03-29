
# Home Website on a Linux Kubernetes Cluster 

My overkill website at https://thorne.nz hosted on a Fedora Linux server at home. It is created with:
- Deployment on Kubernetes with kubeadm. Including all cluster networking
- Postgres Database with a Hasura GraphQL API 
- Monitoring using New Relic Synthetics and Browser
- CICD pipeline using GitHub Actions
- React SPA frontend
- Terraform to create Route53, API Gateway, Lambda, IAM, Cognito, ACM, and Cloudfront resources

## Monitoring 
A New Relic dashboard has been set up to monitor the performance of my SPA using:
- Browser to monitor the load times, throughtput, and JS errors for the site
- Synthetics to constantly check the health of the site

An example is shown below:
![image](https://user-images.githubusercontent.com/52871491/98344751-92715f80-2078-11eb-8e5e-26ea087cb213.png)

## CICD
CICD pipeline is created using GitHub Actions. This will build the Docker image on `linux/arm/v7` and deploy it on my Kubernetes cluster at home using the steps shown below:

![image](https://user-images.githubusercontent.com/52871491/98346035-517a4a80-207a-11eb-8889-26db4f66a93d.png)
