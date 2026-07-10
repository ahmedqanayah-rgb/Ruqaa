import {
  Fig1Temperature, Fig2Melatonin, Fig10Injuries, Fig12CarAccidents, Fig13Obesity, Fig11Basketball,
} from './SimpleFigures.jsx'
import { TwoProcessModel, SleepDeprivation } from './TwoProcessModel.jsx'
import Hypnogram from './Hypnogram.jsx'
import BrainWaves from './BrainWaves.jsx'
import SpiderWebs from './SpiderWebs.jsx'
import BrainNetworks from './BrainNetworks.jsx'

// figure id -> component. Referenced from section content blocks { type:'figure', id }.
export const FIGURES = {
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
}

export function Figure({ id }) {
  const Comp = FIGURES[id]
  if (!Comp) return null
  return <Comp />
}
