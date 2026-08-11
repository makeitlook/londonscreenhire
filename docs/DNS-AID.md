# DNS for AI Discovery (DNS-AID) Setup & Deployment Guide

This document provides complete instructions for publishing DNS for AI Discovery (DNS-AID) records under `_agents.londonscreenhire.com`, signing the zone with DNSSEC, and verifying agent discoverability.

## Specifications & References

- **DNS-AID Specification**: [draft-mozleywilliams-dnsop-dnsaid](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
- **RFC 9460**: [Service Binding and HTTPS Resource Records in DNS (SVCB and HTTPS RRs)](https://www.rfc-editor.org/rfc/rfc9460)
- **Agent Discovery Scanner**: [isitagentready.com](https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md)

---

## 1. Well-Known Entrypoint Records

DNS-AID publishes ServiceMode `HTTPS` (RR Type 65) or `SVCB` (RR Type 64) records in your domain's `_agents` namespace.

### Record Overview

| Entrypoint | Domain Name | Target | SvcPriority | Purpose |
|---|---|---|---|---|
| **Index Record** | `_index._agents.londonscreenhire.com.` | `londonscreenhire.com.` | `1` | Discovers primary agent index (`/.well-known/agents`) |
| **Agent-to-Agent (A2A)** | `_a2a._agents.londonscreenhire.com.` | `londonscreenhire.com.` | `1` | Discovers agent skills index (`/.well-known/agent-skills/index.json`) |

---

## 2. DNS Zone Record Formats

### Standard BIND Zone File Format (`dns/dns-aid.zone`)

```zone
; DNS-AID Discovery Index Record (HTTPS Mode)
_index._agents.londonscreenhire.com. 3600 IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agents"

; DNS-AID Agent-to-Agent / Skills Record (HTTPS Mode)
_a2a._agents.londonscreenhire.com.   3600 IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agent-skills/index.json"

; Alternative SVCB Mode Record
_a2a._agents.londonscreenhire.com.   3600 IN SVCB  1 londonscreenhire.com. alpn="a2a" port=443 mandatory=alpn,port
```

### Experimental / Raw SvcParamKey Format

When DNS management tools require raw numeric `keyNNNNN` SvcParamKeys for unregistered experimental parameters:

```zone
; Custom endpoint parameter using experimental key space (key65200)
_index._agents.londonscreenhire.com. 3600 IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" key65200="/.well-known/agents"
_a2a._agents.londonscreenhire.com.   3600 IN HTTPS 1 londonscreenhire.com. alpn="h2,h3" key65200="/.well-known/agent-skills/index.json"
```

---

## 3. Provider Configuration Guides

### A. Cloudflare DNS

1. Go to **Cloudflare Dashboard** -> **DNS** -> **Records**.
2. Click **Add Record**:
   - **Type**: `HTTPS`
   - **Name**: `_index._agents`
   - **TTL**: `Auto` or `3600`
   - **Service Priority**: `1`
   - **Target**: `londonscreenhire.com`
   - **Value / Parameters**: `alpn="h2,h3" endpoint="/.well-known/agents"`
3. Add Second Record:
   - **Type**: `HTTPS`
   - **Name**: `_a2a._agents`
   - **TTL**: `Auto` or `3600`
   - **Service Priority**: `1`
   - **Target**: `londonscreenhire.com`
   - **Value / Parameters**: `alpn="h2,h3" endpoint="/.well-known/agent-skills/index.json"`

### B. AWS Route 53

1. In Route 53 Console, select zone `londonscreenhire.com`.
2. Click **Create record**:
   - **Record name**: `_index._agents`
   - **Record type**: `HTTPS`
   - **Value**: `1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agents"`
3. Create second record:
   - **Record name**: `_a2a._agents`
   - **Record type**: `HTTPS`
   - **Value**: `1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agent-skills/index.json"`

### C. Namecheap / Generic DNS UI

1. Open **Advanced DNS**.
2. If `HTTPS` record type is available directly, choose `HTTPS` and enter:
   - Host: `_index._agents`, Value: `1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agents"`
   - Host: `_a2a._agents`, Value: `1 londonscreenhire.com. alpn="h2,h3" endpoint="/.well-known/agent-skills/index.json"`
3. If custom record type is required, specify `TYPE65` (HTTPS) or `TYPE64` (SVCB) with hex binary presentation.

---

## 4. DNSSEC Zone Signing Setup

DNS-AID requires validating resolvers to receive authenticated data with the `AD` (Authentic Data) flag set.

### Option A: Cloudflare DNSSEC (Recommended)

1. Go to **Cloudflare Dashboard** -> **DNS** -> **Settings**.
2. Under **DNSSEC**, click **Enable DNSSEC**.
3. Cloudflare generates DS record details:
   - **Key Tag**: e.g., `2371`
   - **Algorithm**: `13` (ECDSAP256SHA256)
   - **Digest Type**: `2` (SHA-256)
   - **Digest**: e.g., `4B2D...`
4. Log into your domain registrar (e.g. Namecheap, GoDaddy, Google Domains) and add the DS record to activate DNSSEC delegation.

### Option B: BIND / Manual Zone Signing

Generate ECDSAP256SHA256 keys and sign the zone:

```bash
# 1. Generate Zone Signing Key (ZSK)
dnssec-keygen -a ECDSAP256SHA256 -b 256 -n ZONE londonscreenhire.com

# 2. Generate Key Signing Key (KSK)
dnssec-keygen -f KSK -a ECDSAP256SHA256 -b 256 -n ZONE londonscreenhire.com

# 3. Include keys in zone file and sign
dnssec-signzone -A -3 $(head -c 1000 /dev/urandom | sha1sum | cut -b 1-16) -N INCREMENT -o londonscreenhire.com dns/dns-aid.zone
```

---

## 5. Verification & Testing

### Command Line Verification (`dig`)

```bash
# Query _index record with DNSSEC validation
dig +dnssec HTTPS _index._agents.londonscreenhire.com

# Query _a2a record with DNSSEC validation
dig +dnssec HTTPS _a2a._agents.londonscreenhire.com
```

Ensure the response header contains the `flags: qr rd ra ad;` (`ad` = Authentic Data).

### Automated Verification Script

Run the repository verification script:

```bash
node scripts/verify-dns-aid.mjs
```

### IsItAgentReady Scanner API Test

```bash
curl -X POST https://isitagentready.com/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://londonscreenhire.com"}'
```

Verify that `checks.discoverability.dnsAid.status` equals `"pass"`.

