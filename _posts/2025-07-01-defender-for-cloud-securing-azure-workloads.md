---
layout: post
title: "Microsoft Defender for Cloud: Securing Your Azure Workloads"
date: 2025-07-01
author: "Joshua Argy"
image: "/assets/imgs/defender-for-cloud.png"
excerpt: "Explore how Microsoft Defender for Cloud provides comprehensive security posture management and threat protection for your Azure environment."
tags: [azure, security, defender, cspm, threat-protection]
---

# Microsoft Defender for Cloud: Securing Your Azure Workloads

Security in the cloud is a shared responsibility, and Microsoft Defender for Cloud is your primary tool for understanding and improving your security posture. In this post, we'll explore how to leverage Defender for Cloud effectively.

## What Defender for Cloud Provides

Defender for Cloud offers two core capabilities:

### Cloud Security Posture Management (CSPM)
- Security recommendations based on best practices
- Secure Score to measure your security posture
- Regulatory compliance dashboards
- Attack path analysis

### Cloud Workload Protection (CWP)
- Threat detection for Azure resources
- Vulnerability assessments
- Just-in-time VM access
- Adaptive application controls

## Understanding Secure Score

Secure Score provides a quantifiable measure of your security posture, ranging from 0-100%.

### How it works:
- Each recommendation has a potential score impact
- Implementing recommendations improves your score
- Higher scores indicate better security posture
- Scores are grouped by security control

### Key security controls:
- Enable MFA
- Secure management ports
- Apply system updates
- Remediate vulnerabilities
- Enable encryption
- Restrict unauthorised network access

## Defender Plans

Defender for Cloud offers specific plans for different resource types:

| Plan | Protection Coverage |
|------|---------------------|
| Defender for Servers | VMs, Azure Arc machines |
| Defender for App Service | Web apps, API apps |
| Defender for Databases | SQL, PostgreSQL, MySQL, Cosmos DB |
| Defender for Storage | Blob, Files, Data Lake |
| Defender for Containers | AKS, container registries |
| Defender for Key Vault | Key Vault instances |
| Defender CSPM | Advanced posture management |

## Implementation Recommendations

### Enable foundational CSPM:
The free tier provides:
- Continuous security assessment
- Azure Secure Score
- Security recommendations
- Microsoft Cloud Security Benchmark

### Enable workload protection for critical resources:
Prioritise enabling paid plans for:
- Production workloads first
- Internet-facing resources
- Resources handling sensitive data
- Compliance-required resources

### Configure security contacts:
Ensure alerts reach the right people:

```bicep
resource securityContact 'Microsoft.Security/securityContacts@2020-01-01-preview' = {
  name: 'default'
  properties: {
    emails: 'security-team@contoso.com'
    alertNotifications: {
      state: 'On'
      minimalSeverity: 'Medium'
    }
    notificationsByRole: {
      state: 'On'
      roles: ['Owner', 'Contributor']
    }
  }
}
```

## Key Features to Utilise

### Just-in-Time VM Access
Reduce attack surface by closing management ports until needed:
- Request access for specific ports
- Time-limited access windows
- Audit trail of all access requests
- Integration with Azure Bastion

### Adaptive Application Controls
Whitelist applications that can run on VMs:
- Machine learning identifies normal patterns
- Alerts on unexpected executables
- Helps prevent malware execution
- Supports both Windows and Linux

### File Integrity Monitoring
Track changes to critical system files:
- Detect unauthorized modifications
- Monitor configuration files
- Track registry changes (Windows)
- Integration with Change Tracking

### Vulnerability Assessment
Identify and remediate vulnerabilities:
- Built-in Qualys scanner for VMs
- Container image scanning
- SQL vulnerability assessments
- Prioritised remediation guidance

## Integration with Azure Services

### Log Analytics:
Export Defender data for custom analysis and long-term retention.

### Microsoft Sentinel:
Connect Defender alerts to your SIEM for centralised security operations.

### Azure Policy:
Enforce Defender for Cloud configurations across subscriptions.

### Azure Automation:
Automate remediation of security recommendations.

## Best Practices

### Implementation strategies:
- **Start with Secure Score** - Focus on high-impact recommendations first
- **Enable email notifications** - Ensure alerts aren't missed
- **Review weekly** - Security posture should improve over time
- **Automate where possible** - Use Azure Policy for consistent enforcement
- **Document exceptions** - Track why certain recommendations aren't implemented

### Recommendations to prioritise:
1. Enable MFA for all accounts
2. Disable public access to storage accounts
3. Enable encryption for databases
4. Restrict network access to key vaults
5. Apply system updates regularly

## Conclusion

Microsoft Defender for Cloud is essential for any organisation serious about Azure security. By leveraging its CSPM and CWP capabilities, you can maintain visibility into your security posture and protect workloads from evolving threats.

At Tech Design Concept, we help organisations implement comprehensive security strategies using Defender for Cloud and other Azure security services. [Contact us](/contact/) to discuss your security requirements.

---

*Want to dive deeper? Our upcoming post will cover integrating Defender for Cloud with Microsoft Sentinel for advanced threat detection.*
