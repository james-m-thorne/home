
# Home Website on RaspberryPi Kubernetes Cluster 

My overkill website at http://james-home.tk hosted on a RaspberryPi at home. It is complete with monitoring from New Relic, a full deployment on Kubernetes, CICD pipeline using GitHub Actions, and a React SPA frontend. 

## Monitoring 
A New Relic dashboard has been set up to monitor the performance of my SPA using:
- Browser to monitor the load times, throughtput, and JS errors for the site
- Synthetics to constantly check the health of the site

An example is shown below:
![image](https://user-images.githubusercontent.com/52871491/98344751-92715f80-2078-11eb-8e5e-26ea087cb213.png)

## CICD
CICD pipeline is created using GitHub Actions. This will build the Docker image on `lunix/arm/v7` and deploy it on my Kubernetes cluster at home. test
