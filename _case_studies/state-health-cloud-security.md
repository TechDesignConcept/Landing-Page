---
title: "State health department — cloud security uplift"
client: "Confidential — state government health agency"
industry: "Healthcare · Government"
duration: "12 months"
services:
  - Security Solutions
  - Infrastructure Optimisation
summary: "Led the cloud security programme for a state health department: tenant-wide Defender for Cloud and Sentinel rollout, Entra ID hardening, vulnerability management, and policy-as-code guardrails across a sprawling multi-subscription estate."
metrics:
  - "12|mo|security programme"
  - "100|%|Defender coverage"
  - "24|×7|Sentinel monitoring"
---

## Challenge

A state health department was running a large, long-standing Azure estate built up by multiple delivery teams over several years. Security controls were inconsistent between subscriptions, vulnerability scanning was fragmented across tools, and an upcoming audit was going to expose gaps the department already knew were there.

Patient-data-adjacent workloads raised the stakes — controls had to be demonstrable, not just present.

## Approach

We treated this as a programme, not a project. Across twelve months we:

- Rolled out Defender for Cloud to every in-scope subscription, tuned the baseline, and wired recommendations into a central backlog so remediation was tracked like any other work.
- Stood up Microsoft Sentinel with Log Analytics as the central workspace, ingesting activity logs, diagnostic settings, and key application logs, and built detection content aligned to the MITRE ATT&CK coverage the department had committed to.
- Hardened Entra ID — Conditional Access, privileged access management, break-glass accounts — with named approvers and documented procedures rather than tribal knowledge.
- Integrated Tenable for vulnerability scanning across cloud and on-premises footprint, and wired findings into the same remediation backlog so nothing fell through the gap between tools.
- Codified the baseline in Azure Policy and deployed it through Bicep, so new subscriptions inherited the controls automatically.

## Outcome

The department entered its audit with evidence, not excuses. Critical findings closed out, coverage gaps documented with remediation plans, and a running programme the internal team could sustain after handover. Defender, Sentinel, and the policy baseline remain in production.
