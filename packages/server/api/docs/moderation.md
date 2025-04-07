<!-- filepath: d:\Code\web3\beaver-social\packages\server\api\docs_organized\moderation.md -->

# Content Moderation API

## Overview

This document outlines the API endpoints for content moderation, reporting, and content policy management in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. Content Moderation & Reporting

### Base Path: `/moderation`

| Endpoint             | Method | Description                    | Query Params       | Request Body                          | Response                         |
| -------------------- | ------ | ------------------------------ | ------------------ | ------------------------------------- | -------------------------------- |
| `/reports`           | GET    | Get user's submitted reports   | `?page=1&limit=20` | -                                     | `{ reports: [], pagination }`    |
| `/reports/:id`       | GET    | Get report status              | -                  | -                                     | `{ report, status, resolution }` |
| `/report-types`      | GET    | Get available report reasons   | -                  | -                                     | `{ reportTypes: [] }`            |
| `/content-standards` | GET    | Get content policy information | -                  | -                                     | `{ policies: [] }`               |
| `/appeals`           | POST   | Appeal a moderation action     | -                  | `{ moderationId, reason, evidence? }` | `{ success, appealId }`          |
| `/appeals/:id`       | GET    | Check appeal status            | -                  | -                                     | `{ status, details, notes? }`    |

## 2. Content Flagging

### Base Path: `/flags`

| Endpoint     | Method | Description                   | Query Params       | Request Body                         | Response                      |
| ------------ | ------ | ----------------------------- | ------------------ | ------------------------------------ | ----------------------------- |
| `/`          | GET    | Get content flags             | `?page=1&limit=20` | -                                    | `{ flags: [], pagination }`   |
| `/`          | POST   | Flag content as inappropriate | -                  | `{ contentId, type, reason }`        | `{ success, flagId }`         |
| `/:id`       | GET    | Get specific flag details     | -                  | -                                    | `{ flag }`                    |
| `/:id`       | DELETE | Remove flag                   | -                  | -                                    | `{ success }`                 |
| `/types`     | GET    | Get flagging categories       | -                  | -                                    | `{ types: [] }`               |
| `/feedback`  | POST   | Provide feedback on decision  | -                  | `{ moderationId, feedback, rating }` | `{ success }`                 |
| `/reported`  | GET    | Get content reported by user  | `?page=1&limit=20` | -                                    | `{ reports: [], pagination }` |
| `/sensitive` | POST   | Mark content as sensitive     | -                  | `{ contentId, contentType }`         | `{ success }`                 |

## Data Models

### ContentReport

```typescript
interface ContentReport {
  id: string;
  userId: string; // Reporter
  contentType: "post" | "user" | "comment" | "message";
  contentId: string;
  reason: string;
  details?: string;
  status: "pending" | "reviewed" | "resolved" | "rejected";
  moderatorNotes?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
```

### ModerationAppeal

```typescript
interface ModerationAppeal {
  id: string;
  userId: string;
  moderationId: string;
  reason: string;
  evidence?: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}
```

### ContentFlag

```typescript
interface ContentFlag {
  id: string;
  userId: string;
  contentId: string;
  contentType: "post" | "comment" | "user" | "message";
  reason: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  reviewedAt?: string;
  reviewedBy?: string;
  createdAt: string;
}
```

### ContentPolicy

```typescript
interface ContentPolicy {
  id: string;
  title: string;
  description: string;
  examples: string[];
  severity: "low" | "medium" | "high" | "severe";
  category: string;
  updatedAt: string;
}
```

## Implementation Considerations

1. **Report Handling**

   - Implement efficient queuing for report review
   - Apply automated content scanning for common violations
   - Prioritize reports based on severity and reporter history
   - Create audit trail for all moderation actions

2. **Appeal Process**

   - Design fair and transparent appeals workflow
   - Implement multi-level review for contested decisions
   - Track appeal outcomes for policy improvement
   - Provide clear communication channels for appeal status

3. **User Privacy**

   - Anonymize reporter information when appropriate
   - Implement proper access controls for moderation data
   - Handle sensitive content securely during review
   - Respect jurisdictional requirements for content removal

4. **Performance & Scaling**

   - Optimize report review workflow for moderator efficiency
   - Implement caching for content policy documentation
   - Build tools for bulk moderation actions
   - Design database schema for efficient reporting analytics

5. **Community Safety**

   - Implement emergency escalation paths for severe violations
   - Create repeat offender detection systems
   - Consider user safety features like content warnings
   - Design progressive discipline system for policy violations

6. **Compliance & Legal**
   - Ensure compliance with platform legal requirements
   - Implement proper content takedown procedures
   - Support for legal hold and evidence preservation
   - Jurisdiction-specific content policy enforcement
