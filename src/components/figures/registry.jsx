import { lazy } from 'react'

/* A SECOND LAZY BOUNDARY, INSIDE THE LAZY REGISTRY.
 *
 * `ContentBlocks` already loads this whole module lazily, which keeps recharts
 * off Home, Books, About and every text-only section. But the registry itself
 * imported every figure statically, so ONE figure of any kind pulled the charts
 * chunk with it — 105 kB gzipped — and only three modules actually use recharts.
 *
 * The cost was concrete and pointed the wrong way: «داخل حالة التدفّق» renders
 * five figures, all hand-rolled SVG precisely because CLAUDE.md forbids recharts
 * in a text section, and it paid for recharts anyway. Same for three Stolen
 * Focus chapters whose figures are sims and SVG.
 *
 * So the recharts-backed figures load through their own `lazy()` and the rest
 * resolve from this chunk. They suspend inside the `Suspense` that ContentBlocks
 * already wraps every figure in, so there is no new boundary to place.
 * KEEP THE THREE recharts MODULES BEHIND `lazy()` — a plain import of any of
 * them here silently undoes this, and the entry-chunk check in CLAUDE.md will
 * still pass because recharts was never in the entry to begin with.
 */
const chart = (load, name) => lazy(() => load().then((m) => ({ default: m[name] })))
const simple = (name) => chart(() => import('./SimpleFigures.jsx'), name)
const sfChart = (name) => chart(() => import('./stolen-focus/StolenFocusCharts.jsx'), name)
/* The Varoufakis book's figures load the same way, though none uses recharts:
   twenty figures and their stylesheet are not something a reader of the other
   two books should download because they opened a sleep chart. Same Suspense,
   same fallback, nothing new to place. */
const eco = (name) => chart(() => import('./economy/EconomyFigures.jsx'), name)
const debt = (name) => chart(() => import('./economy/DebtFigures.jsx'), name)

const Fig1Temperature = simple('Fig1Temperature')
const Fig2Melatonin = simple('Fig2Melatonin')
const Fig10Injuries = simple('Fig10Injuries')
const Fig13Obesity = simple('Fig13Obesity')
const Fig11Basketball = simple('Fig11Basketball')
const SfCollectiveAttention = sfChart('SfCollectiveAttention')
const SfReadingDecline = sfChart('SfReadingDecline')
const SfFourDayWeek = sfChart('SfFourDayWeek')
const SfBloodSugar = sfChart('SfBloodSugar')

import { TwoProcessModel, SleepDeprivation } from './TwoProcessModel.jsx'
import Hypnogram from './Hypnogram.jsx'
import BrainWaves from './BrainWaves.jsx'
import SpiderWebs from './SpiderWebs.jsx'
import BrainNetworks from './BrainNetworks.jsx'
import {
  SfFlowChannel, SfAdhdThreshold, SfSurveillanceFlow,
} from './stolen-focus/StolenFocusInteractive.jsx'
import {
  SfInfiniteScroll, SfOutrageAlgorithm, SfRoamingRadius,
} from './stolen-focus/StolenFocusSims.jsx'
import { SfDistractedReading } from './stolen-focus/DistractedReading.jsx'
import { SfFlowParadox, SfFlowNine, SfFlowBrain, SfFlowRatchet } from './stolen-focus/FlowFigures.jsx'

// figure id -> component. Referenced from section content blocks { type:'figure', id }.
export const FIGURES = {
  // ----- Why We Sleep -----
  fig1: Fig1Temperature,
  fig2: Fig2Melatonin,
  fig3: SpiderWebs,
  fig4_6: TwoProcessModel,
  fig7: SleepDeprivation,
  fig8: Hypnogram,
  fig9: BrainWaves,
  brainNetworks: BrainNetworks,
  fig10: Fig10Injuries,
  fig11: Fig11Basketball,
  fig13: Fig13Obesity,

  // ----- Stolen Focus -----
  sfCollectiveAttention: SfCollectiveAttention,
  sfFlowChannel: SfFlowChannel,
  sfDistractedReading: SfDistractedReading,
  sfReadingDecline: SfReadingDecline,
  sfInfiniteScroll: SfInfiniteScroll,
  sfOutrageAlgorithm: SfOutrageAlgorithm,
  sfSurveillanceFlow: SfSurveillanceFlow,
  sfFourDayWeek: SfFourDayWeek,
  sfBloodSugar: SfBloodSugar,
  sfAdhdRise: SfAdhdThreshold,
  sfRoamingRadius: SfRoamingRadius,

  // ----- the flow-state deep dive (from Csikszentmihalyi's *Flow*) -----
  sfFlowParadox: SfFlowParadox,
  sfFlowNine: SfFlowNine,
  sfFlowBrain: SfFlowBrain,
  sfFlowRatchet: SfFlowRatchet,

  // ----- Talking to My Daughter About the Economy -----
  tdSurplus: eco('TdSurplus'),
  tdTwoValues: eco('TdTwoValues'),
  tdGreatReversal: eco('TdGreatReversal'),
  tdBankLedger: eco('TdBankLedger'),
  tdStagHunt: eco('TdStagHunt'),
  tdIcarus: eco('TdIcarus'),
  tdCigaretteCamp: eco('TdCigaretteCamp'),
  tdTroutRiver: eco('TdTroutRiver'),
  tdHalpevam: eco('TdHalpevam'),

  // ----- its companion tab, «الدَّين والربا والأنظمة الثلاثة» -----
  tdRibaPaths: debt('TdRibaPaths'),
  tdCompound: debt('TdCompound'),
  tdCarTwoWays: debt('TdCarTwoWays'),
  tdWhoBearsLoss: debt('TdWhoBearsLoss'),
  tdSaudiContracts: debt('TdSaudiContracts'),
  tdMoneyLayers: debt('TdMoneyLayers'),
  tdBondCycle: debt('TdBondCycle'),
  tdDebtGdp: debt('TdDebtGdp'),
  tdSukukIssuers: debt('TdSukukIssuers'),
  tdBondVsSukuk: debt('TdBondVsSukuk'),
  tdThreeSystems: debt('TdThreeSystems'),
}

export function Figure({ id }) {
  const Comp = FIGURES[id]
  if (!Comp) return null
  return <Comp />
}
