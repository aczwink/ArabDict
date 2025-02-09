resource webApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: 'openarabdictviewer-frontend'
  location: resourceGroup().location

  properties: {
  }
  sku: {
    name: 'Free'
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2024-04-01' = {
  name: 'openarabdictviewer-asp'
  location: resourceGroup().location

  kind: 'linux'
  properties: {
    reserved: true
  }
  sku: {
    name: 'F1'
  }
}

resource backend 'Microsoft.Web/sites@2024-04-01' = {
  name: 'openarabdictviewer-backend'
  location: resourceGroup().location

  properties: {
    serverFarmId: appServicePlan.id
  }
}