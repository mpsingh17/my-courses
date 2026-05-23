# Course Outline Template (For course-planner agent)

Use this template exactly to generate or update `course-outline.md`.
Do not remove sections. If information is unknown, write `TBD` and ask clarifying questions before finalizing.

---

## 0. Course Metadata

- Course title:
- Audience level: Beginner | Beginner-Intermediate | Intermediate
- Audience profile (who this is for):
- Prerequisites (must-have):
- Nice-to-have background:
- Estimated total duration (hours):
- Course format: Project-based | Mixed | Theory + Labs
- Final project title:
- Final project one-line outcome:

---

## 1. Course Positioning

### 1.1 Course Promise

Write 2-4 sentences that clearly state what learners will be able to build and do by the end.

### 1.2 Problems This Course Solves

- Problem 1:
- Problem 2:
- Problem 3:

### 1.3 Why This Course (Now)

Write 3-6 bullet points tied to current industry expectations, official docs, and modern best practices.

---

## 2. Learning Outcomes (Measurable)

Write 5-8 outcomes using observable action verbs (for example: implement, validate, troubleshoot, deploy, optimize).
Avoid vague verbs such as understand, know, appreciate.

At the end of this course, learners will be able to:
1.
2.
3.
4.
5.

---

## 3. Assessment Strategy (Aligned)

Define how outcomes are measured and how learners receive feedback.

### 3.1 Formative Checks (low-stakes, frequent)

- Checkpoint cadence (for example: each lesson or every 2 lessons):
- Types (for example: quick implementation task, debug challenge, reflection, mini quiz):
- Feedback method (automated checks, rubric, review prompts):

### 3.2 Summative Assessment

- Final project definition:
- Completion criteria:
- Quality rubric (brief):

### 3.3 Outcome-to-Assessment Map

| Learning Outcome | Formative Evidence | Summative Evidence |
| --- | --- | --- |
| LO1 |  |  |
| LO2 |  |  |
| LO3 |  |  |

---

## 4. Course Architecture (3-5 Modules)

Design modules so complexity increases over time and each module contributes directly to the final project.

### Module Progression Rules

- Start with foundation and environment setup.
- Move from component skills to integrated workflows.
- Include one explicit troubleshooting/debug-focused lesson in at least one module.
- End with production readiness, validation, and deployment/operational thinking.

---

## 5. Modules and Lessons

Create 3-5 modules. Each module must contain 3-5 lessons.
Each module and lesson must follow the exact structure below.

### Module [N]: [Module Title]

**Module goal:**

**Why this module matters:**

**Module outcomes (2-4):**
1.
2.

**Project increment delivered in this module:**

**Definition of done (module level):**

- [ ]
- [ ]

#### Lesson [N.1]: [Lesson Title]

- Objective (one measurable sentence):
- Why it matters (1-3 sentences):

- Concepts covered
 -

	-
- Implementation plan (ordered steps):
 1.
 2.
 3.
- Project work (what learner builds/changes):
- Verification steps (how learner confirms success):
- Common mistakes and fixes:
 	- Mistake:
  		- Fix:
- Estimated time (minutes):

#### Lesson [N.2]: [Lesson Title]

- Objective (one measurable sentence):
- Why it matters (1-3 sentences):

- Concepts covered
 -

	-
- Implementation plan (ordered steps):
 1.
 2.
 3.
- Project work (what learner builds/changes):
- Verification steps (how learner confirms success):
- Common mistakes and fixes:
 	- Mistake:
  		- Fix:
- Estimated time (minutes):

#### Lesson [N.3]: [Lesson Title]

- Objective (one measurable sentence):
- Why it matters (1-3 sentences):

- Concepts covered
 -

	-
- Implementation plan (ordered steps):
 1.
 2.
 3.
- Project work (what learner builds/changes):
- Verification steps (how learner confirms success):
- Common mistakes and fixes:
 	- Mistake:
  		- Fix:
- Estimated time (minutes):

> If module has 4th/5th lesson, repeat the same lesson block structure.

---

## 6. Cross-Module Project Evolution Map

Show how the same project grows from module to module.

| Module | Project Capability Added | Learner Value | Technical Risk Introduced | Mitigation |
| --- | --- | --- | --- | --- |
| Module 1 |  |  |  |  |
| Module 2 |  |  |  |  |
| Module 3 |  |  |  |  |

---

## 7. Learner Experience Guardrails

### 7.1 Cognitive Load Controls

- Keep each lesson focused on one primary skill.
- Limit net-new concepts per lesson (recommended max: 2-3).
- Use worked examples before independent tasks.

### 7.2 Scaffolding and Independence

- Early modules: higher guidance, tighter instructions.
- Middle modules: partial guidance with decision points.
- Final module: more independent implementation and validation.

### 7.3 Motivation and Momentum

- Ensure visible project progress in every module.
- Include quick wins in first module.
- Include at least one confidence-building recap checkpoint per module.

---

## 8. Tools, References, and Constraints

### 8.1 Official Documentation to Use

List the primary official docs and standards the course should follow.

### 8.2 Version Targets

- Framework/runtime versions:
- Language versions:
- Tooling versions:

### 8.3 Constraints

- No deprecated APIs/patterns.
- No unjustified external libraries.
- Prioritize maintainable, production-ready defaults.

---

## 9. Course Completion Summary

Write a concise summary covering:

- What learners built end-to-end.
- Which skills they can now apply independently.
- What to build next (2-4 progression suggestions).

---

## 10. Quality Checklist (Agent must pass before final output)

- [ ] Course has 3-5 modules, each with 3-5 lessons.
- [ ] Every lesson includes project work and verification steps.
- [ ] Learning outcomes are measurable and use action verbs.
- [ ] Assessments are aligned with outcomes.
- [ ] Project scope progresses smoothly across modules.
- [ ] Difficulty ramps from foundational to production-ready.
- [ ] Content is appropriate for beginner/intermediate learners.
- [ ] No deprecated practices or unjustified dependencies.
- [ ] Final summary includes clear learner outcomes.

---

## 11. Design Basis (for authoring consistency)

Use these principles when filling this template:

1. Constructive alignment: outcomes, assessments, and instructional activities must align.
2. Measurable objectives: use observable verbs and evidence-based success criteria.
3. Progressive sequencing: move from component skills to integrated performance.
4. Frequent formative feedback: include low-stakes checks to guide improvement.
5. Scaffolding with fade-out: provide strong guidance early, then increase learner autonomy.

Reference sources used for this template:

- Carnegie Mellon University, Eberly Center: Design Your Course, Learning Objectives, Assessments, Instructional Strategies, Course Content and Schedule, Learning Principles, Bloom's Taxonomy.
- Selected scaffolding synthesis: Edutopia (George Lucas Educational Foundation), 2025 article on contingency, fading, and transfer of responsibility.

Reference URLs:

- <https://www.cmu.edu/teaching/designteach/design/index.html>
- <https://www.cmu.edu/teaching/designteach/design/learningobjectives.html>
- <https://www.cmu.edu/teaching/designteach/design/assessments.html>
- <https://www.cmu.edu/teaching/designteach/design/instructionalstrategies/index.html>
- <https://www.cmu.edu/teaching/designteach/design/contentschedule.html>
- <https://www.cmu.edu/teaching/designteach/design/bloomsTaxonomy.html>
- <https://www.cmu.edu/teaching/principles/learning.html>
- <https://www.cmu.edu/teaching/assessment/basics/formative-summative.html>
- <https://www.edutopia.org/article/powerful-scaffolding-strategies-support-learning>
