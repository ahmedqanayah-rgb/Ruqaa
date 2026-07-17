import {
  Fig1Temperature, Fig2Melatonin, Fig10Injuries, Fig12CarAccidents, Fig13Obesity, Fig11Basketball,
} from './SimpleFigures.jsx'
import { TwoProcessModel, SleepDeprivation } from './TwoProcessModel.jsx'
import Hypnogram from './Hypnogram.jsx'
import BrainWaves from './BrainWaves.jsx'
import SpiderWebs from './SpiderWebs.jsx'
import BrainNetworks from './BrainNetworks.jsx'
import {
  SfCollectiveAttention, SfReadingDecline, SfFourDayWeek, SfBloodSugar,
} from './stolen-focus/StolenFocusCharts.jsx'
import {
  SfCausesMap, SfSwitchCost, SfFlowChannel, SfAdhdThreshold, SfSurveillanceFlow,
} from './stolen-focus/StolenFocusInteractive.jsx'
import {
  SfInfiniteScroll, SfOutrageAlgorithm, SfRoamingRadius,
} from './stolen-focus/StolenFocusSims.jsx'
import { SfDistractedReading } from './stolen-focus/DistractedReading.jsx'

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
  fig12: Fig12CarAccidents,
  fig13: Fig13Obesity,

  // ----- Stolen Focus -----
  sfCausesMap: SfCausesMap,
  sfSwitchCost: SfSwitchCost,
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
}

export function Figure({ id }) {
  const Comp = FIGURES[id]
  if (!Comp) return null
  return <Comp />
}
