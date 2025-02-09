az group create --name openarabdict --location westeurope
az deployment group create --resource-group openarabdict --template-file deploy.bicep --parameters deployParams.json
