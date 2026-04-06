---
title: Content Map
type: framework
maturity: final
confidentiality: shareable
reusability: universal
domains:
  - consulting-operations
created: 2026-03-31
technologies:
  - slack
depth_score: 4
depth_signals:
  file_size_kb: 6.3
  content_chars: 5628
  entity_count: 1
  slide_count: 0
  sheet_count: 0
  topic_count: 1
  has_summary: 0
vocab_density: 0.18
related_entities:
  - {pair: consulting-operations ↔ subaru, count: 795, strength: 0.427}
  - {pair: consulting-operations ↔ automotive-manufacturing, count: 770, strength: 0.416}
  - {pair: consulting-operations ↔ engagement-management, count: 498, strength: 0.269}
  - {pair: consulting-operations ↔ turnberry, count: 448, strength: 0.224}
  - {pair: consulting-operations ↔ foot-locker, count: 251, strength: 0.136}
---
# Content Map — intent-site ↔ intent

> Maps site content claims to their source of truth in the product repo (theparlor/intent).
> When the product repo changes, this map identifies which site pages need updating.

## Source: spec/signal-trust-framework.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | Trust formula | "clarity × 0.30 + ..." |
| architecture.html | L0-L4 autonomy levels | Trust table |
| arb.html | Tech radar items | Adopt/Trial/Assess/Hold technologies |
| signals.html | Trust scoring on signal cards | Confidence and trust scores |

## Source: spec/intent-methodology.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| pitch.html | The four-phase loop | Notice→Spec→Execute→Observe |
| methodology.html | Full methodology explanation | Entire page |
| flow-diagram.html | Loop diagram | SVG + phase cards |

## Source: spec/work-ontology.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| work-system.html | Work ontology levels | Signal→Intent→Spec→Contract→Capability→Feature→Product |
| flow-diagram.html | Ontology connection strip | Phase-to-level mapping |
| schemas.html | Schema definitions | Type system behind work units |

## Source: spec/event-catalog.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| event-catalog.html | Event types | Full page |
| dogfood.html | Event stream | Live events section |

## Source: spec/product-roadmap.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| roadmap.html | Phase timeline and items | Full page |
| arb.html | Atomized Roadmap tab | Phase cards |

## Source: spec/signal-capture-system.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | 5-tier capture architecture | MCP, CLI, Slack, GitHub, AI plugins |
| signals.html | Signal sources | Source attribution on cards |

## Source: spec/observability-stack.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| observability.html | Architecture diagram | Full OTel stack: sources → collector → backends → Grafana |
| observability.html | Deployment phases | Phase 1 (Grafana Cloud), Phase 2 (Docker), Phase 3 (k3s) |
| observability.html | Trace identity model | Intent = Trace, Spec = Span, Contract = Leaf Span |
| observability.html | Metrics model | Counters, gauges, histograms from spec |
| observability.html | Dashboard panels | Panel layout from spec |
| roadmap.html | Observe product status | Infrastructure Specced (advanced from Schema-Ready) |
| arb.html | Tech radar items | OTel, Grafana, Tempo (should appear in Adopt/Trial rings) |

## Source: .intent/events.jsonl + .intent/signals/ + .intent/intents/
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| walkthrough.html | End-to-end trace | Real events from a specific intent (signal → spec → contract → observe) |
| observe.html | Loop closure examples | Observations that became new signals |
| getting-started.html | "What you'll see" | Example signal capture and event output |

## Source: spec/observability-stack.md (additional pages)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| observe.html | Dashboard questions | What each Grafana panel answers |
| observe.html | Loop closure mechanics | How observations flow back to Notice |

## Source: spec/decision-log.md (expanded)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| decisions.html | D1-D6 ADR entries | Full ADR format with context, rationale, consequences |

## Source: spec/event-catalog.md (expanded)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| event-catalog.html | 15 event type schemas | signal.*, intent.*, spec.*, contract.*, system.* with field definitions |
| event-catalog.html | Trigger conditions | When each event fires and from which source |

## Source: spec/signal-amplification.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| signals.html | Amplification scoring | Reference frequency, time decay |

## Source: bin/ (CLI tools)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| flow-diagram.html | CLI tool references | intent-signal, intent-spec |
| roadmap.html | CLI toolkit section | intent-signal, intent-intent, intent-spec, intent-status |
| dogfood.html | CLI usage proof | "captured using intent-signal" |

## Source: tools/intent-mcp/server.py
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | MCP server ports and tools | Server cards, tool lists |
| deployment.html | FastMCP deployment | Configuration blocks |

## Source: servers/ (multi-agent MCP)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | Three MCP servers | notice, spec, observe |
| agents.html | 6 subagent definitions | Agent cards, model routing |
| deployment.html | Deployment topology | FastMCP Cloud, local dev |

## Source: spec/decision-log.md
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| decisions.html | Decision structure | ADR format |
| dogfood.html | Decision count | Stats section |

## Source: .intent/signals/
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| signals.html | 15 signal cards | SIG-001 through SIG-015 |
| dogfood.html | Signal count and list | Signal stream section |

## Source: CLAUDE.md § "Three-Layer Architecture (v1.0)"
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | Three-layer architecture diagram | Layer 1: Knowledge Base, Layer 2: Transformation OS, Layer 3: Software Spec & Code |
| architecture.html | Six bidirectional data flows | Flows 1-6 coupling the three layers |
| pitch.html | Three-layer section | "Three Layers, One System" — separable layers |
| pitch.html | "3 independent layers" stat box | Fourth stat in the stat-row |
| methodology.html | Three-layer context paragraph | "The Intent loop (Layer 2) operates over a compiled knowledge base (Layer 1)" |
| roadmap.html | Three-layer vision statement | "Intent v1.0 prescribes three independent layers" |

## Source: CLAUDE.md § Key Decision #14 (DDR-005) + "Two Products"
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| decisions.html | D7: Two Products, Not One | Full ADR: Intent methodology vs Knowledge Engine product |
| pitch.html | Knowledge Engine as separate product | "The Knowledge Engine (Layer 1) is a separate product" |
| getting-started.html | Knowledge Engine standalone adoption | "You can adopt the Knowledge Engine independently" |

## Source: CLAUDE.md § "Decided Architecture" + Key Decision #16
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | Fourth MCP server: intent-knowledge | Port 8004, tools: ingest, query, lint, list_artifacts, get_artifact |
| agents.html | knowledge-compiler and knowledge-querier agents | Two new agents for Knowledge phase |
| deployment.html | intent-knowledge server deployment | Fourth server config entry |
| getting-started.html | intent-knowledge CLI commands | ingest, query, lint subcommands |
| schemas.html | Knowledge artifact schemas | PER, JRN, DDR, THM, DOM, RAT schemas from AGENTS.md |
| dogfood.html | "4 MCP servers" stat | Updated from 3 |
| decisions.html | D9: Knowledge Engine as New MCP Server | Full ADR |

## Source: spec/spec-shaping-protocol.md + Key Decision #19
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| agents.html | Spec-shaping protocol section | Four-persona interrogation: △ Shape, ◇ Outcome, ○ Contract, ◉ Readiness |
| methodology.html | Spec-shaping protocol reference | "The transition from Notice to Spec is formalized through the spec-shaping protocol" |
| decisions.html | D12: Spec-Shaping Through Personas | Full ADR |

## Source: knowledge-engine/AGENTS.md § "Federation Model"
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| architecture.html | Federation model section | Core = universal substrate, engagements = bounded instances |
| schemas.html | Federation & confidentiality fields | engagement, confidentiality, cross-scope notation |

## Source: CLAUDE.md § Key Decisions #15, #17, #18
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| decisions.html | D8: Engagement Rollout Order | Subaru → F&G → ASA → Cargill → Footlocker |
| decisions.html | D10: Retroactive Enrichment = Suggested | Lint detects, surfaces as signals |
| decisions.html | D11: Redaction at Tool Level | MCP server applies confidentiality projection |
| roadmap.html | Knowledge Engine engagement rollout | Subaru → F&G → ASA → Cargill → Footlocker timeline |
| architecture.html | Redaction note in intent-knowledge card | "Redaction is automatic" |

## Source: knowledge-engine/AGENTS.md § "Artifact Types"
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| schemas.html | 6 knowledge artifact type schemas | Persona, Journey, DDR, Theme, Domain Model, Rationale with full frontmatter |
| schemas.html | Entity dossier types | DSR-PER, DSR-COM, DSR-PRD, DSR-SVC, DSR-IND, DSR-CTX |
| dogfood.html | "6 types" knowledge artifacts stat | New stat in dogfood dashboard |

## Source: CLAUDE.md § Key Decisions (cumulative)
| Site page | Claim | Quote/reference |
|-----------|-------|-----------------| 
| decisions.html | D7-D12 ADR entries | 6 new decisions corresponding to framework Key Decisions #14-19 |
| dogfood.html | "12 decisions" stat | Updated from 6 |
