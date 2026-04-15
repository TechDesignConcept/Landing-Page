---
title: "State government agency - secure Azure network architecture"
client: "Confidential - state government agency"
industry: "Government"
duration: "10 weeks"
services:
 - Security Solutions
 - Infrastructure Optimisation
summary: "Designed and implemented the secure network architecture for a state government Azure tenancy: VNet segmentation, Azure Firewall and Application Gateway/WAF, Front Door global load balancing, and Bicep-managed policy controls."
metrics:
 - "3|×|defence layers"
 - "100|%|WAF coverage"
 - "100|%|Bicep-managed"
---

## Challenge

A state government agency was standing up new citizen-facing services on Azure and needed a network architecture that met whole-of-government security expectations out of the gate. The existing setup was flat - everything talked to everything, public endpoints were exposed directly to the internet, and logging was sparse enough that an incident review would have struggled.

## Approach

We designed a layered ingress pattern: Azure Front Door at the edge for global load balancing and WAF, Application Gateway behind it for regional traffic management and a second WAF layer for defence in depth, and Azure Firewall governing east-west traffic between segmented VNets.

VNet peering and subnet segmentation gave each workload its own blast radius, with explicit rules for who could talk to whom. RBAC and Key Vault replaced shared-secret patterns that had crept in during earlier projects. Every network control was expressed in Bicep and deployed through CI/CD pipelines, so drift between design and reality became a pipeline-detectable problem rather than a post-incident discovery.

Logging was centralised into Log Analytics with retention aligned to the agency's records management policy, and Sentinel detection content was stood up on top of it so the security team had visibility from day one.

## Outcome

Citizen-facing services went live behind a defensible, auditable network architecture. The pattern became a reusable reference for subsequent workloads inside the agency. Incidents that would previously have required forensic log-hunting now have traceable paths through Front Door, App Gateway, and Firewall logs - and the IaC-first approach means rebuilding any of it is a pipeline run, not a ticket queue.
