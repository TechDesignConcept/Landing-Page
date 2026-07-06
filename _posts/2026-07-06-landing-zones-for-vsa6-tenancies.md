---
layout: post
title: "Landing Zones for VSA6 Tenancies: An Architecture Guide"
date: 2026-07-06
author: "Joshua Argy"
image: "/assets/imgs/azure-landing-zones.png"
excerpt: "A five-year commitment to Azure deserves a foundation built once, properly. What a Cloud Adoption Framework landing zone looks like for an agency operating under VSA6: management groups, policy baseline, identity, logging, and cost structure."
tags: [azure, landing-zones, vsa6, government, caf, bicep]
---

# Landing Zones for VSA6 Tenancies: An Architecture Guide

The [previous post](/blog/what-vsa6-means-for-aps-azure-delivery/) covered what VSA6 changes strategically for APS platform teams. This one is the practitioner's view: what the Azure foundation should actually look like for an agency that now has a five-year commitment to the stack, and where the standard Cloud Adoption Framework guidance needs agency-specific interpretation.

None of this is exotic. It is the Cloud Adoption Framework applied with discipline, expressed as Bicep, and shaped by the realities of Commonwealth funding structures, the ISM, and the Essential Eight.

## Management groups: map to funding, not org charts

The classic mistake is a management group hierarchy that mirrors the org chart. Org charts change with every Machinery of Government event; funding structures and workload archetypes are more stable. Under VSA6's reservations-based licensing, the hierarchy earns its keep when cost reporting and licence reservation both fall naturally out of the subscription structure.

The pattern that works: a platform tier (identity, management, connectivity subscriptions), a landing zones tier segmented by workload archetype and classification (corporate, online, and where relevant a segregated tier for higher-classification work), plus sandbox and decommissioned tiers. Keep it shallow. Three levels of management group below the tenant root is almost always enough; every additional level is a place for policy inheritance surprises to hide.

## The policy baseline: Essential Eight pressure-tested

Agencies do not get to treat Azure Policy as optional decoration. The baseline that survives contact with an audit:

- **Tagging enforcement** (cost centre, owner, classification, environment) as deny or modify effects, not audit-only. Reservations forecasting depends on this being real.
- **Location restrictions** pinned to Australian regions, applied at the top of the landing zones tier.
- **Diagnostic settings deployed by policy** to a central Log Analytics workspace, so Sentinel sees everything without per-team goodwill.
- **Encryption and SKU controls** covering storage, SQL, and the compute SKUs that bypass your hardening pipeline.
- **Deployment guardrails aligned to Essential Eight intent**: restricting public network exposure, enforcing managed identities over keys, and blocking the legacy authentication paths that user application hardening is supposed to have killed.

Express the entire baseline as code. A policy catalogue in a repo, with initiative assignments deployed by pipeline, is auditable in a way a portal screenshot never is. This is exactly how we delivered a [state government secure network foundation](/work/state-government-secure-network/): 100% of policies Bicep-managed.

## Identity: the baseline nobody wants to retrofit

Entra ID work is the least glamorous and most consequential part of the foundation. The VSA6-era minimum: PIM for all privileged roles with approval workflows on the highest tiers, break-glass accounts that are documented, monitored, and tested, conditional access policies as code (deployable, reviewable, versioned), and per-workload managed identities so that secrets do not become the connective tissue of the estate.

Do this before workload teams arrive. Retrofitting PIM onto a tenant with forty standing Owner assignments is a change-management project; building it into the foundation is a sprint.

## Logging and the Sentinel decision

With Microsoft's security stack covered under the arrangement, the default architecture is a central Log Analytics workspace receiving platform diagnostics, with Sentinel enabled and data connectors wired for Entra, Defender for Cloud, activity logs, and the workloads that matter. The design decisions that need adult supervision are retention tiers (analytics vs basic vs archive, because five years of hot retention is a budget incident), table-level transformation to keep ingestion costs sane, and a clear separation between what the platform team monitors and what a SOC consumes.

## Cost structure for the reservations era

Reservations-based licensing rewards agencies that can forecast. The foundation work that makes forecasting a query instead of a project: budgets with alerting at subscription and management group scope, enforced cost tags (see the policy baseline), a consistent subscription vending pattern so new workloads land governed rather than feral, and a monthly cost review ritual that takes thirty minutes because the structure did the work.

## Sequencing: the three-week shape

The uncomfortable truth about landing zones is that the design space is well explored. An experienced team deploying an opinionated, CAF-aligned pattern can stand up the foundation in weeks: architecture and sign-off in week one, full Bicep deployment of management groups, policies, identity baseline, networking, and logging in week two, knowledge transfer and handover in week three. What makes it fast is not corner-cutting; it is that the pattern is proven and the IaC already exists.

That three-week shape is precisely what our [Secure Landing Zones offer](/offers/secure-landing-zone/) packages: fixed price, CAF-aligned, delivered as Bicep in your repo, with your team running it afterwards. For agencies that want ongoing senior oversight without a hire, the [Fractional Cloud Governance Lead](/offers/fractional-governance-lead/) retainer picks up where handover ends.

## Where to next

- **The strategic view:** [What VSA6 means for APS Azure delivery](/blog/what-vsa6-means-for-aps-azure-delivery/).
- **The offer:** [Secure Landing Zones](/offers/secure-landing-zone/), a fixed-price foundation in three weeks.
- **The proof:** [State government secure network foundation](/work/state-government-secure-network/) and [state health cloud security uplift](/work/state-health-cloud-security/).
