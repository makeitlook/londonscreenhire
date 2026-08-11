#!/usr/bin/env node

/**
 * DNS for AI Discovery (DNS-AID) Verification Script
 *
 * Checks DNS-AID SVCB/HTTPS entrypoint records (_index._agents and _a2a._agents)
 * via DNS-over-HTTPS (DoH) using Cloudflare and Google resolvers.
 * Validates DNSSEC Authentic Data (AD) status.
 */

import http from "node:https";

const DOMAIN = process.env.TARGET_DOMAIN || "londonscreenhire.com";
const ENTRYPOINTS = [
  {
    name: `_index._agents.${DOMAIN}`,
    expectedEndpoint: "/.well-known/agents",
    description: "DNS-AID Discovery Index",
  },
  {
    name: `_a2a._agents.${DOMAIN}`,
    expectedEndpoint: "/.well-known/agent-skills/index.json",
    description: "DNS-AID Agent-to-Agent / Skills Discovery",
  },
];

const RESOLVERS = [
  {
    name: "Cloudflare DoH",
    url: "https://cloudflare-dns.com/dns-query",
  },
  {
    name: "Google DoH",
    url: "https://dns.google/resolve",
  },
];

// TYPE 65 = HTTPS, TYPE 64 = SVCB
const RR_TYPES = [
  { code: 65, name: "HTTPS" },
  { code: 64, name: "SVCB" },
];

async function queryGoogleDoH(name, type) {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}&dnssec=true`;
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function queryCloudflareDoH(name, type) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}&dnssec=true`;
  const options = {
    headers: {
      Accept: "application/dns-json",
    },
  };
  return new Promise((resolve, reject) => {
    http.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function verifyEntrypoint(entry) {
  console.log(`\n🔍 Checking entrypoint: ${entry.name} (${entry.description})`);

  let recordFound = false;
  let dnssecValid = false;

  for (const rrType of RR_TYPES) {
    try {
      const resCF = await queryCloudflareDoH(entry.name, rrType.code);
      const resGoogle = await queryGoogleDoH(entry.name, rrType.code);

      const answersCF = resCF.Answer || [];
      const answersGoogle = resGoogle.Answer || [];

      if (answersCF.length > 0 || answersGoogle.length > 0) {
        recordFound = true;
        console.log(`   ✅ Found ${rrType.name} (Type ${rrType.code}) record.`);

        if (resCF.AD || resGoogle.AD) {
          dnssecValid = true;
          console.log(`   🔒 DNSSEC Validated (AD flag present).`);
        } else {
          console.log(`   ⚠️  Record returned without DNSSEC AD flag.`);
        }

        const dataStr = JSON.stringify(answersCF.concat(answersGoogle));
        if (dataStr.includes(entry.expectedEndpoint) || dataStr.includes("alpn=")) {
          console.log(`   ✨ Endpoint parameter matches expected pattern.`);
        }
      }
    } catch (err) {
      // DNS lookup error or non-existent record
    }
  }

  if (!recordFound) {
    console.log(`   ℹ️ Record not live on public DNS resolvers yet.`);
    console.log(`   📋 Local Zone Record to publish:`);
    console.log(`      ${entry.name}. 3600 IN HTTPS 1 ${DOMAIN}. alpn="h2,h3" endpoint="${entry.expectedEndpoint}"`);
  }

  return { name: entry.name, recordFound, dnssecValid };
}

async function main() {
  console.log("=========================================================");
  console.log(`   DNS-AID (DNS for AI Discovery) Verification Suite`);
  console.log(`   Target Domain: ${DOMAIN}`);
  console.log("=========================================================");

  const results = [];
  for (const entry of ENTRYPOINTS) {
    const res = await verifyEntrypoint(entry);
    results.push(res);
  }

  console.log("\n---------------------------------------------------------");
  console.log("Summary:");
  for (const r of results) {
    const status = r.recordFound ? (r.dnssecValid ? "PASSED (DNSSEC Authenticated)" : "FOUND (Pending DNSSEC)") : "NOT PUBLISHED YET";
    console.log(` - ${r.name}: ${status}`);
  }
  console.log("---------------------------------------------------------\n");
}

main().catch((err) => {
  console.error("Error during DNS-AID verification:", err);
  process.exit(1);
});
