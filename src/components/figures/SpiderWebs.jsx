import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })
const panel = (f) => `./images/clean/spider/${f}.png`

const DRUGS = [
  { key: 'lsd', label: L('LSD', 'LSD') },
  { key: 'speed', label: L('السرعة / الأمفيتامين', 'Speed / Amphetamine') },
  { key: 'marijuana', label: L('الماريغوانا', 'Marijuana') },
  { key: 'caffeine', label: L('الكافيين', 'Caffeine') },
]

export default function SpiderWebs() {
  const { t } = useApp()
  const [drug, setDrug] = useState('caffeine')
  const active = DRUGS.find((d) => d.key === drug)

  return (
    <FigureFrame number={3}
      title={L('تأثير العقاقير على شبكات العناكب', 'Effect of drugs on spider webs')}
      caption={L('اللافت أن شبكة العنكبوت تحت تأثير الكافيين هي الأكثر تشوّهاً وفوضوية — أسوأ حتى من LSD. اللوحتان معروضتان بالحجم نفسه للمقارنة المباشرة.',
                 'Strikingly, the web spun under caffeine is the most distorted and chaotic — worse even than LSD. Both panels are shown at the same size for direct comparison.')}>
      <div className="spider-wrap">
        <figure className="spider-panel">
          <span className="spider-tag">{t(L('طبيعي', 'Normal'))}</span>
          <div className="spider-box">
            <img src={panel('normal')} alt={t(L('شبكة عنكبوت طبيعي', 'A normal spider web'))} />
          </div>
        </figure>
        <figure className="spider-panel">
          <span className="spider-tag drug">{t(active.label)}</span>
          <div className="spider-box">
            <img src={panel(drug)} alt={t(L('شبكة تحت تأثير', 'Web under')) + ' ' + t(active.label)} />
          </div>
        </figure>
      </div>
      <div className="spider-buttons">
        {DRUGS.map((d) => (
          <button key={d.key} className={`btn ${d.key === drug ? 'primary' : ''}`} onClick={() => setDrug(d.key)}>
            {t(d.label)}
          </button>
        ))}
      </div>
    </FigureFrame>
  )
}
