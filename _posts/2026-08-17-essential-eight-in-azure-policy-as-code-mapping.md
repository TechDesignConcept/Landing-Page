---
layout: post
title: "Essential Eight in Azure: A Policy-as-Code Mapping"
date: 2026-08-17
author: "Joshua Argy"
image: "/assets/imgs/azure-policy-governance.png"
excerpt: "The Essential Eight was written for endpoints, not cloud platforms. An honest mapping of each mitigation strategy to Azure-native controls, expressed as policy-as-code rather than compliance theatre."
tags: [azure, essential-eight, governance, policy, security, bicep]
---

# Essential Eight in Azure: A Policy-as-Code Mapping

Let's start with the honesty that makes the rest of this post useful: the Essential Eight is an endpoint-centric framework. It was designed by the ACSC to harden workstations and servers against commodity intrusion, and its maturity model reads that way. Anyone selling you "Essential Eight compliance for Azure" as a checkbox product is selling translation errors.

What a cloud platform team can legitimately do is map the intent of each mitigation strategy onto the Azure estate, implement that intent as code, and be precise about which controls live where. That precision is exactly what an assessor respects and what an auditor can verify. Here is the mapping we use, strategy by strategy.

## The eight, translated

**1. Application control.** On the platform, the analogue is controlling what runs: Defender for Cloud adaptive application controls for IaaS, and policy denying unapproved compute SKUs and extensions. For PaaS-heavy estates, the control shifts to deployment gates: only pipeline-deployed, reviewed artefacts reach production.

**2. Patch applications.** Azure-side, this is Defender vulnerability assessment wired into the operating rhythm, update management for IaaS, and, more structurally, the platform habit that beats patching: rebuild from code instead of nursing pets. Image currency enforced by policy, stale-image deployments denied.

**3. Configure Microsoft Office macro settings.** Genuinely an M365 and Intune control, and pretending otherwise is the kind of mapping dishonesty this post exists to avoid. The platform contribution is making sure the policy exists as managed configuration, not tenant folklore.

**4. User application hardening.** Mostly endpoint again, with a real platform edge: hardening exposed application surfaces. Policy denying public network access on PaaS services, enforcing TLS minimums, and requiring WAF on internet-facing entry points.

**5. Restrict administrative privileges.** The strategy where Azure work carries the most weight. PIM for all privileged roles with approval on the highest tiers, deny-by-policy on classic administrators, no standing Owner assignments, break-glass accounts monitored by Sentinel analytics rules, and conditional access as code. If you implement one strategy properly this quarter, make it this one.

**6. Patch operating systems.** As per applications: update management, vulnerability findings with owner and deadline, and image pipelines that make "rebuild" cheaper than "remediate in place".

**7. Multi-factor authentication.** Conditional access policies requiring phishing-resistant MFA for privileged roles and MFA everywhere else, deployed as configuration with version history. The policy-as-code angle matters because conditional access drift is invisible until an incident review finds the exclusion someone added in a hurry.

**8. Regular backups.** Azure Backup with policy-enforced coverage (deny unprotected VMs in scoped landing zones), immutability where the classification warrants it, and restore testing on a calendar, because a backup you have never restored is a hypothesis.

## Why policy-as-code is the delivery mechanism

Every control above can be clicked into existence and drift out of existence just as quietly. The difference between a hardening project and a hardened platform is where the controls live:

- **Azure Policy initiatives in a repository**, assigned by pipeline, with the policy catalogue readable by an assessor.
- **What-if and compliance checks in the deployment gate**, so a change that weakens the baseline fails review before it ships.
- **Drift as a detectable event**: non-compliant resources surface in dashboards and Sentinel, not in the next audit's findings list.

This is the pattern we shipped for a [state government secure network foundation](/work/state-government-secure-network/), where 100% of policies are Bicep-managed, and it is the default posture of our [Secure Landing Zones offer](/offers/secure-landing-zone/): a baseline of deployment guardrails aligned to Essential Eight intent, delivered as code with a catalogue your auditor can read.

## The maturity conversation to have instead

The productive question is rarely "are we Essential Eight compliant in Azure". It is: for each strategy, where does the control actually live (endpoint, M365, Azure platform), what maturity is genuinely required by our threat model, and can we evidence the control from configuration rather than assertion? Answer those three honestly and the assessment stops being adversarial.

## Where to next

- **The offer:** [Secure Landing Zones](/offers/secure-landing-zone/), with an Essential Eight-intent policy baseline as code.
- **The proof:** [State government: secure network foundation](/work/state-government-secure-network/), 100% Bicep-managed policies.
- **Related:** [Secure Copilot enablement under the Essential Eight](/blog/secure-copilot-enablement-under-the-essential-eight/) and [Azure Policy: governance at scale](/blog/azure-policy-governance-at-scale/).
