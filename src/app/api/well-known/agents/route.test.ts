import { describe, it, expect } from "vitest";
import { GET as getAgents } from "./route";
import { GET as getAgentSkills } from "../agent-skills/route";
import { GET as getOAuthProtectedResource } from "../oauth-protected-resource/route";
import { GET as getOAuthAuthorizationServer } from "../oauth-authorization-server/route";

describe("Agent Discovery & Auth.md Metadata Routes", () => {
  it("GET /.well-known/agents returns valid DNS-AID index payload", async () => {
    const response = await getAgents();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");

    const data = await response.json();
    expect(data.version).toBe("1.0");
    expect(data.domain).toBe("londonscreenhire.com");
    expect(Array.isArray(data.endpoints)).toBe(true);

    const skillEndpoint = data.endpoints.find(
      (e: { type: string }) => e.type === "agent-skills"
    );
    expect(skillEndpoint).toBeDefined();
    expect(skillEndpoint.url).toContain("/.well-known/agent-skills/index.json");
  });

  it("GET /.well-known/agent-skills returns valid agent skills index", async () => {
    const response = await getAgentSkills();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");

    const data = await response.json();
    expect(data.version).toBe("0.2.0");
    expect(Array.isArray(data.skills)).toBe(true);
    expect(data.skills.length).toBeGreaterThan(0);
  });

  it("GET /.well-known/oauth-protected-resource returns valid PRM metadata", async () => {
    const response = await getOAuthProtectedResource();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");

    const data = await response.json();
    expect(data.resource).toBeDefined();
    expect(Array.isArray(data.authorization_servers)).toBe(true);
    expect(data.bearer_methods_supported).toEqual([]);
    expect(data.resource_documentation).toContain("/auth.md");
  });

  it("GET /.well-known/oauth-authorization-server returns agent_auth block", async () => {
    const response = await getOAuthAuthorizationServer();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");

    const data = await response.json();
    expect(data.issuer).toBeDefined();
    expect(data.authorization_endpoint).toBeUndefined();
    expect(data.agent_auth).toBeDefined();
    expect(data.agent_auth.skill).toBe(
      "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md"
    );
    expect(data.agent_auth.register_uri).toBeNull();
    expect(Array.isArray(data.agent_auth.identity_types_supported)).toBe(true);
    expect(Array.isArray(data.agent_auth.credential_types_supported)).toBe(true);
  });
});
