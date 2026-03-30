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
