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
  let paramMatched = false;

  for (const rrType of RR_TYPES) {
    try {
      const resCF = await queryCloudflareDoH(entry.name, rrType.code);
      const resGoogle = await queryGoogleDoH(entry.name, rrType.code);

      const answersCF = resCF.Answer || [];
      const answersGoogle = resGoogle.Answer || [];
      const allAnswers = answersCF.concat(answersGoogle);

      if (allAnswers.length > 0) {
        recordFound = true;
        console.log(`   ✅ Found ${rrType.name} (Type ${rrType.code}) record.`);

        if (resCF.AD || resGoogle.AD) {
          dnssecValid = true;
          console.log(`   🔒 DNSSEC Validated (AD flag present).`);
        } else {
          console.log(`   ⚠️  Record returned without DNSSEC AD flag.`);
        }

        const dataStr = JSON.stringify(allAnswers);
        if (dataStr.includes(entry.expectedEndpoint)) {
          paramMatched = true;
          console.log(`   ✨ Exact endpoint parameter ("${entry.expectedEndpoint}") validated.`);
        } else {
          console.log(`   ❌ Endpoint parameter mismatch: expected "${entry.expectedEndpoint}".`);
        }
      }
    } catch (err) {
      // DNS lookup error or non-existent record
    }
  }

  if (!recordFound) {
    console.log(`   ❌ Record not found on public DNS resolvers.`);
    console.log(`   📋 Local Zone Record to publish:`);
    console.log(`      ${entry.name}. 3600 IN HTTPS 1 ${DOMAIN}. alpn="h2,h3" endpoint="${entry.expectedEndpoint}"`);
  }

  const passed = recordFound && dnssecValid && paramMatched;
  return { name: entry.name, recordFound, dnssecValid, paramMatched, passed };
}

async function main() {
  console.log("=========================================================");
  console.log(`   DNS-AID (DNS for AI Discovery) Verification Suite`);
  console.log(`   Target Domain: ${DOMAIN}`);
  console.log("=========================================================");

  const results = [];
  let allPassed = true;
  for (const entry of ENTRYPOINTS) {
    const res = await verifyEntrypoint(entry);
    results.push(res);
    if (!res.passed) {
      allPassed = false;
    }
  }

  console.log("\n---------------------------------------------------------");
  console.log("Summary:");
  for (const r of results) {
    let status = "FAILED";
    if (r.passed) {
      status = "PASSED (DNSSEC & Parameters Validated)";
    } else if (!r.recordFound) {
      status = "FAILED (Record Missing)";
    } else if (!r.dnssecValid) {
      status = "FAILED (DNSSEC Invalid/Disabled)";
    } else if (!r.paramMatched) {
      status = "FAILED (Parameter Mismatch)";
    }
    console.log(` - ${r.name}: ${status}`);
  }
  console.log("---------------------------------------------------------\n");

  if (!allPassed) {
    console.error("❌ DNS verification failed! One or more required DNS-AID records are missing, invalid, or lack DNSSEC authentication.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error during DNS-AID verification:", err);
  process.exit(1);
});
