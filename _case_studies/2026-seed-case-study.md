---
title: "BHP — OZ Minerals application integration"
client: "BHP"
industry: "Mining & Resources"
duration: "8 months"
services:
  - Cloud Migration
  - DevOps & Automation
  - Security
summary: "Integrated 112+ applications from the OZ Minerals acquisition into BHP's Azure estate in eight months, with a standardised landing-zone pattern that cut downstream tracking errors by 70%."
featured: true
metrics:
  - "112|+|applications integrated"
  - "8|mo|end-to-end delivery"
  - "70|%|fewer tracking errors"
---

## Challenge

Following BHP's acquisition of OZ Minerals, more than 112 business applications needed to be lifted out of the OZ Minerals environment and integrated into BHP's Azure estate — on a tight programme deadline, under strict security and compliance controls, and without disrupting operational systems across active mining sites.

The inherited estate was heterogeneous: a mix of legacy VM workloads, SaaS integrations, and application-specific networking requirements. Each app had its own owner, its own release cadence, and its own definition of "done."

## Approach

We designed a repeatable landing-zone pattern in Bicep aligned to the Azure Verified Modules standard, so every migrated application dropped into a known-good security and networking baseline. Identity was consolidated on Entra ID, with Conditional Access and Defender for Cloud enabled across every in-scope subscription from day one.

Delivery ran on GitHub Actions pipelines promoting through dev / UAT / prod, with Azure Policy enforcing tagging, encryption, and diagnostic settings automatically. A central tracking system replaced the spreadsheet-based handover process — cutting the error rate on application status reporting by roughly 70% and giving the programme team a single source of truth.

Workloads were grouped into migration waves and each wave followed the same track: discovery, landing-zone prep, pilot cutover, full cutover, and stabilisation. FinOps guardrails were built in from the start so cost anomalies surfaced immediately rather than at month-end.

## Outcome

All 112+ applications were integrated inside the eight-month window, on time and without a material production incident. The landing-zone pattern became the reference implementation for subsequent BHP Azure work. The engagement was recognised with an internal award for programme delivery, and BHP's platform team took over operations at handover, supported by the runbooks, pipelines, and documentation we left behind.
