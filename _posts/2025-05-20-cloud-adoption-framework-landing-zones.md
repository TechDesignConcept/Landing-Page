---
layout: post
title: "Azure Landing Zones: Your Foundation for Enterprise Cloud Adoption"
date: 2025-05-20
author: "Joshua Argy"
image: "/assets/imgs/azure-landing-zones.png"
excerpt: "Understand how Azure Landing Zones from the Cloud Adoption Framework provide a scalable, secure foundation for enterprise workloads."
tags: [azure, caf, cloud-adoption-framework, landing-zones, enterprise]
---

# Azure Landing Zones: Your Foundation for Enterprise Cloud Adoption

One of the most common mistakes I see organisations make when adopting Azure is jumping straight into deploying workloads without establishing proper foundations. Azure Landing Zones, part of the Cloud Adoption Framework (CAF), provide a proven architecture for building that foundation right from the start.

## What Is a Landing Zone?

A Landing Zone is a pre-configured Azure environment that provides:

- **Identity and access management** through Entra ID integration
- **Network topology** with hub-spoke or Virtual WAN architectures
- **Governance** via management groups, policies, and RBAC
- **Security baseline** with Microsoft Defender and logging
- **Cost management** through budgets and alerts

Think of it as the infrastructure equivalent of a well-prepared building site -everything is ready for construction to begin safely and efficiently.

## The CAF Landing Zone Architecture

The Cloud Adoption Framework defines a conceptual architecture that scales from small deployments to enterprise-scale implementations.

### Key components:
- **Management groups** for hierarchical governance
- **Platform subscriptions** for shared services (connectivity, identity, management)
- **Landing zone subscriptions** for workloads (corp, online)
- **Sandbox subscriptions** for experimentation
- **Policy-driven governance** enforcing compliance at scale

### Management group hierarchy:
```
Tenant Root Group
└── Your Organisation
    ├── Platform
    │   ├── Identity
    │   ├── Management
    │   └── Connectivity
    ├── Landing Zones
    │   ├── Corp (internal workloads)
    │   └── Online (internet-facing)
    ├── Sandbox
    └── Decommissioned
```

## Implementation Approaches

There are several ways to deploy Azure Landing Zones, depending on your requirements:

### 1. Azure Portal Accelerator
Best for organisations wanting a guided, UI-based deployment experience.
- Quick to deploy
- Limited customisation
- Good for getting started

### 2. Bicep/Terraform Modules
Best for organisations with Infrastructure as Code maturity.
- Full customisation
- Version controlled
- Integrates with CI/CD pipelines

### 3. Azure Verified Modules
Best for those wanting production-ready, maintained modules.
- `avm/ptn/lz/sub-vending` for subscription automation
- `avm/ptn/alz/empty` for Landing Zone foundations
- Community-supported and regularly updated

## Key Design Decisions

When implementing Landing Zones, you'll need to make several important decisions:

### Network topology:
- **Hub-spoke** for simpler requirements and lower cost
- **Virtual WAN** for global connectivity and scale

### Identity:
- **Entra ID only** for cloud-native organisations
- **Hybrid** with Entra ID Connect for on-premises integration

### Governance:
- **Centralised** for consistent control
- **Federated** for business unit autonomy with guardrails

### Security:
- **Defence in depth** with multiple security layers
- **Zero Trust** principles for modern security posture

## Subscription Vending

One of the most powerful patterns in Landing Zones is subscription vending -automating the creation and configuration of new subscriptions.

### Benefits of subscription vending:
- **Consistency** across all deployed subscriptions
- **Speed** in provisioning new environments
- **Compliance** through policy assignment at creation
- **Self-service** enabling teams to request their own subscriptions

The `avm/ptn/lz/sub-vending` module makes this straightforward to implement with Bicep.

## Common Pitfalls to Avoid

### Implementation mistakes:
- **Skipping the foundation** and deploying workloads first
- **Over-engineering** for current scale rather than future needs
- **Under-investing in governance** leading to sprawl and compliance issues
- **Ignoring networking design** causing connectivity problems later
- **Not planning for hybrid** when on-premises integration is required

## Conclusion

Azure Landing Zones provide the foundation that every enterprise Azure deployment needs. By investing time in proper foundations, you'll avoid costly rework and ensure your cloud environment can scale securely and efficiently.

At Tech Design Concept, we help organisations design and implement Landing Zones tailored to their specific requirements. Whether you're starting fresh or looking to improve an existing deployment, [contact us](/contact/) to discuss your cloud foundation strategy.

---

*Next in this series: Deep-diving into networking design decisions for Azure Landing Zones.*
