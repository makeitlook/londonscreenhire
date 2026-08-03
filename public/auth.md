# Auth

## Site

London Screen Hire — https://www.londonscreenhire.com/

## Access

All content on this site is **publicly accessible**. No authentication or credentials are required to browse the site or request a quote.

## Agent Registration

No agent registration is required to access public resources.

Agents may freely read and index all content on this site in accordance with the Content-Signal preferences declared in `/robots.txt`:

```
Content-Signal: ai-train=no, search=yes, ai-input=no
```

## Protected Resources

This site has no protected API endpoints that require OAuth tokens or API keys.

## Contact

For enquiries, email: info@londonscreenhire.com  
Or use the quote form: https://www.londonscreenhire.com/#quote

## Agent Auth Block

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types": [],
    "credential_types": [],
    "claim_url": null,
    "revocation_url": null,
    "notes": "No authentication required. All resources are publicly accessible."
  }
}
```
