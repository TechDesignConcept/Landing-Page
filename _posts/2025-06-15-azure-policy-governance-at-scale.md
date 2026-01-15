---
layout: post
title: "Azure Policy: Implementing Governance at Scale"
date: 2025-06-15
author: "Josh"
image: "/assets/imgs/azure-policy-governance.png"
excerpt: "Learn how to use Azure Policy effectively to enforce compliance, prevent misconfigurations, and maintain governance across your Azure estate."
tags: [azure, governance, policy, compliance, security]
---

# Azure Policy: Implementing Governance at Scale

As Azure environments grow, maintaining consistent governance becomes increasingly challenging. Azure Policy provides the mechanism to enforce organisational standards and assess compliance at scale—but only if implemented correctly.

## Understanding Azure Policy

Azure Policy evaluates resources against business rules expressed as policy definitions. When a resource doesn't comply, the policy can:

- **Audit** - Log non-compliance without blocking
- **Deny** - Prevent non-compliant resource creation
- **Modify** - Automatically remediate configurations
- **DeployIfNotExists** - Deploy dependent resources automatically
- **Append** - Add additional properties to resources

## Policy Architecture

### Policy definitions
Individual rules that evaluate specific conditions:

```json
{
  "if": {
    "allOf": [
      {
        "field": "type",
        "equals": "Microsoft.Storage/storageAccounts"
      },
      {
        "field": "Microsoft.Storage/storageAccounts/supportsHttpsTrafficOnly",
        "notEquals": true
      }
    ]
  },
  "then": {
    "effect": "deny"
  }
}
```

### Policy initiatives
Groups of related policies assigned together:
- Easier to manage than individual policies
- Can include parameters for flexibility
- Align with compliance frameworks (CIS, ISO, etc.)

### Policy assignments
Apply policies or initiatives to specific scopes:
- Management groups (broadest scope)
- Subscriptions
- Resource groups (narrowest scope)

## Essential Policies for Every Organisation

### Security policies:
- Require secure transfer (HTTPS) for storage accounts
- Enforce TLS 1.2 minimum for web applications
- Deny public IP addresses on network interfaces
- Require encryption at rest for databases
- Enforce managed identities over stored credentials

### Cost management policies:
- Restrict allowed VM SKUs
- Deny expensive service tiers in non-production
- Require cost centre tags on all resources
- Limit allowed Azure regions

### Operational policies:
- Require specific tags on resources
- Enforce diagnostic settings for logging
- Deny resources without backup configuration
- Require specific naming conventions

## Implementation Best Practices

### Start with audit mode:
1. Deploy policies in audit mode first
2. Review compliance reports
3. Remediate existing resources
4. Switch to deny mode once compliant

### Use management group hierarchy:
- Assign broad policies at higher levels
- Use exclusions sparingly
- Apply stricter policies at lower scopes where needed

### Leverage built-in policies:
Microsoft provides hundreds of built-in policies covering common scenarios. Review these before creating custom policies.

### Test thoroughly:
- Test policies in sandbox environments
- Verify policies don't block legitimate deployments
- Document any exclusions and their justifications

## Policy as Code

Manage policies through Infrastructure as Code for:
- Version control and change tracking
- Peer review of policy changes
- Automated testing and deployment
- Consistency across environments

### Using Azure Verified Modules:

```bicep
module policyAssignment 'br/public:avm/ptn/authorization/policy-assignment:0.5.3' = {
  name: 'requireTagsAssignment'
  params: {
    name: 'require-cost-centre-tag'
    displayName: 'Require Cost Centre Tag'
    policyDefinitionId: '/providers/Microsoft.Authorization/policyDefinitions/...'
    parameters: {
      tagName: {
        value: 'CostCentre'
      }
    }
  }
}
```

## Compliance Reporting

### Azure Policy compliance dashboard:
- Overall compliance percentage
- Non-compliant resources by policy
- Compliance trends over time

### Integration options:
- Export to Log Analytics for custom reporting
- Power BI dashboards for executive visibility
- Automated alerts for compliance changes

## Common Pitfalls

### Mistakes to avoid:
- **Deploying deny policies without testing** - Block legitimate work
- **Too many individual assignments** - Complex to manage
- **Ignoring exemptions** - Losing track of exceptions
- **Not reviewing built-in policies** - Reinventing the wheel
- **Skipping remediation** - Existing resources remain non-compliant

## Conclusion

Azure Policy is essential for maintaining governance as your Azure environment scales. By starting with audit mode, leveraging built-in policies, and managing policies as code, you can implement effective governance without impeding development velocity.

At Tech Design Concept, we help organisations design and implement Azure governance frameworks that balance control with agility. [Contact us](/contact/) to discuss your governance requirements.

---

*Next up: Implementing tagging strategies that actually work in enterprise environments.*
