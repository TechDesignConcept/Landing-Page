---
layout: post
title: "Bicep Best Practices in 2025: Writing Production-Ready Infrastructure Code"
date: 2025-06-01
author: "Joshua Argy"
image: "/assets/imgs/bicep-best-practices.png"
excerpt: "Master the latest Bicep best practices to write cleaner, more maintainable Infrastructure as Code for your Azure deployments."
tags: [azure, bicep, infrastructure-as-code, devops, best-practices]
---

# Bicep Best Practices in 2025: Writing Production-Ready Infrastructure Code

Bicep has matured significantly since its introduction, and with that maturity comes evolved best practices. Whether you're new to Bicep or looking to improve your existing templates, these recommendations will help you write cleaner, more maintainable infrastructure code.

## Modern Syntax Improvements

### Use User-Defined Types Instead of Open Types

Avoid generic `object` and `array` types. Instead, define precise types:

```bicep
// ❌ Avoid
param networkConfig object

// ✅ Prefer
type networkConfigType = {
  vnetName: string
  addressPrefix: string
  subnets: subnetType[]
}

type subnetType = {
  name: string
  addressPrefix: string
  @description('Optional NSG resource ID')
  nsgId: string?
}

param networkConfig networkConfigType
```

### Leverage Resource-Derived Types

When passing resource properties, use built-in resource types:

```bicep
// ✅ Use resource-derived types for accurate typing
output storageAccountProperties resourceOutput<'Microsoft.Storage/storageAccounts@2023-01-01'> = storageAccount
```

### Safe Dereference for Nullable Properties

Use the safe-dereference operator instead of verbose null checks:

```bicep
// ❌ Verbose
var subnetId = virtualNetwork != null ? virtualNetwork.properties.subnets[0].id : ''

// ✅ Clean
var subnetId = virtualNetwork.?properties.?subnets[0].?id ?? ''
```

## Resource Declaration Best Practices

### Use Parent Property for Child Resources

Never construct child resource names with string concatenation:

```bicep
// ❌ Avoid
resource subnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  name: '${vnetName}/mysubnet'
  // ...
}

// ✅ Prefer
resource vnet 'Microsoft.Network/virtualNetworks@2023-09-01' existing = {
  name: vnetName
}

resource subnet 'Microsoft.Network/virtualNetworks/subnets@2023-09-01' = {
  parent: vnet
  name: 'mysubnet'
  // ...
}
```

### Use Symbolic References Over Functions

Replace `resourceId()` and `reference()` with symbolic names:

```bicep
// ❌ Avoid
output keyVaultUri string = reference(resourceId('Microsoft.KeyVault/vaults', kvName)).vaultUri

// ✅ Prefer
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' existing = {
  name: kvName
}

output keyVaultUri string = keyVault.properties.vaultUri
```

## Security Considerations

### Always Secure Sensitive Parameters

```bicep
@secure()
@description('The administrator password for the SQL Server')
param sqlAdminPassword string

@secure()
@description('API key for external service integration')
param apiKey string
```

### Use Managed Identities

Avoid storing credentials when possible:

```bicep
resource functionApp 'Microsoft.Web/sites@2023-01-01' = {
  name: functionAppName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  // ...
}
```

## Module Usage Patterns

### Pin Module Versions

Always specify exact versions for reproducibility:

```bicep
// ✅ Pinned version
module storage 'br/public:avm/res/storage/storage-account:0.31.0' = {
  // ...
}

// ❌ Avoid unpinned or latest
```

### Module Naming is Optional

The `name` property for modules is no longer required:

```bicep
// ✅ Modern syntax - name is optional
module keyVault 'br/public:avm/res/key-vault/vault:0.13.3' = {
  params: {
    name: 'kv-${uniqueString(resourceGroup().id)}'
    location: location
  }
}
```

## Parameters Files

### Use Bicepparam Over JSON

Bicep parameters files (`.bicepparam`) offer better tooling support:

```bicep
// main.bicepparam
using './main.bicep'

param environment = 'production'
param location = 'uksouth'
param tags = {
  Environment: 'Production'
  ManagedBy: 'Bicep'
}
```

## Code Organisation

### Structure for Maintainability

```
infrastructure/
├── main.bicep              # Entry point
├── main.bicepparam         # Parameters
├── modules/
│   ├── networking.bicep    # Network resources
│   ├── compute.bicep       # Compute resources
│   └── security.bicep      # Security resources
└── types/
    └── common.bicep        # Shared type definitions
```

### Export Reusable Types

```bicep
// types/common.bicep
@export()
type tagType = {
  Environment: string
  CostCentre: string?
  Owner: string
}
```

## Linting and Validation

### Address Diagnostic Codes

Pay attention to BCP warnings:
- **BCP036/BCP037** - May indicate incorrect property names
- **BCP081** - Suggests using newer API versions
- **BCP035** - Type mismatches requiring correction

### Use Bicep Linter Configuration

```json
// bicepconfig.json
{
  "analyzers": {
    "core": {
      "rules": {
        "no-unused-params": { "level": "warning" },
        "prefer-interpolation": { "level": "warning" },
        "secure-secrets-in-params": { "level": "error" }
      }
    }
  }
}
```

## Conclusion

Following these best practices will result in Bicep code that is easier to maintain, more secure, and better aligned with the latest language capabilities. The investment in writing clean infrastructure code pays dividends as your Azure estate grows.

At Tech Design Concept, we help organisations establish Infrastructure as Code standards and implement robust deployment pipelines. [Contact us](/contact/) to discuss how we can improve your IaC practices.

---

*Want hands-on help with your Bicep templates? We offer code reviews and training sessions tailored to your team's needs.*
