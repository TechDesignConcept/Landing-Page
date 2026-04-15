---
title: "Multi-region hospitality operator - Azure landing zones and network re-architecture"
client: "Confidential - national hospitality group"
industry: "Hospitality & Travel"
duration: "4 months"
services:
 - Infrastructure Optimisation
 - DevOps & Automation
 - Security
summary: "Rebuilt the Azure foundation for a national hospitality operator: Cloud Adoption Framework landing zones, Virtual WAN across multiple regions, and a full Bicep/CI-CD transformation that turned environment rebuilds from days into minutes."
metrics:
 - "3|×|regions connected"
 - "15|+|subscriptions governed"
 - "100|%|IaC-managed"
---

## Challenge

A national hospitality operator with sites spread across multiple regions had outgrown its original Azure environment. Networking was a tangle of point-to-point peerings, governance was applied inconsistently across subscriptions, and every deployment was a click-through in the portal. Application teams couldn't move quickly, and the security team couldn't prove compliance.

## Approach

We rebuilt the foundation from the ground up, aligned to the Azure Cloud Adoption Framework. New landing zones provided VNets, Key Vaults, and core shared services with governance baked in - Azure Policy for tagging, encryption, and cost control, Log Analytics for centralised ingestion, RBAC for least-privilege access.

Networking was re-architected around Azure Virtual WAN, with BGP integration for Cisco Meraki appliances at site level and bulk vWAN peering simplifying a previously brittle multi-region routing mesh. Secure traffic management - Azure Firewall and Application Gateway with WAF - replaced ad-hoc controls.

Everything was moved into Bicep modules and deployed through CI/CD pipelines. Function Apps and Web Apps were transitioned onto IaC as part of the same programme, and containerised workloads were migrated onto AKS with monitoring, scaling, and security configured consistently across environments.

## Outcome

The operator now has a standardised, policy-enforced Azure estate that application teams can deploy into confidently. New-environment provisioning dropped from multi-day manual work to minutes via pipeline. The platform team kept ownership of the IaC modules at handover and has continued to extend them for new regions and workloads.
