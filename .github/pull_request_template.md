## Summary

<!-- Explain what changed and why. -->

## Review checklist

- [ ] This pull request targets `dev`, unless it is an approved `dev` to `master` release.
- [ ] I reviewed the affected pages locally.
- [ ] I ran `npm run lint`.
- [ ] I ran `npm run typecheck`.
- [ ] I ran `npm test`.
- [ ] I ran `npm run build`.
- [ ] I did not commit `.env.local`, access keys or other secrets.
- [ ] I updated documentation when contributor-facing behaviour changed.

## Content checks

<!-- Complete these when the pull request changes src/content or images. -->

- [ ] JSON keys and icon values remain unchanged, or a developer approved the change.
- [ ] New or changed claims, statistics and testimonials are client-verified.
- [ ] Any unverified content remains marked with `"placeholder": true`.
- [ ] New images are compressed, correctly sized and have suitable alternative text.

## Release promotion

<!-- Complete these only for a dev-to-master release pull request. -->

- [ ] This pull request promotes reviewed changes from `dev` into `master`.
- [ ] Placeholder content has been reviewed and is not being presented as verified.
- [ ] The deployed quote form, metadata, sitemap and canonical URLs have been checked.
