<!-- filepath: d:\Code\web3\beaver-social\packages\server\api\docs_organized\analytics.md -->

# Analytics & Insights API

## Overview

This document outlines the API endpoints for analytics, insights, and performance metrics in the Beaver Social platform.

## Base URL

All endpoints are relative to: `/api/v1/`

## 1. User Analytics

### Base Path: `/analytics`

| Endpoint           | Method | Description                     | Query Params              | Request Body | Response                      |
| ------------------ | ------ | ------------------------------- | ------------------------- | ------------ | ----------------------------- |
| `/profile`         | GET    | Get profile analytics           | `?timeRange=7d\|30d\|90d` | -            | `{ analytics }`               |
| `/content/:id`     | GET    | Get content performance metrics | -                         | -            | `{ metrics }`                 |
| `/audience`        | GET    | Get audience insights           | `?timeRange=7d\|30d\|90d` | -            | `{ demographics, geography }` |
| `/dashboard`       | GET    | Get creator analytics dashboard | `?timeRange=7d\|30d\|90d` | -            | `{ overview, trends }`        |
| `/engagement`      | GET    | Get engagement metrics          | `?timeRange=7d\|30d\|90d` | -            | `{ engagement }`              |
| `/traffic-sources` | GET    | Get referral sources            | `?timeRange=7d\|30d\|90d` | -            | `{ sources: [] }`             |

## 2. Content Performance

### Base Path: `/analytics/content`

| Endpoint       | Method | Description                   | Query Params                       | Response                          |
| -------------- | ------ | ----------------------------- | ---------------------------------- | --------------------------------- |
| `/performance` | GET    | Get content performance stats | `?timeRange=7d\|30d\|90d&type=all` | `{ performance, topContent: [] }` |
| `/posts`       | GET    | Get post analytics            | `?timeRange=7d\|30d\|90d`          | `{ posts: [], metrics }`          |
| `/shorts`      | GET    | Get shorts analytics          | `?timeRange=7d\|30d\|90d`          | `{ shorts: [], metrics }`         |
| `/media`       | GET    | Get media performance         | `?timeRange=7d\|30d\|90d`          | `{ media: [], metrics }`          |
| `/comparison`  | GET    | Compare content performance   | `?ids=[id1,id2]`                   | `{ comparison: [] }`              |
| `/virality`    | GET    | Get virality metrics          | `?timeRange=7d\|30d\|90d`          | `{ viral: [], factors }`          |
| `/hashtags`    | GET    | Get hashtag performance       | `?timeRange=7d\|30d\|90d`          | `{ hashtags: [], effectiveness }` |

## 3. Audience Insights

### Base Path: `/analytics/audience`

| Endpoint           | Method | Description                 | Query Params              | Response              |
| ------------------ | ------ | --------------------------- | ------------------------- | --------------------- |
| `/demographics`    | GET    | Get audience demographics   | `?timeRange=7d\|30d\|90d` | `{ demographics }`    |
| `/geography`       | GET    | Get audience geography      | `?timeRange=7d\|30d\|90d` | `{ geography: [] }`   |
| `/growth`          | GET    | Get audience growth metrics | `?timeRange=7d\|30d\|90d` | `{ growth, trends }`  |
| `/activity`        | GET    | Get audience activity times | `?timeRange=7d\|30d\|90d` | `{ activity }`        |
| `/interests`       | GET    | Get audience interests      | `?limit=20`               | `{ interests: [] }`   |
| `/retention`       | GET    | Get audience retention      | `?timeRange=7d\|30d\|90d` | `{ retention }`       |
| `/followers/gains` | GET    | Get new follower analytics  | `?timeRange=7d\|30d\|90d` | `{ gained, sources }` |
| `/followers/lost`  | GET    | Get lost follower analytics | `?timeRange=7d\|30d\|90d` | `{ lost, reasons? }`  |

## 4. Export & Reporting

### Base Path: `/analytics/export`

| Endpoint        | Method | Description                  | Query Params | Request Body          | Response                  |
| --------------- | ------ | ---------------------------- | ------------ | --------------------- | ------------------------- |
| `/`             | POST   | Create analytics export      | -            | `{ type, timeRange }` | `{ exportId, expires }`   |
| `/:id`          | GET    | Get export status            | -            | -                     | `{ status, downloadUrl }` |
| `/formats`      | GET    | Get available export formats | -            | -                     | `{ formats: [] }`         |
| `/schedule`     | POST   | Schedule recurring report    | -            | `{ frequency, type }` | `{ scheduleId }`          |
| `/schedule`     | GET    | Get report schedules         | -            | -                     | `{ schedules: [] }`       |
| `/schedule/:id` | DELETE | Delete report schedule       | -            | -                     | `{ success }`             |

## Data Models

### AnalyticsProfile

```typescript
interface AnalyticsProfile {
  userId: string;
  period: "7d" | "30d" | "90d";
  impressions: number;
  profileVisits: number;
  followers: {
    total: number;
    new: number;
    lost: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    rate: number;
  };
  contentPerformance: {
    topContent: any[];
    averageEngagement: number;
  };
  demographics: {
    age: {
      ranges: string[];
      distribution: number[];
    };
    gender: {
      categories: string[];
      distribution: number[];
    };
    location: {
      countries: string[];
      distribution: number[];
    };
  };
}
```

### ContentMetrics

```typescript
interface ContentMetrics {
  id: string;
  contentId: string;
  contentType: "post" | "short" | "media";
  impressions: number;
  reach: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    clicks: number;
    rate: number;
  };
  retention: number; // For video content
  watchTime?: number; // For video content
  bounceRate?: number;
  demographics: {
    topCountries: string[];
    topAgeGroups: string[];
  };
  periodStart: string;
  periodEnd: string;
}
```

### AudienceInsights

```typescript
interface AudienceInsights {
  id: string;
  userId: string;
  period: "7d" | "30d" | "90d";
  demographics: {
    age: {
      ranges: string[];
      values: number[];
    };
    gender: {
      categories: string[];
      values: number[];
    };
    languages: {
      codes: string[];
      values: number[];
    };
  };
  geography: {
    countries: {
      codes: string[];
      values: number[];
    };
    cities: {
      names: string[];
      values: number[];
    };
    timezones: {
      names: string[];
      values: number[];
    };
  };
  interests: {
    categories: string[];
    values: number[];
  };
  onlineActivity: {
    hourly: number[];
    weekly: number[];
  };
  devices: {
    types: string[];
    values: number[];
  };
  periodStart: string;
  periodEnd: string;
}
```

### AnalyticsExport

```typescript
interface AnalyticsExport {
  id: string;
  userId: string;
  type: string;
  format: "csv" | "json" | "pdf" | "xlsx";
  status: "pending" | "processing" | "completed" | "failed";
  downloadUrl?: string;
  expiresAt: string;
  createdAt: string;
  completedAt?: string;
  parameters: {
    timeRange: string;
    filters?: any;
  };
}
```

### ReportSchedule

```typescript
interface ReportSchedule {
  id: string;
  userId: string;
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: number; // 0-6, 0 is Sunday
  dayOfMonth?: number; // 1-31
  reportType: string;
  format: "csv" | "pdf" | "xlsx";
  recipients: string[]; // Email addresses
  lastSent?: string;
  nextScheduled: string;
  createdAt: string;
  updatedAt: string;
}
```

## Implementation Considerations

1. **Performance & Scaling**

   - Implement efficient data aggregation pipelines
   - Consider time-series databases for metrics storage
   - Use background jobs for complex analytics computation
   - Apply aggressive caching for frequently accessed metrics

2. **Data Privacy**

   - Anonymize user data for aggregate analytics
   - Respect user privacy settings in analytics collection
   - Implement proper access controls for analytics data
   - Consider data retention policies for raw analytics data

3. **Real-time Analytics**

   - Design event streaming architecture for real-time metrics
   - Balance between real-time and batch processing
   - Implement efficient counters for high-volume metrics
   - Consider fan-out patterns for analytics event processing

4. **Data Visualization**

   - Provide structured data optimized for frontend visualization
   - Include metadata for proper chart formatting
   - Support common visualization patterns (time series, distribution, etc.)
   - Consider data normalization for comparative analytics

5. **Data Accuracy**

   - Implement duplicate detection for analytics events
   - Design robust error handling for analytics processing
   - Include data quality validation steps
   - Provide confidence intervals where appropriate

6. **Enterprise Features**
   - Support for scheduled reports and exports
   - Customizable dashboards and metrics
   - Advanced filtering and segmentation
   - API rate limits specific to analytics endpoints
