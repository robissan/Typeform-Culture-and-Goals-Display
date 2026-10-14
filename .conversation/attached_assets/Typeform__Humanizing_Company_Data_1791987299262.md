# Typeform: Humanizing Company Data

### TL;DR

An office installation concept for Typeform combines cultural storytelling, animated business metrics, and exploratory coffee-and-beer consumption data to make company goals more relatable to employees. Rather than functioning solely as a top-down dashboard, it is intended to encourage conversations about company performance and goal-oriented action.

The concept was presented at Typeform with Eli Muns (Project Manager) and Pedro Lipo (Art Director) from Domestic Data Streamers. All ideas and opinions expressed here are my own. This PRD describes a presented concept, not a confirmed deployment.

## Goals

### Business Goals

* Communicate company objectives in a way that resonates with Typeform’s work culture.
* Engage Typeform employees with valuable day-to-day information.
* Establish a clearer connection between individual contributions and company performance.
* Inspire action when needed and conversations about the company’s future.

Source context: Typeform sets yearly objectives using ARR, MRR, MAU, and DAU. The supplied account describes previous Excel-style charts as unsuccessful, boring, and unimpressive. The challenge was to communicate these quantitative goals in a culturally resonant way.

Research involved more than thirteen interviews across departments, including product, marketing, customer success, and leadership. Individual findings and interview transcripts are not supplied. The author reports that client feedback led to content and wording corrections and also raised concerns about elevating work culture to a high standard.

### User Goals

* Encounter relatable content celebrating colleagues and company culture.
* Understand whether company performance is progressing toward targets.
* Explore connections between everyday work and shared company goals.
* Engage in conversations about the company’s future.

These are intended outcomes of the concept, not demonstrated post-launch results.

### Non-Goals

* Proposed: Use coffee or beer consumption to score, rank, or evaluate individual employees.
* Proposed: Treat beverage consumption as a validated productivity measure.
* Proposed: Replace official financial reporting or operational analytics.

## User Stories

These proposed stories translate the concept into user needs; they are not interview quotations.

* Proposed: As a Typeform employee, I want to see colleagues’ birthdays, work anniversaries, and personal values, so that the installation feels relevant to our shared culture.
* Proposed: As a Typeform employee, I want to understand progress toward company targets, so that I can discuss the company’s direction with colleagues.
* Proposed: As a product or development team member, I want to see active-user trends, so that I can relate company performance discussions to the product’s usage.
* Proposed: As a leadership team member, I want to combine business information with cultural storytelling, so that company updates invite conversation rather than only broadcast numbers.

## Functional Requirements

The following describes the supplied concept scope. Priorities are proposed, not approved delivery commitments.

* Cultural manifesto (Proposed priority: Core)
  * Display birthdays, work anniversaries, personal values, and individual idiosyncrasies.
  * Integrate relatable content intended to give employees a reason to return regularly.
* Business-data visualization (Proposed priority: Core)
  * Connect to Typeform’s database through an API.
  * Animate MRR and MAU with a strong visual aesthetic.
  * Communicate clearly whether targets are being reached.
  * Present revenue and active-user visualizations as distinct expressions.
  * Source limitation: The illustrated revenue example uses dummy data. ARR and DAU are business context, not specified display requirements.
* Barception exploration (Proposed priority: Experimental)
  * Install sensors in the coffee machine and beer tap in the reception area known as the barception.
  * Compare coffee and beer consumption month over month as a playful exploration of workplace activity.
  * Treat the suggested caffeine/work and beer/celebration relationships as unvalidated hypotheses, not established findings.
* Data-derived artifacts (Proposed priority: Follow-on)
  * Proposed in the source concept: Produce a yearly artistic summary to support CEO communications about the state of the company.
  * Proposed in the source concept: Create posters employees can take away as reminders of their contributions.
  * Proposed in the source concept: Explore later API integrations that cause physical objects in the space to react to data.

## User Experience

Entry Point & First-Time User Experience

* The concept is an office installation for Typeform’s workforce; exact placement is not specified.
* Proposed: Introduce the installation with a short explanation of its cultural, business, and experimental content.

Core Experience

Proposed flow:

1. An employee encounters cultural content such as a birthday or work anniversary.
2. The employee views animated revenue or active-user information and interprets progress toward targets.
3. The employee explores aggregate monthly coffee and beer consumption as an experimental cultural layer.
4. The content prompts a conversation about company goals, contributions, or shared workplace life.

Advanced Features & Edge Cases

* Proposed: Clearly distinguish prototype dummy data from connected business data.
* Proposed: Show the most recent successful update and a neutral unavailable state when a data feed fails.
* Proposed: Keep beverage data separate from claims about individual performance.

UI/UX Highlights

* Use a strong visual aesthetic while preserving clarity about target progress.
* Balance numeric information with relatable cultural content.
* Proposed: Use text labels alongside visual encodings, readable viewing-distance typography, and sufficient contrast.
* Image credits supplied in the source: florsandgo.com and Typeform. Image assets were not supplied for inclusion.

## Narrative

Proposed illustrative scenario, not an observed research account:

A Typeform employee pauses at the installation after noticing a colleague’s work anniversary. The cultural content provides a familiar starting point: the installation speaks about people, not just financial numbers. A personal value or an individual detail creates an opportunity to recognize a colleague and begin a conversation.

Alongside this content, an animated visualization presents monthly recurring revenue and active users in relation to company targets. The employee can consider the company’s direction without treating the display as a substitute for detailed operational reporting. For a product or development colleague, the active-user view provides a natural starting point for discussing usage and shared goals.

The barception layer adds a playful perspective on office life through monthly coffee and beer consumption. It invites curiosity, but does not establish who is productive or explain changes in revenue. The relationship between these signals and work remains an exploratory hypothesis.

The intended result is a shared forum where cultural identity and business information coexist. Employees have reasons to revisit the installation and discuss what company progress means for their work. Over time, the same data could inform artistic summaries or take-home posters, extending the concept beyond the screen. Whether these experiences improve engagement, understanding, or action would need to be evaluated rather than assumed.

## Success Metrics

Metric baselines: Establish current baselines for repeat engagement, target comprehension, and perceived cultural relevance using a 2-week observational and survey baseline.

Metric targets: Define pilot targets, e.g. 20% repeat-visits within 4 weeks, 80% correct interpretation of MRR/MAU in a comprehension survey, and median cultural-relevance rating >=4/5.

Completion evidence: Collect baseline vs pilot comparison reports, comprehension survey results, and a pilot retrospective summarizing technical reliability and qualitative feedback.

### User-Centric Metrics

* Proposed: Repeat engagement, measured through privacy-preserving observation of return visits during a pilot.
* Proposed: Target comprehension, assessed by asking employees to interpret the MRR and MAU displays.
* Proposed: Perceived cultural relevance, assessed through voluntary employee feedback.

### Business Metrics

* Proposed: Goal-oriented conversations or actions prompted by the installation, assessed through voluntary accounts from employees.
* MRR and MAU are display inputs; changes in those metrics would not by themselves establish installation impact.

### Technical Metrics

* Proposed: Data freshness, measured as elapsed time since the latest successful source update.
* Proposed: Data fidelity, assessed by comparing displayed values and target status with approved source values.

### Tracking Plan

* Proposed: Record aggregate feed-update outcomes and rendering failures.
* Proposed: Run a small pilot combining observation, comprehension checks, and voluntary feedback.
* Proposed: Avoid individual behavioral tracking when evaluating engagement.

## Technical Considerations

### Technical Needs

* API-backed access to business data and targets for the MRR and MAU visualizations.
* Animated digital presentation of cultural and business content.
* Coffee-machine and beer-tap sensing for the exploratory barception component.
* Proposed: A simple content-management process for cultural entries.

### Integration Points

* Typeform’s database through an API, as proposed in the source concept.
* Sensors associated with the barception coffee machine and beer tap.
* API availability, authentication, sensor compatibility, and cultural-content sources: Unknown.

### Data Storage & Privacy

* Storage design, retention, permissions, and consent arrangements: Unknown.
* Proposed: Obtain employee consent for personal cultural content and provide a removal process.
* Proposed: Store beverage readings only at aggregate level, without employee identification.
* Proposed: Restrict business-data access to approved fields and authorized systems.

### Scalability & Performance

* Expected audience size, refresh frequency, and performance requirements: Unknown.
* Proposed: Start with one installation and assess legibility, rendering stability, and update reliability before extending the concept.

### Potential Challenges

* The author identifies reduced authenticity as a disadvantage of the digital installation compared with an analogue approach.
* The concept seeks to connect individual work to company results, but does not specify a validated attribution method.
* Beverage consumption is not established as a measure of productivity or celebration.
* Proposed: Validate whether cultural content is inclusive and avoids implying that drinking coffee or alcohol is expected.
* Proposed: Resolve privacy, content ownership, and data-access questions before a pilot.

## Milestones & Sequencing

Add a decision-ready milestone plan: 1) Scope & validation (2 weeks) — owners: PM, designer; deliverables: consent model, API access confirmed, measurement plan. 2) Digital prototype & pilot (6 weeks) — owners: design+engineer; deliverables: working MRR/MAU visualizations using mock and live data toggle, cultural CMS, pilot test report. 3) Evaluate & iterate (2 weeks) — owners: PM, stakeholders; deliverables: pilot retrospective, go/no-go decision, budget estimate for next phase.

### Project Estimate

Estimate and delivery dates: Unknown.

### Team Size & Composition

The presentation involved Eli Muns as Project Manager and Pedro Lipo as Art Director, both from Domestic Data Streamers. Implementation ownership: Unknown.

Proposed: Use a lean design-and-engineering pair for an initial digital prototype, with targeted sensor expertise for the barception experiment.

### Suggested Phases

1. Proposed: Scope and validation

* Proposed deliverables: Confirm content consent, metric definitions, target sources, and visualization comprehension.
* Owners and duration: Unknown.

2. Proposed: Digital prototype and pilot

* Proposed deliverables: Cultural manifesto and MRR/MAU visualizations, initially distinguishing dummy data from any connected data.
* Proposed review: Assess comprehension, relevance, and technical reliability.
* Owners and duration: Unknown.

3. Proposed: Exploratory extension

* Proposed deliverables: Aggregate barception sensing, followed by evaluation of annual summaries, posters, or reactive physical objects.
* Owners and duration: Unknown.

Dependencies: Unknown.