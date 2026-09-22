# Research Model Audit — Phase 0

Project: Ứng dụng tâm lý học, nhân cách học vào định hướng nghề nghiệp
Plan: Project Design & Engineering Plan v4

## Audit decision

The current four-factor diagram must NOT be treated as a scientifically validated model yet.

Current factors in the existing site:
- Tính cách / Personality
- Giá trị / Values
- Năng lực / Ability
- Môi trường / Environment

Status: concept candidates, not a validated causal or predictive model.

## What the available sources support

### O*NET
O*NET's Content Model separately represents worker characteristics (including abilities, career interests and work styles), worker requirements, occupational requirements (including work activities and work context), and work-specific information. O*NET also publishes work-values data mapped to occupations.

Implication: there is credible evidence for representing person-side characteristics and occupation-side characteristics as related information domains. This does NOT by itself validate the project's exact four-factor graph or any specific causal arrows between the four labels.

### Holland / vocational personality and work environments
The literature on Holland's theory supports the existence and study of vocational personality types and work environments, and discusses person-environment congruence. Evidence also indicates that congruence has predictive relevance but is not a complete or deterministic predictor.

Implication: a future visual model may legitimately represent person/environment correspondence if the implementation uses terminology and claims that match the selected source. It must not turn correspondence into a guaranteed career recommendation.

### Personality and work
Research literature supports associations between personality traits and vocational interests, choices, and work-related outcomes. This supports studying personality in career contexts, but does not validate the project's current generic label "Tính cách" as one universal scientific variable.

## Relationship audit

| Proposed relationship | Status | Reason |
|---|---|---|
| Tính cách ↔ Nghề nghiệp | SUPPORTED IN GENERAL | Literature supports relationships between personality traits and vocational/work outcomes, but the exact operational model must be sourced. |
| Giá trị ↔ Nghề nghiệp | SUPPORTED IN GENERAL | O*NET explicitly contains work-values data mapped to occupations. |
| Năng lực ↔ Nghề nghiệp | SUPPORTED IN GENERAL | O*NET explicitly represents abilities and occupational requirements. |
| Môi trường ↔ Nghề nghiệp | SUPPORTED IN GENERAL | O*NET represents work context; Holland literature studies work environments. |
| Tính cách ↔ Giá trị | UNVERIFIED FOR THIS MODEL | No source in the current project establishes this exact relationship. |
| Tính cách ↔ Năng lực | UNVERIFIED FOR THIS MODEL | No source in the current project establishes this exact relationship. |
| Tính cách ↔ Môi trường | PARTIALLY SUPPORTED, MODEL-SPECIFIC CLAIM UNVERIFIED | Person-environment literature is relevant, but the exact edge used by the site is not yet sourced. |
| Giá trị ↔ Năng lực | UNVERIFIED FOR THIS MODEL | No source in the current project establishes this exact relationship. |
| Giá trị ↔ Môi trường | PLAUSIBLE / RESEARCH-RELEVANT, EXACT EDGE UNVERIFIED | Work-values and work-context literature is relevant, but the site's exact relationship needs a source. |
| Năng lực ↔ Môi trường | PLAUSIBLE / RESEARCH-RELEVANT, EXACT EDGE UNVERIFIED | O*NET relates abilities to work activities/context through its content model, but the site's exact visual relationship needs source-specific grounding. |
| Four factors → "FIT" | UNVERIFIED | The current project has not supplied a validated model defining these four labels as a single fit equation/system. |
| Four factors → career recommendation | NOT ALLOWED | No validated recommendation algorithm is currently supplied. |

## Consequence for implementation

Until the research model is sourced and validated:

1. Do not draw definitive relationship arrows among the four factors.
2. Do not encode a computed "fit" score.
3. Do not present the model as a diagnostic or recommendation engine.
4. The diagram should communicate exploration of concepts and clearly mark unverified relationships where necessary.
5. Research terminology must be tied to the actual source chosen for the final model.

## Current site issues identified

The existing implementation currently presents the four factors as a coherent system and uses copy such as "Bản thân là một hệ thống" and "mối quan hệ thay đổi". That framing is stronger than the currently verified evidence available in the project. The next implementation pass must revise the information model before adding more motion.

## Required next phase

PHASE 1 — Information Architecture / Diagram Model Audit:
- choose the research-backed concepts;
- define exact terminology;
- define which relationships are supported;
- define which relationships remain unverified;
- then prototype Relationship Field / Constellation / Layer-Intersection / Dynamic Career Map as instructed by the master plan.
