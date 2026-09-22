# Diagram Model Audit — Phase 1

## Project
Ứng dụng tâm lý học, nhân cách học vào định hướng nghề nghiệp

## Status
Phase 1 — Information / Diagram Model Audit

## Governing rule
This document is a project-level audit. It does **not** modify the global `@anti-slop-design v4` skill.

---

# 1. Decision summary

### Current website model
The current interface presents:

> Tính cách + Giá trị + Năng lực + Môi trường → SELF → nghề nghiệp / sự phù hợp

This is visually coherent, but it should **not** be presented as a validated scientific model. The Phase 0 audit found support for the general relevance of several domains to vocational choice/work, but not for the exact four-node causal graph or a computed “fit” produced from those four factors.

### Phase 1 structural decision
Replace the current **four-factor causal-looking system** with a **Person ↔ Work relationship model**.

The four existing concepts can remain as exploratory lenses, but they must no longer be positioned as four equivalent components of a single validated “self system”.

Recommended information structure:

```text
PERSON                              WORK

Work styles / personality           Work activities
Interests                           Work context
Abilities                           Work requirements
Values                              Work values / occupational values
        \                            /
         \                          /
          ─── relationship / fit ───
               (contextual)
```

The central concept is **relationship/congruence**, not a numerical “fit score”.

The interface should teach:

> Different aspects of a person can be examined alongside different characteristics of work; career exploration is the process of understanding the relationship, not receiving a deterministic recommendation.

---

# 2. Research basis

## 2.1 O*NET Content Model

O*NET separates information about the **worker** from information about the **job/work**. Worker-side domains include abilities, career interests and work styles; worker requirements include skills, knowledge and education. Job-side domains include work activities, work context and occupation-specific information.

Source: O*NET Resource Center — The O*NET Content Model.

Implication for the diagram: the visual should distinguish **person-side characteristics** from **work-side characteristics**, rather than placing “environment” beside personality, values and ability as if all four are the same kind of variable.

## 2.2 Work values

O*NET maintains occupation-level Work Values ratings. This supports discussing values in relation to occupations, but does not by itself establish a four-factor causal model.

## 2.3 Work styles ↔ work context

O*NET 31.0 includes explicit linkages between Work Styles and Work Context. This is particularly useful for the project's personality/work-environment narrative because it gives a documented bridge between person-side tendencies and characteristics of the work setting.

## 2.4 Holland / person–environment congruence

Holland's vocational-personality tradition provides a direct conceptual precedent for relating vocational personality/interests to work environments. The literature supports using congruence as a concept for career exploration, but it should not be turned into a deterministic claim that one personality type maps to one “correct” occupation.

## 2.5 Career construction / broader vocational psychology

Career construction literature frames career development as a dynamic process involving the person and the external vocational world. This supports the project's narrative direction of exploration rather than a one-shot classification.

---

# 3. Current model audit

| Current element | Keep? | New role | Reason |
|---|---|---|---|
| Tính cách | Yes | Person-side lens: work styles / personality-related tendencies | Strongly relevant, but terminology must be tied to a defined source/model |
| Giá trị | Yes | Person-side lens + occupational/work-value comparison | Relevant to vocational exploration; avoid implying it independently determines fit |
| Năng lực | Yes | Person-side lens: abilities / skills | O*NET explicitly includes abilities and skills |
| Môi trường | Yes, but relocate | Work-side characteristic: work context / environment | It is conceptually a property of work, not equivalent to the three person-side lenses |
| SELF center | No as a scientific node | Narrative label only | Current center visually implies a validated integrated construct |
| FIT center | No numerical score | Relationship/congruence state | “Fit” should be treated as a contextual relationship, not an invented score |
| Arrows between every factor | No | Remove | No source found validating the complete edge set |
| Career recommendation | No | Career exploration only | Current evidence does not justify deterministic recommendation logic |

---

# 4. Relationship audit

## 4.1 Relationships safe to visualize

### Person characteristics ↔ work characteristics
**SUPPORTED at the conceptual/domain level.**

O*NET explicitly organizes worker and job information and provides occupation-level data for both sides. This supports a visual comparison between person-side information and work-side information.

### Work styles ↔ work context
**SUPPORTED by an explicit O*NET linkage dataset.**

This is the strongest candidate for a concrete relationship interaction in the diagram.

### Career interests ↔ occupations
**SUPPORTED.**

O*NET provides illustrative occupations linked to career interest types/specific interest areas and occupation-specific interest data.

### Work values ↔ occupations
**SUPPORTED.**

O*NET provides occupation-level Work Values ratings.

### Abilities ↔ work context / work requirements
**SUPPORTED at O*NET linkage level.**

O*NET provides linkages between abilities and relevant work context, and occupational data connects abilities with work requirements.

## 4.2 Relationships that must remain unasserted

The following should **not** be drawn as definitive edges merely because they sound intuitively plausible:

- Tính cách → Giá trị
- Tính cách → Năng lực
- Giá trị → Năng lực
- Giá trị → Môi trường
- Năng lực → Giá trị
- all-pairs interaction among the four current nodes
- four factors → one hidden numerical FIT value
- four factors → one objectively correct career

If later research material explicitly supports a particular edge, it can be added with source attribution.

---

# 5. Information architecture for the signature diagram

## Layer 1 — Person

The user is invited to examine themselves through several lenses:

1. **Work styles / personality-related tendencies**
2. **Career interests**
3. **Abilities / skills**
4. **Values**

Important: these are lenses for exploration, not four independent ingredients that mathematically sum to a career answer.

## Layer 2 — Work

A career/occupation is then examined through:

1. **Work activities / tasks**
2. **Work context / environment**
3. **Abilities and skills commonly required**
4. **Work values / occupational characteristics**

## Layer 3 — Relationship

The interaction asks:

> “What relationship becomes visible when this aspect of me is placed beside this characteristic of work?”

This is where the website can introduce the idea of congruence / compatibility without inventing a score.

## Layer 4 — Exploration

The output is not:

> “You should become X.”

The output is:

> “This occupation can now be examined from this particular angle.”

This keeps the site within research-supported career exploration rather than a recommendation engine.

---

# 6. Candidate visual models

## A — Relationship Field

### Structure

```text
             PERSON
     ┌─────────────────────┐
     │ interests           │
     │ work styles         │
     │ abilities           │
     │ values              │
     └─────────┬───────────┘
               │
        relationship field
               │
     ┌─────────┴───────────┐
     │ work activities     │
     │ work context        │
     │ requirements        │
     │ work values         │
     └─────────────────────┘
              WORK
```

### Meaning
Distance, alignment, emphasis and connection can represent **which relationship is being explored**, not a hidden score.

### Interaction
Select one person-side lens → the relevant work-side attributes become visually connected.

### Risk
If spatial distance is interpreted as a quantified fit score, the diagram becomes misleading. Labels must explicitly state that geometry is explanatory, not a measurement.

---

## B — Constellation

### Structure

```text
        interests                 context
             ○                       ○

    work styles ○                 ○ activities

                 ●
              RELATION

             ○ values             ○ abilities
```

### Meaning
Nodes represent concepts; connections represent documented or explicitly framed relationships.

### Interaction
Selecting a node reveals only the relationships supported by the model.

### Risk
A constellation can easily become decorative. Every line must have an information purpose.

---

## C — Layer / Intersection

### Structure

```text
PERSON LAYER
────────────────────────
interests · work styles · abilities · values

              ∩

WORK LAYER
────────────────────────
activities · context · requirements · values

              ↓
      relationship to explore
```

### Meaning
The intersection is conceptual: it is where the user examines correspondence between person characteristics and work characteristics.

### Interaction
Toggle a person lens and a work characteristic; the intersection updates to show the relationship being examined.

### Risk
The word “intersection” may imply a measurable overlap. Copy should clarify that it is an explanatory metaphor.

---

## D — Dynamic Career Map

### Structure

```text
PERSON
  │
  ├── interests ────────┐
  ├── work styles ──────┤
  ├── abilities ────────┼──→ OCCUPATION TO EXPLORE
  └── values ───────────┤
                         │
                  work characteristics
```

### Meaning
The occupation is a destination for **exploration**, not a recommendation result.

### Interaction
Changing the occupation changes the work-side profile; changing the person lens changes what part of the profile is foregrounded.

### Risk
The directional arrow can imply deterministic causality or recommendation. It should therefore be used only as a navigation metaphor, not as a causal arrow.

---

# 7. Recommended prototype direction

## Primary direction: Relationship Field

For Phase 2/3 prototyping, use **Relationship Field** as the primary information architecture.

Reasoning:

1. It maps most directly to the research distinction between worker/person information and work/occupation information.
2. It naturally supports the project's central question about how understanding oneself changes how one reads a career.
3. It allows the existing visual language of nodes and spatial continuity to survive without preserving the scientifically risky four-factor geometry.
4. It supports interaction where a selection creates a meaningful spatial consequence.
5. It can collapse into a sequential composition on mobile without destroying the conceptual relationship.

This is a design-system decision, not a claim that Relationship Field is a scientific model.

## Secondary prototype: Constellation

Prototype as a visual alternative because it can express multiple documented relationships without forcing a hierarchy. It should only survive if every connection can be justified.

## Tertiary prototype: Layer / Intersection

Prototype for mobile and for explanatory moments where the distinction between person and work needs to be especially clear.

## Conditional prototype: Dynamic Career Map

Use only for the later “career exploration” scene. Do not use it as the primary scientific model because its directional structure can easily be read as “your traits lead to this career”.

---

# 8. Interaction specification for the next phase

The diagram should have these states:

### Default
Both sides visible. No claim of fit.

### Person lens selected
Example: `WORK STYLES`

- selected person-side node becomes prominent;
- relevant work-side characteristics become connected/highlighted;
- unsupported relationships remain visually quiet;
- explanatory text states what the relationship means.

### Work characteristic selected
Example: `WORK CONTEXT`

- work-side node becomes prominent;
- relevant person-side concepts become visible;
- the interaction teaches that the work environment is something to examine, not a personality factor.

### Relationship state
A selected pair becomes a temporary “research lens”:

```text
WORK STYLES
      ↕
WORK CONTEXT

“What does this work environment ask of the way a person tends to work?”
```

The diagram must never display a fabricated percentage, score, ranking or recommendation.

---

# 9. Content model proposal

```js
const model = {
  person: [
    { id: 'workStyles', label: 'Cách làm việc', sourceDomain: 'O*NET Work Styles' },
    { id: 'interests', label: 'Sở thích nghề nghiệp', sourceDomain: 'O*NET Career Interests' },
    { id: 'abilities', label: 'Năng lực', sourceDomain: 'O*NET Abilities' },
    { id: 'values', label: 'Giá trị', sourceDomain: 'Work Values / vocational literature' }
  ],
  work: [
    { id: 'activities', label: 'Hoạt động / nhiệm vụ', sourceDomain: 'O*NET Work Activities' },
    { id: 'context', label: 'Bối cảnh / môi trường', sourceDomain: 'O*NET Work Context' },
    { id: 'requirements', label: 'Yêu cầu công việc', sourceDomain: 'O*NET Worker/Occupational Requirements' },
    { id: 'workValues', label: 'Giá trị của công việc', sourceDomain: 'O*NET Work Values' }
  ],
  relationships: [
    { from: 'workStyles', to: 'context', status: 'supported', source: 'O*NET Work Styles ↔ Work Context linkage' },
    { from: 'interests', to: 'occupation', status: 'supported', source: 'O*NET interests/occupation data' },
    { from: 'abilities', to: 'requirements', status: 'supported', source: 'O*NET abilities/requirements data' },
    { from: 'values', to: 'workValues', status: 'supported-at-domain-level', source: 'O*NET Work Values + vocational literature' }
  ]
};
```

The exact wording can be refined in the next research pass. The important architectural rule is that **relationship status and source are data**, not hidden assumptions inside the animation code.

---

# 10. What changes in the current website

### Scene 01
Current:
> four-factor “SELF” diagram

Change to:
> a compact person ↔ work relationship teaser.

### Scene 02
Current:
> four equal factor rows

Change to:
> “Nhìn vào bản thân qua nhiều lăng kính” with person-side lenses.

### Scene 03
Current:
> “THE FOUR FACTORS” / “Bản thân là một hệ thống”

Change to:
> “THE RELATIONSHIP” / “Đặt hai phía cạnh nhau”.

This becomes the signature diagram.

### Scene 04
Current:
> four factors morph directly into CAREER

Change to:
> person-side lenses → work profile → occupation exploration.

### Scene 05
Keep the career-profile concept, but replace generic claims with source-backed occupation attributes.

### Scene 07
Return to the relationship field rather than returning to the unsupported four-factor system.

---

# 11. Copy corrections required before implementation

Avoid:

- “Bản thân là một hệ thống” when it implies a validated four-factor system.
- “mối quan hệ thay đổi” if no relationship has been defined.
- “các yếu tố tương tác” as a blanket scientific claim.
- “FIT” as a computed or objective quantity.
- “một nghề phù hợp với bạn” as a deterministic conclusion.

Prefer:

- “Có nhiều cách để đọc một người trong bối cảnh nghề nghiệp.”
- “Đặt đặc điểm của một người cạnh đặc điểm của công việc.”
- “Khám phá sự tương hợp giữa người và môi trường làm việc.”
- “Mỗi lăng kính cho một câu hỏi khác nhau về nghề.”
- “Không phải một điểm số; đây là một cách để đặt câu hỏi.”

---

# 12. Phase 1 acceptance criteria

Phase 1 is complete when:

- [x] Current four-factor model has been audited.
- [x] Unsupported causal-looking edges are identified.
- [x] Person-side and work-side concepts are separated.
- [x] Supported relationship candidates are documented.
- [x] Four visual model directions are structurally defined.
- [x] A primary prototype direction is selected for the next phase.
- [x] No numerical fit/recommendation logic is introduced.
- [x] Data/source status is designed to live in the data layer.
- [x] Global `@anti-slop-design v4` remains unchanged.

### Next phase
**Phase 2 — Visual System + Static Diagram Prototype**

Before motion, build the static Relationship Field and compare it against Constellation and Layer/Intersection at low fidelity. Only after the information model survives that test should the existing website scenes be rewritten.

---

# Sources

- O*NET Resource Center — The O*NET Content Model: https://www.onetcenter.org/content.html
- O*NET Resource Center — Content Model Reference 31.0: https://www.onetcenter.org/dictionary/31.0/csv/content_model_reference.html
- O*NET Resource Center — Work Styles to Work Context 31.0: https://www.onetcenter.org/dictionary/31.0/csv/work_styles_to_work_context.html
- O*NET Resource Center — Interests Illustrative Occupations 31.0: https://www.onetcenter.org/dictionary/31.0/json/interests_illustrative_occupations.html
- O*NET Resource Center — Work Values: https://www.onetcenter.org/dictionary/29.2/text/work_values.html
- Nauta, M. M. (2010). The development, evolution, and status of Holland's theory of vocational personalities. Journal of Counseling Psychology. https://pubmed.ncbi.nlm.nih.gov/21133557/
