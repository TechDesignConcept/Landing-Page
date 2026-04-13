---
title: "Global mining major — post-acquisition application integration"
client: "Confidential — ASX-listed resources company"
industry: "Mining & Resources"
duration: "8 months"
services:
  - Cloud Migration
  - DevOps & Automation
  - Security
summary: "Integrated 112+ business applications from an acquired subsidiary into the parent Azure estate in eight months, using a standardised landing-zone pattern that cut downstream tracking errors by roughly 70%."
featured: true
metrics:
  - "112|+|applications integrated"
  - "8|mo|end-to-end delivery"
  - "70|%|fewer tracking errors"
---

## Challenge

Following a major acquisition, more than 112 business applications had to be lifted out of the subsidiary's environment and integrated into the parent group's Azure estate — on a tight programme deadline, under strict security and compliance controls, and without disrupting operational systems across active industrial sites.

The inherited estate was heterogeneous: a mix of legacy VM workloads, SaaS integrations, and application-specific networking requirements. Each application had its own owner, its own release cadence, and its own definition of "done."

## Approach

We designed a repeatable landing-zone pattern in Bicep aligned to the Azure Cloud Adoption Framework, so every migrated application dropped into a known-good security and networking baseline. Identity was consolidated on Entra ID with Conditional Access and Defender for Cloud enabled across every in-scope subscription from day one.

Delivery ran on Azure DevOps pipelines promoting through dev / UAT / prod, with Azure Policy enforcing tagging, encryption, and diagnostic settings automatically. A Power App backed by SharePoint replaced spreadsheet-based runbook handover, giving the programme team a single source of truth and cutting the error rate on application status reporting by roughly 70%.

Workloads were grouped into migration waves, and each wave followed the same track: discovery, landing-zone prep, pilot cutover, full cutover, and stabilisation. FinOps guardrails were built in from the start so cost anomalies surfaced immediately rather than at month-end.

## Outcome

All 112+ applications were integrated inside the eight-month window, on time and without a material production incident. The landing-zone pattern became the reference implementation for subsequent Azure work across the group. The parent company's platform team took over operations at handover, supported by the runbooks, pipelines, and documentation we left behind.
