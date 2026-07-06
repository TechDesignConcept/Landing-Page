---
layout: post
title: "What VSA6 Means for APS Azure Delivery"
date: 2026-07-06
author: "Joshua Argy"
image: "/assets/imgs/azure-policy-governance.png"
excerpt: "VSA6 commenced on 1 July 2026 and locks the Australian Public Service into the Microsoft stack for five years. Here is what actually changes for agency platform teams, and what to do about it in the first 90 days."
tags: [azure, vsa6, government, governance, landing-zones]
---

# What VSA6 Means for APS Azure Delivery

On 1 July 2026, VSA6 commenced: the sixth iteration of the Commonwealth's whole-of-government volume sourcing arrangement with Microsoft, signed by the Digital Transformation Agency on behalf of all non-corporate Commonwealth entities. It is a five-year agreement covering Microsoft 365, Azure, Dynamics 365, Copilot, and Microsoft's security and identity services ([DTA announcement](https://www.dta.gov.au/articles/dta-signs-new-5-year-agreement-microsoft-delivering-value-and-innovation-australian-government)).

Most of the commentary so far has been about licensing and price caps. That matters, but if you run a platform team inside an agency, the licensing story is not the interesting part. The interesting part is what a five-year commitment to the stack does to your delivery priorities.

## The strategic read in one paragraph

Your agency is now committed to Azure, M365, and Copilot until 2031. The question "which cloud" is settled; the question that remains is "how well". Agencies that treat VSA6 as a procurement event will spend five years accumulating tenant sprawl and audit findings. Agencies that treat it as a platform event will use the certainty to justify the foundational work that never quite made the priority list: a governed landing zone, policy-as-code, an identity baseline, and a Copilot rollout that the ISM and the auditors can live with.

## What actually changes

**1. Cost certainty changes the business case arithmetic.** VSA6 brings stable pricing, improved discounts, and capped increases across the term ([iTnews coverage](https://www.itnews.com.au/news/dta-signs-sixth-iteration-of-microsoft-licensing-deal-623893)). Five-year price visibility means platform investments amortise predictably. The landing zone build you could not justify against an uncertain licensing future is now a straightforward five-year value calculation.

**2. Reservations-based licensing demands governance discipline.** The transition to agency-specific, reservations-based licensing is significant enough that the Commonwealth has funded a dedicated mobilisation service to help agencies through it. Reservations reward accurate forecasting, and accurate forecasting requires the things good platforms have anyway: subscription hygiene, cost tagging that actually gets enforced, budgets with alerts, and a management group structure that maps to how money is allocated. If your tagging policy is aspirational, reservations will make that expensive.

**3. Copilot at APS scale is a governance problem before it is a productivity one.** VSA6 puts Copilot within procurement reach of every agency. The gap between "licensed" and "safely deployed" is where most agencies will stall: Purview sensitivity labels, DLP policies, SharePoint permission hygiene, and audit logging are prerequisites, not afterthoughts. The Essential Eight does not stop applying because the tooling is exciting.

**4. Security and identity services get a longer runway.** With Defender, Sentinel, and Entra covered under the arrangement, the perennial "should we consolidate on the Microsoft security stack" debate has a five-year answer. That makes tenant-wide Defender coverage and a properly wired Sentinel deployment the default architecture, and it makes policy-as-code the only sane way to keep both aligned across a multi-subscription estate.

## The first-90-days checklist for platform teams

1. **Map your management group hierarchy against how VSA6 licensing will be reserved and reported.** If subscriptions do not map cleanly to funding lines, fix the structure before the first reservation cycle, not after.
2. **Get the policy baseline out of the wiki and into code.** Tagging, location restrictions, diagnostic settings, encryption, SKU controls. Deployed via pipeline, auditable in the repo.
3. **Baseline your Copilot readiness honestly.** Purview labels, DLP coverage, sharing settings. A readiness gap analysis costs days; an incident costs a news cycle.
4. **Wire the cost model now.** Budgets, alerts, and enforced cost tags across every subscription, so reservation forecasting is a query rather than a project.
5. **Treat the five-year horizon as permission to do it properly.** The usual argument against foundational work ("we might change direction") is gone.

## Where agencies will need help

The honest version: most agency platform teams are underweight for this. The work is well understood, but it is specialist work, and the panel incumbents that win volume licensing engagements are rarely the teams you want writing your Azure Policy baseline. The white space is hands-on-keyboard delivery: landing zones, policy-as-code, and governed Copilot enablement, delivered so the internal team can run the platform afterwards.

That is the work Tech Design Concept does. Our [Secure Landing Zones offer](/offers/secure-landing-zone/) is a fixed-price, three-week, Cloud Adoption Framework-aligned foundation delivered as Bicep in your repo, and our track record includes a [state government secure network foundation](/work/state-government-secure-network/) delivered with 100% Bicep-managed policies.

## Where to next

- **The follow-up post:** [Landing zones for VSA6 tenancies](/blog/landing-zones-for-vsa6-tenancies/) covers the architecture specifics.
- **The offer:** [Secure Landing Zones](/offers/secure-landing-zone/), fixed price, three weeks, full handover.
- **The proof:** [State government secure network foundation](/work/state-government-secure-network/), delivered in 10 weeks.

*Sources: [DTA: five-year agreement with Microsoft](https://www.dta.gov.au/articles/dta-signs-new-5-year-agreement-microsoft-delivering-value-and-innovation-australian-government), [iTnews: DTA signs sixth iteration of Microsoft licensing deal](https://www.itnews.com.au/news/dta-signs-sixth-iteration-of-microsoft-licensing-deal-623893).*
