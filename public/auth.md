# auth.md — Agent Registration & Authentication Policy

## Overview

London Screen Hire — https://www.londonscreenhire.com/

This document defines the agent registration, authentication, and access policy for AI agents, crawlers, and automated assistants interacting with London Screen Hire resources.

## Public Access & Registration Policy

All site content, service specifications, pricing forms, and AI discovery endpoints on this site are **publicly accessible**.

- **Agent Registration Required**: No (`register_uri`: `null`)
- **Identity Types Supported**: `anonymous`, `public`
- **Credential Types Supported**: `none`
- **Claim URL / URI**: `null`
- **Revocation URL / URI**: `null`

No registration, authentication, API keys, or OAuth bearer tokens are required for agents to read content, fetch Markdown representations, or submit public quote requests.

## Autonomous & Crawling Rules

Agents may freely crawl, index, and query all public endpoints in accordance with `/robots.txt` preferences:

```
Content-Signal: ai-train=no, search=yes, ai-input=no
```

## Discovery & OAuth Metadata Endpoints

- **OAuth Protected Resource Metadata**: `/.well-known/oauth-protected-resource`
- **OAuth Authorization Server Metadata**: `/.well-known/oauth-authorization-server`
- **Agent Skills Discovery Index**: `/.well-known/agent-skills/index.json`
- **DNS-AID Discovery Index**: `/.well-known/agents`

## Contact & Support

For technical enquiries, email: info@londonscreenhire.com  
Or submit a request via: https://www.londonscreenhire.com/#quote

## Agent Auth Configuration Block

```json
{
  "agent_auth": {
    "skill": "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md",
    "register_uri": null,
    "identity_types_supported": ["anonymous", "public"],
    "credential_types_supported": ["none"],
    "anonymous": {
      "credential_types_supported": ["none"],
      "claim_uri": null
    },
    "identity_types": ["anonymous", "public"],
    "credential_types": ["none"],
    "claim_uri": null,
    "claim_url": null,
    "revocation_uri": null,
    "revocation_url": null,
    "notes": "No agent registration required. All site resources and AI discovery endpoints are publicly accessible."
  }
}
```
