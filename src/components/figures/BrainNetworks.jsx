import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })
// Each sleep phase is its own pre-cropped, trimmed row of the illustration.
// The left row-labels and top column-headers were excluded during extraction;
// the column labels are re-rendered as translatable HTML below.
const rowImg = (phase) => `./images/clean/brain/${phase}.webp`
const PHASES = {
  light: { label: L('النوم الخفيف', 'Light Sleep') },
  nrem: { label: L('النوم العميق (NREM)', 'Deep NREM Sleep') },
  rem: { label: L('نوم حركة العين السريعة (REM)', 'REM Sleep') },
}
const ORDER = ['light', 'nrem', 'rem']

const NETWORKS = [
  { color: '#c0504d', name: L('الشبكة النمطية الافتراضية', 'Default Mode Network') },
  { color: '#d9a441', name: L('شبكة الانتباه الظهرية', 'Dorsal Attention Network') },
  { color: '#3aa6a0', name: L('الشبكة الحسّية-الحركية', 'Sensorimotor Network') },
  { color: '#3f78c4', name: L('الشبكة البصرية', 'Visual Network') },
]

const PHASE_NOTE = {
  light: L('في النوم الخفيف تبقى عدّة شبكات نشطة نسبياً — الدماغ ما زال قريباً من اليقظة.',
           'In light sleep several networks stay relatively active — the brain is still close to waking.'),
  nrem: L('في النوم العميق يهدأ النشاط عبر الشبكات ويتزامن في موجاتٍ بطيئة (لاحظ الأسهم في الشبكة النمطية الافتراضية).',
          'In deep NREM sleep activity quiets across networks and synchronizes into slow waves (note the arrows over the Default Mode Network).'),
  rem: L('في نوم REM تعود بعض الشبكات للنشاط بقوّة (خاصةً البصرية والحسّية-الحركية) بينما يبقى الجسد مشلولاً.',
         'In REM sleep some networks fire strongly again (especially visual and sensorimotor) while the body stays paralyzed.'),
}

export default function BrainNetworks() {
  const { t } = useApp()
  const [phase, setPhase] = useState('rem')

  return (
    <FigureFrame
      title={L('المناطق النشطة عبر REM والنوم العميق والنوم الخفيف', 'Active areas across REM, deep NREM and light sleep')}
      caption={L('اختر مرحلة النوم لعرض شبكات الدماغ النشطة فيها. الألوان تمثّل أربع شبكات مختلفة (انظر المفتاح).',
                 'Pick a sleep phase to see which brain networks are active in it. The colours mark four different networks (see the key).')}>
      <div className="phase-tabs">
        {ORDER.map((k) => (
          <button key={k} className={`btn ${k === phase ? 'primary' : ''}`} onClick={() => setPhase(k)}>
            {t(PHASES[k].label)}
          </button>
        ))}
      </div>

      <ul className="net-legend" aria-label={t(L('مفتاح الشبكات', 'Network key'))}>
        {NETWORKS.map((n, i) => (
          <li key={i}>
            <span className="net-swatch" style={{ background: n.color }} aria-hidden />
            <span className="net-name" style={{ color: n.color }}>{t(n.name)}</span>
          </li>
        ))}
      </ul>

      <img className="net-crop-img" src={rowImg(phase)} alt={t(PHASES[phase].label)} />

      <p className="fig-caption">{t(PHASE_NOTE[phase])}</p>
    </FigureFrame>
  )
}
