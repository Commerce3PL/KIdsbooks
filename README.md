# Little Worlds

A full-stack personalized storybook prototype: 30 original adventures, five hero roles, optional sibling and dedication, parent-consented photo upload, encrypted order storage, educational 24-page stories, private PDF downloads, optional AI illustration generation, Stripe **test** checkout and verified webhooks, and an authenticated order studio.

## Run

Requires Node.js 24 (uses built-in SQLite) and npm. No database service is required.

```sh
cd /workspace/KIdsbooks
npm ci
cp .env.example .env
# Edit .env; generate ADMIN_TOKEN and DATA_KEY locally (do not commit them).
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
npm run dev
```

Open port 3000 through your development environment. `/admin.html` is the admin studio. Enter `ADMIN_TOKEN` to list orders, retry failed generation, or refund verified test payments. Without ADMIN_TOKEN all admin endpoints reject access. The UI does not persist this token.

No credentials are needed for demo mode. Choose an adventure, enter Avery / age 5, select animal guardian, add sibling Sam and dedication “For all the worlds you’ll discover.” Check parental consent. A photo is optional in demo mode. Generate, page through the story, and download the 24-page interior and cover proof. Demo books cannot be purchased. Test fixtures use a synthetic image, never a real child’s photo.

## Environment

| Variable | Purpose |
| --- | --- |
| PORT | Server port, default 3000 |
| APP_URL | Trusted public HTTPS origin for Stripe return URLs; localhost in development |
| ADMIN_TOKEN | Long random studio bearer token; required for admin actions |
| DATA_KEY | 64 hex characters, AES-256 key for photos and order payloads; keep securely with backups |
| DATA_DIR | Optional private data directory; default `data/private` |
| PHOTO_RETENTION_DAYS | Original-photo retention, default 7 days |
| OPENAI_API_KEY | Optional image generation credential; server-side only |
| STRIPE_SECRET_KEY | Only `sk_test_` keys are accepted |
| STRIPE_WEBHOOK_SECRET | Stripe test webhook signing secret |
| LULU_CLIENT_ID / LULU_CLIENT_SECRET | Reserved for the sandbox adapter; not needed for demo |

If DATA_KEY is omitted a private local key is generated in the data directory. Preserve it with the database, or data will be unreadable. Never commit `.env`, data, or keys. Backups need the same retention and access controls as the primary store. Production should use a managed KMS and encrypted private object storage.

## AI generation

With OPENAI_API_KEY and a photo, generation calls OpenAI `gpt-image-1` image edits: one cartoon character reference, then 24 original page illustrations using that reference. This can take several minutes and incurs provider costs. No franchise artwork or branding is requested. No API key: deterministic sample illustrations, explicitly labeled demo. The child remains the main hero, with learning, an emotional conflict, a twist, and a resolution. Thirty adventure premises are included; the current narrative engine shares a common beat structure. Story-specific editorial refinement is still needed before selling.

The generation job runs inside the server. A restart marks interrupted jobs failed for admin retry. Completed page artwork is retained and reused on retries. This is suitable for development; production requires a durable job queue, concurrency/cost limits, cancellation, content review, image quality checks, and a parent approval step. Image consistency is prompted, not guaranteed. Optional siblings are named in the story but do not yet have separate photo-derived character references.

## Stripe testing

1. Configure a Stripe test secret and webhook signing secret. Live keys are rejected in code; no environment flag enables live charges.
2. Forward Stripe test events to `POST /api/stripe/webhook`, or register a reachable HTTPS endpoint.
3. Complete AI generation to enable hosted test checkout ($39 USD). Use Stripe test card `4242 4242 4242 4242`, any future expiration and CVC. No real card details.
4. Only a signature-verified, non-live `checkout.session.completed` event with matching order/session, paid status, currency and amount marks the order paid. A browser return URL cannot mark payment successful.
5. A paid test order enters `awaiting_approval` for printing. Admin refund requests use Stripe’s test API and idempotency keys. Real printing never follows a test payment.

Checkout sessions and refunds use per-order idempotency keys. Test shipping collection currently supports the US. No taxes, currency conversion, shipping calculation, or production fulfillment is implemented.

## PDFs and Lulu

The interior has 24 square 8.75-inch pages (8.5-inch trim plus 0.125-inch bleed on each side). The cover is a **proof**, not a production-approved Lulu cover. A sellable book requires selecting a Lulu product SKU, generating its exact cover dimensions/spine, barcode safe area, appropriate page count, color/ICC and font checks, and high-resolution print artwork. Current 1024-pixel AI images need print-quality evaluation/upscaling; no print-ready claim is made.

`lulu.js` contains an OAuth client and print-job adapter hard-coded to `https://api.sandbox.lulu.com`. Unit tests exercise its request payload with a fake transport. It requires a verified test payment, shipping phone, package ID and an explicit preflight flag before any network request. It is deliberately **not connected to checkout or a live fulfillment action** while the generated cover remains a proof. The admin print endpoint always returns 403. There is no production Lulu endpoint or live toggle. Sandbox credentials and current Lulu API/SKU requirements still need end-to-end verification. To complete fulfillment, implement and verify product-specific PDF preflight, private expiring download URLs accessible to Lulu, durable submission/reconciliation and sandbox integration tests; then obtain the owner’s explicit approval before adding production printing.

## Privacy and security

Uploaded images are decoded with a pixel limit, stripped of metadata, resized and converted to JPEG. Original photo bytes and personal order fields are AES-256-GCM encrypted in SQLite, outside the public web root. Image and PDF retrieval requires an unguessable per-book bearer token. Generated PNGs are access-controlled but are not separately application-encrypted; protect the filesystem volume. Admin APIs require a separate token. Uploads and generation are rate limited. Stripe handles card data. CSP, security headers, and escaped UI content are included.

Original photos are purged hourly while running and on startup; immediate deletion is available in the bookshelf. AI providers may retain inputs separately. Generated artwork and order records currently persist; deleting the original is not an account-wide erasure. Do not use this prototype to collect real children’s data before legal/privacy review, complete deletion/export procedures, backup retention, audit logging, production authentication, secure hosting, provider retention agreements, and access monitoring. Bearer tokens are local-browser capabilities, not a full account system.

## Tests

```sh
npm test
npm run test:browser
```

Node tests validate all 30 stories, live-key rejection, a sandbox-only Lulu payload, and an actual HTTP demo flow with upload, consent rejection, access isolation, PDF output, original-photo deletion, admin authentication, checkout restrictions and disabled printing. Browser tests use system Chromium (`/usr/bin/chromium`) and exercise desktop/mobile creation and navigation. Provider calls use mocks where labeled; real OpenAI/Stripe/Lulu success is not asserted without credentials.

## Deployment boundaries

Live payments and printing remain disabled pending explicit owner approval. No Git push or deployment is performed. No persistent process survives a cloud snapshot; start `npm run dev` in each task. Use this existing checkout; do not create a worktree unless requested. Keep the data directory private, back it up securely and never serve it statically.

## Free public demo on Render

`render.yaml` declares a free Node web service. No paid disk or external database is requested.

1. Put this project’s files on the `main` branch of your GitHub repository (the local work has not been pushed).
2. Create a free Render account at https://render.com and connect GitHub.
3. Choose **New → Blueprint**, select `Commerce3PL/KIdsbooks`, and use `render.yaml`. Confirm the service uses the **Free** plan before creating it.
4. Render installs dependencies, starts the server, and provides an HTTPS `onrender.com` address. Open that address to view the interactive demo.
5. For the studio, retrieve the generated `ADMIN_TOKEN` securely from the service’s environment settings and enter it at `/admin.html`. Do not send it in chat.

Use fictional names and synthetic photos. Free service storage is ephemeral: orders, photos, artwork and the local encryption key can disappear on restart or redeploy. The service may sleep when idle and take time to wake up. This configuration is for demonstration, not real customer orders. No AI/Stripe/Lulu credentials are included, so sample generation works without provider charges. Live payments and printing remain disabled. A free account and connecting the GitHub repository are actions the owner must complete; this repository configuration does not create a hosted service by itself.
