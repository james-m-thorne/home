
# Home Website on RaspberryPi Kubernetes Cluster 

## Monitoring 
A New Relic dashboard has been set up to monitor the performance of my SPA. This was set up using 
- New Relic Browser to monitor the load times, throughtput, and JS errors for the site
- New Relic Synthetics to constantly check the health of the site


## Deployment
This deployment is automated using GitHub Actions. This will build the Docker image on `lunix/arm/v7` and deploy it on my Kubernetes cluster at home. 
