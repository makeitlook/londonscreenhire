import { describe, it, expect } from "vitest";
import { GET as getAgents } from "./route";
import { GET as getAgentSkills } from "../agent-skills/route";

describe("Agent Discovery Routes", () => {
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

  it("GET /.well-known/agents does not expose deleted auth/oauth endpoints", async () => {
    const response = await getAgents();
    const data = await response.json();

    const types = data.endpoints.map((e: { type: string }) => e.type);
    expect(types).not.toContain("oauth-authorization-server");
    expect(types).not.toContain("oauth-protected-resource");
    expect(types).not.toContain("auth-documentation");
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
});
