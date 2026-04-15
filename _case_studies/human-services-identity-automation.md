---
title: "Human services NFP - identity lifecycle automation"
client: "Confidential - national not-for-profit"
industry: "Not-for-Profit · Human Services"
duration: "6 weeks"
services:
 - Security
 - DevOps & Automation
summary: "Automated end-to-end identity lifecycle for a national human-services NFP, sourcing joiners, movers, and leavers from the HRM system and provisioning Entra ID, Jira, and line-of-business access without manual tickets."
metrics:
 - "5|+|systems automated"
 - "100|%|HRM-driven provisioning"
 - "0|%|manual tickets remaining"
---

## Challenge

A national not-for-profit delivering human services across hundreds of sites was spending hours every week processing access change tickets by hand. Joiners waited days for accounts, leavers kept access after termination, and the HR team and IT team had no shared source of truth for who should have what.

Audit findings flagged identity hygiene as a compliance risk. The NFP needed a durable fix - not another person hired into the ticket queue.

## Approach

We made the HRM system the single source of truth. Azure Logic Apps picked up joiner/mover/leaver events and drove provisioning across Entra ID, Jira, and the organisation's line-of-business systems, using each system's native API. Every run was idempotent and auditable, with results written back to a central log and alerts raised on exceptions.

Access packages and Conditional Access policies were aligned to role definitions sourced from the HRM record, so a role change in HR automatically adjusted downstream access on the next sync. Key Vault held all API credentials; RBAC kept the automation itself inside a tight blast radius.

## Outcome

Joiner access went from multi-day to same-day. Leaver de-provisioning became automatic on the termination effective date. The IT team's ticket queue for access changes dropped effectively to zero, and the NFP closed out the compliance finding that triggered the engagement. The automation has continued to run in production with only light maintenance since handover.
