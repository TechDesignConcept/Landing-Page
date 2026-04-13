---
title: "National agricultural authority — data platform migration"
client: "Confidential — Commonwealth statutory authority"
industry: "Government · Agriculture"
duration: "3 months"
services:
  - Data Solutions
  - Cloud Migration
summary: "Migrated a national agricultural authority's reporting databases to Azure SQL and built automated ETL pipelines feeding Power BI — replacing hand-run VBA exports with a scheduled, observable data platform."
metrics:
  - "4|+|data sources integrated"
  - "6|×|Power BI dashboards"
  - "100|%|automated ETL"
---

## Challenge

A Commonwealth statutory authority responsible for an export-significant agricultural sector was generating statutory reports from a brittle chain of on-premises SQL databases and VBA macros running inside Excel. Reports were accurate only when the right person ran them in the right order. Staff turnover was making that fragile.

## Approach

We migrated the reporting databases to Azure SQL, using advanced T-SQL query optimisation during the move so the new platform was genuinely faster rather than just relocated. Backup and recovery strategies were tightened so data integrity and business continuity had a demonstrable baseline.

Azure Data Factory orchestrated ETL from the remaining on-premises systems and SaaS data sources into a curated layer in Azure, applying transformation logic consistently across runs. Power BI dashboards sat on top of the curated data, replacing the hand-run VBA exports with scheduled, observable reports.

Log Analytics captured pipeline health, and alerting surfaced failed runs before downstream stakeholders noticed missing data. The whole thing was built so a new analyst could understand how a number on a report got there.

## Outcome

Reports that previously depended on a single person now regenerate themselves on schedule. Data accessibility improved across the authority's analytical teams, and the reporting burden on operational staff dropped substantially. The platform has continued to extend — new data sources bolt onto the same ADF/ SQL/ Power BI pattern rather than spawning new tooling.
