# Automatic Pitch Scoring

## Current status

This branch contains a local, inactive implementation of AI-assisted first-pass screening for new pitch submissions. It has not been deployed, and no live Gemini or monday.com scoring request was made while building or testing it.

The screen does not make an investment decision, contact a founder, reject a company, move a monday.com item, or analyze the uploaded deck. Every result requires human review. The legacy label `REJECT` is retained for compatibility but means “clear mandate mismatch for review,” never an automatic rejection.

## Legacy evidence and exact compatibility

The supplied source files are:

- `Dipalo Ventures Startup Application (Responses).xlsx`
  - SHA-256: `6642cc8d69241e0b01f95e8814ed7ebd9de477296c867ea270669cf5d3dc35ec`
- `Dipalo Ventures VC Screener - 2025 User Guide.docx`
  - SHA-256: `56c9132593723cd7db7a63c39501e520e524778be376c7721deb3840b24aa750`

The Apps Script and its `buildPrompt_` rubric were not included, so prompt-level parity is impossible. The exact rating set, weights, total formula, and 168 complete historical scores were recoverable. The new prompt is a transparent reconstruction, not the missing old prompt and not a calibrated prediction of investment success.

Exact recovered policy:

- Ratings are restricted to `0`, `1`, `3`, or `9`.
- Investment Fit is weighted 35%.
- Investment Potential is weighted 40%.
- Credibility is weighted 15%.
- Sustainability is weighted 10%.
- Seed-stage companies at TRL 5–7 receive positive consideration within Investment Potential.
- Pitch decks were not analyzed.
- The final fit label is qualitative, not a total-score threshold.

The total formula has zero mismatches across the 168 complete legacy rows and 47 distinct observed rating tuples:

```text
min(
  99,
  round(
    (35 * Investment Fit
     + 40 * Investment Potential
     + 15 * Credibility
     + 10 * Sustainability) / 9
  )
)
```

This number is called the **legacy priority index**. It is an ordinal triage aid with false precision, not a probability, percentile, objective quality score, or calibrated `/100` outcome. The `99` maximum is retained only for compatibility.

The qualitative label must remain separate because historical totals overlap substantially:

| Legacy label | Observed index range |
| ------------ | -------------------: |
| REJECT       |                 2–65 |
| LOW          |                10–70 |
| MEDIUM       |                24–77 |
| HIGH         |                53–99 |

## Deliberate changes from old-model behavior

Historical rationales sometimes used geography, founder/team pedigree, repeat-founder status, professional writing, partner signals, and existing-investor prestige. The new rubric deliberately does not reproduce those behaviors:

- geography, contact details, demographics, referral source, LinkedIn, founder name, and investor prestige are excluded;
- grammar, fluency, tone, style, and writing polish cannot affect Credibility;
- Credibility measures application evidence quality: specificity, completeness, internal consistency, and concrete reported validation;
- round size, valuation, and financing instrument do not affect a score because no approved check-size, ownership, or valuation thresholds were supplied;
- founder-reported claims are labeled as reported, not independently verified.

These are material fairness and policy changes, not claims of behavioral parity. Before activation, Dipalo’s investment committee should explicitly confirm whether geography is a genuine eligibility rule. If it is, it should be encoded as a transparent rule rather than inferred as a prestige proxy.

## Runtime flow

1. The server validates every current form field and rejects unknown JSON keys, including forged score fields.
   Fundraising stage uses the five normalized choices found in the legacy workbook rather than creating arbitrary monday dropdown labels.
2. It checks that the required deck is at most 10 MB and has a PDF extension, allowed MIME type, `%PDF-` header, and `%%EOF` trailer. This is a basic structural check, not full PDF parsing or malware scanning.
3. It creates the canonical monday.com item before attempting enrichment.
4. It sends only allowlisted application evidence to Gemini. The rubric is a system instruction; founder text is marked as untrusted user data.
5. Gemini is constrained to structured JSON. The server then performs independent Zod validation and semantic fit/rating checks.
6. The server—not Gemini—calculates the legacy priority index.
7. If both configured columns exist, it submits `AI Fit` and the numeric index together through monday's `change_multiple_column_values` mutation. The code does not intentionally write either structured value by itself.
8. It adds the four rationales, cited evidence fields, overall rationale, follow-up flags, rubric version, configured model alias, returned model version, and input hash to the item activity feed.

The input hash covers the literal system instruction, application prompt, JSON response schema, configured/resolved model, rubric version, and normalized scoring input. Model-controlled text is HTML-escaped before a monday update.

Scoring is enrichment. A Gemini failure leaves the accepted pitch intact and never overwrites an earlier successful result. If the structured monday columns are absent, the full result can still be written to the activity feed, but this is not an activation-ready board workflow.

## Scoring data boundary

Included:

```text
oneliner, industry, sector, problem, solution, diff,
revenue, tam, model, validation, trl, products, ip,
climate, designSus, mfgSus, businessSustainability,
sustainabilityRisks, sustainabilityMilestones, aiUse, aiValue,
aiAdvantage, aiSafety, stage
```

Excluded:

```text
name, email, company, website, linkedin, identity,
street, city, state, country, heard, heardDetail,
applied, share, priorVC, deck, roundSize, valuation,
instrument
```

Long answers are accepted and scored up to the same 4,000-character limit. The new Business Sustainability & AI subsection is included in the Gemini scoring input; its raw answers still need dedicated Monday columns if the team wants them stored as sortable board fields. Top-level exclusions cannot guarantee that free text contains no name, school, geography, or investor reference, so the system instruction also tells the model to ignore those signals. This needs adversarial regression testing and override monitoring before activation.

## Local configuration

```dotenv
PITCH_SCORING_ENABLED=false
GEMINI_API_KEY=
GEMINI_SCORING_MODEL=gemini-2.5-flash
MONDAY_SCORE_COLUMN_ID=numeric_mm4t9dwv
MONDAY_FIT_COLUMN_ID=
```

`GEMINI_SCORING_MODEL` is a configured model alias, not an immutable revision. The API’s returned `modelVersion` is stored with each successful result. Scoring runs only when `PITCH_SCORING_ENABLED=true` **and** a Gemini key is present. Otherwise submissions continue normally and scoring is skipped. The explicit switch prevents an unrelated or accidentally present key from activating founder-data transfer.

Before structured writes are enabled, create an `AI Fit` Text column and set its exact column id in `MONDAY_FIT_COLUMN_ID`. No monday board was changed during this work.

The Next.js Server Action body limit is 11 MB for local testing. This does not solve a hosted function’s lower request limit and should not be treated as a production upload architecture.

## Verification

The local unit suite covers:

- strict application validation and system-field injection;
- basic PDF structure and type checks;
- recovered score fixtures and all 256 possible rating combinations;
- sensitive, prestige, valuation, and financing-field exclusions;
- prompt-injection separation between system instruction and founder data;
- structured-output and semantic label validation;
- mocked Gemini scoring without a network request;
- resolved model-version capture, hashing, and HTML escaping.

The historical workbook is not copied into application code because it contains founder data. The repository’s regression artifact contains only aggregate rating tuples, counts, and expected totals.

## Activation blockers

Do not activate or deploy this flow until all of the following are resolved:

1. Move scoring to a durable queue/outbox with explicit `Pending`, `Scored`, `Failed`, and `Needs Review` states, retry policy, and submission idempotency. The current local implementation waits synchronously and can duplicate an item if a client retries after a timeout.
2. Add public-form abuse controls: rate limiting, CAPTCHA or equivalent bot defense, model-spend quotas, and a circuit breaker.
3. Complete privacy, security, and vendor review before sending confidential IP, validation, revenue, and market answers to Google. Confirm contractual/data-retention terms and lawful basis, update the public privacy notice with the actual third-party AI processing, and obtain consent where required. Keep `PITCH_SCORING_ENABLED=false` until approved.
4. Replace Server Action deck transfer with direct object storage, durable upload status, malware scanning, and a production request-size design.
5. Add and verify monday columns for `AI Fit`, Scoring Status, Rubric Version, Score Hash, Review Status, and Human Override Reason. Rename the existing `Score (/100)` column to `Legacy Priority Index (0–99)`. Prefer explicit dimension columns if the team wants them sortable.
6. Evaluate a deidentified, human-labeled golden set and adversarial cases for prompt injection, geography/prestige leakage, paraphrases, missing evidence, and label consistency. Historical model outputs are compatibility evidence, not ground truth.
7. Run controlled sandbox integration tests for Gemini and monday with non-sensitive fixtures, then obtain investment-committee signoff on the rubric and eligibility policy.

No deployment, board mutation, founder communication, or live scoring was performed.
