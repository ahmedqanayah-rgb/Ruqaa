import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import Icon from '../Icon.jsx'
import RichText from '../RichText.jsx'
import { T, turnPlayer, optionOrder, whoChoices, faceChoices, mayMoveOn, upNext, readyNow, actingHost, resultKey } from '../../lib/game/engine.js'
import { effectLine, effectMood } from '../../lib/game/effects.js'
import { sheepPlan, memoryDigits, MEMORY, AUCTION } from '../../lib/game/minis.js'
import MiniChart from './MiniChart.jsx'
import { PicResult } from './PicRound.jsx'
import { LETTERS, FaceImage, QuestionPhoto } from './Challenge.jsx'
import { L, KindHead, Token, TOKEN_COLORS, Steps } from './parts.jsx'

/*
 * A ROUND'S RESULT: what the truth was, who said what, and who moves how far.
 * Everything here is read from `core.res`, which the engine wrote when it
 * marked the round — this file decides nothing, it only shows.
 *
 * HOW LONG IT STAYS UP. In an untimed game (the default) until everyone still
 * at the table has read it and tapped on — the `why` is the best part of a
 * round, and nobody should lose it to a quick thumb — or the host moves things
 * along. In a timed game, until the player about to roll (or the host) taps on,
 * or by itself after a while (`T.dwell`).
 */
function Mini({ player, labels, index }) {
  return <Token color={TOKEN_COLORS[player.c]} label={labels[index]} className="is-mini" />
}

/* The players who gave answer `v`, as small tokens. */
function Pickers({ core, labels, v, fast }) {
  const who = core.players.map((p, i) => ({ p, i })).filter(({ p }) => core.res.a[p.id]?.[0] === v)
  if (!who.length) return null
  return (
    <span className="gm-pickers">
      {who.map(({ p, i }) => (
        <span key={p.id} className="gm-picker">
          <Mini player={p} labels={labels} index={i} />
          {fast === p.id && <Icon name="⚡" />}
          {core.res.a[p.id]?.[2] > 0 && <Icon name="💡" className="gm-used-hint" />}
        </span>
      ))}
    </span>
  )
}

function ChoiceResult({ core, labels, order, right, render, mine }) {
  const { t } = useApp()
  return (
    <div className="gm-opts is-result">
      {order.map((index, k) => {
        const cls = index === right ? 'is-right' : mine === index ? 'is-wrong' : ''
        return (
          <div key={index} className={`gm-opt ${cls}`}>
            <span className="gm-opt-letter">{index === right ? <Icon name="✓" /> : t(LETTERS[k])}</span>
            <span className="gm-opt-text">{render(index)}</span>
            <Pickers core={core} labels={labels} v={index} fast={core.res.x.fast} />
          </div>
        )
      })}
    </div>
  )
}

/* A list of players with a value each, best first. */
function Rows({ core, labels, rows }) {
  return (
    <ol className="gm-rows">
      {rows.map((row) => {
        const i = core.players.findIndex((p) => p.id === row.id)
        const p = core.players[i]
        if (!p) return null
        return (
          <li key={row.id} className={row.best ? 'is-best' : ''}>
            <Mini player={p} labels={labels} index={i} />
            <bdi className="gm-rows-name">{p.name}</bdi>
            {core.res.a[row.id]?.[2] > 0 && <Icon name="💡" className="gm-used-hint" />}
            <span className="gm-rows-value" dir="ltr">{row.value}</span>
            <Steps n={core.res.aw[row.id] || 0} />
          </li>
        )
      })}
    </ol>
  )
}

function MiniResult({ core, labels }) {
  const { t } = useApp()
  const { ch, res } = core
  const rowsFrom = (fmt) => (res.x.rows || []).map((r) => ({ id: r.id, value: fmt(r.show), best: r.place === 0 }))
  switch (ch.id) {
    case 'sheep':
      return (
        <>
          <p className="gm-truth">{t(L(`عبرت الحقلَ ${sheepPlan(ch.seed).count} خروفاً`, `${sheepPlan(ch.seed).count} sheep crossed the field`))}</p>
          <Rows core={core} labels={labels} rows={rowsFrom((v) => v)} />
        </>
      )
    case 'reflex':
      return <Rows core={core} labels={labels} rows={rowsFrom((v) => `${v} ms`)} />
    case 'memory':
      return (
        <>
          <p className="gm-truth" dir="ltr">{memoryDigits(ch.seed).join(' ')}</p>
          <Rows core={core} labels={labels} rows={rowsFrom((v) => `${v}/${MEMORY.digits}`)} />
        </>
      )
    case 'stroop':
    case 'search':
      return <Rows core={core} labels={labels} rows={rowsFrom((v) => v)} />
    case 'stag': {
      const hunters = core.players.filter((p) => res.a[p.id])
      return (
        <>
          <p className="gm-truth">{t(res.x.together
            ? L('اتّجهوا كلّهم إلى الظبي — فاصطادوه معاً!', 'Everyone went for the stag — and caught it together!')
            : L('التفت أحدهم إلى الأرانب البرّية… فأفلت الظبي من الجميع.', 'Someone turned to the hares… and the stag got away from everyone.'))}</p>
          <Rows core={core} labels={labels} rows={hunters.map((p) => ({ id: p.id, value: t(res.a[p.id][0] === 1 ? L('الظبي', 'stag') : L('أرنب', 'hare')), best: (res.aw[p.id] || 0) > 0 }))} />
        </>
      )
    }
    case 'auction': {
      const bidders = core.players.filter((p) => res.a[p.id]).sort((a, b) => res.a[b.id][0] - res.a[a.id][0])
      const winner = core.players.find((p) => p.id === res.x.winner)
      return (
        <>
          <p className="gm-truth">{t(winner
            ? L(`فاز ${winner.name} بالدروع، ودفع ${res.a[winner.id][0]} من خطواته الخمس.`, `${winner.name} won the armour, paying ${res.a[winner.id][0]} of its ${AUCTION.prize} steps.`)
            : L('لم يربح أحد: كلّ عرضٍ عرضه اثنان على الأقلّ.', 'Nobody won: every bid was made by two or more.'))}</p>
          <Rows core={core} labels={labels} rows={bidders.map((p) => ({ id: p.id, value: res.a[p.id][0], best: p.id === res.x.winner }))} />
        </>
      )
    }
    default:
      return null
  }
}

export default function Result({ core, decks, room, me, now, labels, onPeek }) {
  const { t } = useApp()
  const { ch, res } = core
  const item = decks.byId[ch.id]
  const mine = res.a[me]?.[0]
  const active = turnPlayer(core)

  let body = null
  let why = null
  switch (res.k) {
    case 'mcq':
      body = <><QuestionPhoto photo={item.photo} /><p className="gm-q is-small"><RichText value={item.q} /></p>
        <ChoiceResult core={core} labels={labels} order={optionOrder(ch, item.opts.length)} right={0} mine={mine} render={(i) => t(item.opts[i])} /></>
      why = item.why
      break
    case 'graph':
      body = <>{item.chart && <MiniChart spec={item.answerChart || item.chart} />}<p className="gm-q is-small"><RichText value={item.q} /></p>
        <ChoiceResult core={core} labels={labels} order={optionOrder(ch, item.opts.length)} right={0} mine={mine}
          render={(i) => (item.opts[i].chart ? <MiniChart spec={item.opts[i].chart} small /> : t(item.opts[i]))} /></>
      why = item.why
      break
    case 'tf':
      body = <><QuestionPhoto photo={item.photo} /><p className="gm-q is-small"><RichText value={item.statement} /></p>
        <ChoiceResult core={core} labels={labels} order={[0, 1]} right={item.isMyth ? 0 : 1} mine={mine}
          render={(i) => t(i === 0 ? L('خرافة', 'Myth') : L('حقيقة', 'Fact'))} /></>
      why = item.explain
      break
    case 'who': {
      const people = whoChoices(ch, decks)
      body = (
        <>
          <div className="gm-person">
            <FaceImage item={item} />
            <p className="gm-truth">{t(item.name)}</p>
          </div>
          <ChoiceResult core={core} labels={labels} order={optionOrder(ch, people.length)} right={0} mine={mine} render={(i) => t(people[i].name)} />
        </>
      )
      why = item.why
      break
    }
    case 'face': {
      const people = faceChoices(ch, decks)
      body = (
        <>
          <div className="gm-person">
            <FaceImage item={item} />
            <p className="gm-truth">{t(item.name)}<small>{t(item.tag)}</small></p>
          </div>
          <ChoiceResult core={core} labels={labels} order={optionOrder(ch, people.length)} right={0} mine={mine} render={(i) => t(people[i].name)} />
        </>
      )
      why = item.about
      break
    }
    case 'num': {
      const rows = core.players.filter((p) => res.a[p.id]).map((p) => ({ id: p.id, v: res.a[p.id][0], off: Math.abs(res.a[p.id][0] - item.a) }))
        .sort((a, b) => a.off - b.off)
      body = (
        <>
          <QuestionPhoto photo={item.photo} />
          <p className="gm-q is-small"><RichText value={item.q} /></p>
          <p className="gm-truth"><b dir="ltr">{item.show ? t(item.show) : item.a.toLocaleString('en')}</b>{item.unit && <> {t(item.unit)}</>}</p>
          <Rows core={core} labels={labels} rows={rows.map((r, k) => ({ id: r.id, value: r.v.toLocaleString('en'), best: k === 0 || r.off === rows[0].off }))} />
        </>
      )
      why = item.why
      break
    }
    case 'bluff': {
      const [before, after] = (t(item.q) || '').split('____')
      if (res.x.none || !ch.o) {
        body = <><QuestionPhoto photo={item.photo} /><p className="gm-q is-small">{before}<b className="gm-fill">{t(item.truth)}</b>{after}</p>
          <p className="gm-hint-dark">{t(L('لم يكتب أحدٌ كذبة، فهذه هي الحقيقة.', 'Nobody wrote a lie, so here is the truth.'))}</p></>
      } else {
        body = (
          <>
            <QuestionPhoto photo={item.photo} />
            <p className="gm-q is-small">{before}<b className="gm-fill">{t(item.truth)}</b>{after}</p>
            <div className="gm-opts is-result">
              {ch.o.map((o, i) => {
                const authors = (o.p || []).map((pid) => core.players.find((p) => p.id === pid)).filter(Boolean)
                return (
                  <div key={i} className={`gm-opt ${o.t ? 'is-right' : ''}`}>
                    <span className="gm-opt-letter">{o.t ? <Icon name="✓" /> : <Icon name="🎭" />}</span>
                    <span className="gm-opt-text">
                      <bdi>{o.t ? t(item.truth) : o.p ? o.x : t(item.decoys[o.d])}</bdi>
                      <small className="gm-by">{o.t ? t(L('الحقيقة', 'the truth')) : o.p ? t(L(`كذبة ${authors.map((a) => a.name).join(' و')}`, `${authors.map((a) => a.name).join(' & ')}’s lie`)) : t(L('كذبة البيت', 'the house’s lie'))}</small>
                    </span>
                    <Pickers core={core} labels={labels} v={i} />
                  </div>
                )
              })}
            </div>
          </>
        )
      }
      why = item.why
      break
    }
    case 'dare':
      body = (
        <>
          <blockquote className="gm-dare"><RichText value={item.text} /></blockquote>
          <p className={`gm-verdict ${res.x.pass ? 'is-pass' : 'is-fail'}`}>
            <Icon name={res.x.pass ? '✓' : '✕'} />
            {t(res.x.pass
              ? L(`نجح ${active.name}! (${res.x.yes} مع، ${res.x.no} ضدّ)`, `${active.name} passes! (${res.x.yes} for, ${res.x.no} against)`)
              : L(`لم ينجح ${active.name}. (${res.x.yes} مع، ${res.x.no} ضدّ)`, `${active.name} fails. (${res.x.yes} for, ${res.x.no} against)`))}
          </p>
        </>
      )
      break
    case 'mini':
      body = <MiniResult core={core} labels={labels} />
      break
    case 'pic':
      body = <PicResult core={core} room={room} me={me} decks={decks} labels={labels} />
      why = item.why
      break
    case 'luck': {
      const mood = effectMood(item.effect)
      body = (
        <div className={`gm-luck is-${mood}`}>
          <p className="gm-luck-who">{t(L(`بطاقة حظّ لـ${active.name}`, `A chance card for ${active.name}`))}</p>
          <p className="gm-luck-text"><RichText value={item.text} /></p>
          <p className="gm-luck-effect"><Icon name="🍀" /> {t(effectLine(item.effect))}</p>
          {res.x.again && <p className="gm-hint-dark">{t(L(`${active.name} يرمي مرّةً أخرى.`, `${active.name} rolls again.`))}</p>}
        </div>
      )
      break
    }
    default:
  }

  /* Who moves, and how far. */
  const movers = core.players.map((p, i) => ({ p, i, n: res.aw[p.id] || 0 })).filter((m) => m.n)
  const dwell = T.dwell[res.k] || T.dwell.default
  const left = Math.max(0, Math.ceil((core.t + dwell - now) / 1000))
  const canGo = mayMoveOn(core, room.env()).includes(me) && now >= core.t + T.minReveal
  // What comes next: the same player's roll, after their card won it — or the next turn.
  const rolls = !!res.x.roll && !active.gone
  const nextName = core.players[upNext(core).turn]?.name
  const { entries } = room.snapshot()
  const sent = entries[me]?.d?.next === resultKey(core)
  const tap = () => room.setMine({ next: resultKey(core), nt: Math.round(room.now()) })

  /* Untimed: everyone taps on when they have read it; the host may go on. */
  let foot
  if (!core.timed) {
    const ready = readyNow(core, entries)
    const table = core.players.filter((p) => !p.gone && (ready.includes(p.id) || room.present(p.id)))
    const late = table.filter((p) => !ready.includes(p.id)).map((p) => p.name)
    const isHost = actingHost(core, room.env()) === me
    foot = sent
      ? (
        <>
          <p className="gm-muted-dark">{t(late.length
            ? L(`ننتظر من لم ينتهِ من القراءة: ${late.join('، ')}`, `Waiting for those still reading: ${late.join(', ')}`)
            : rolls ? L(`${nextName} يرمي النرد الآن…`, `${nextName} rolls now…`) : L(`الدور التالي لـ${nextName}…`, `${nextName} is next…`))}</p>
          {late.length > 0 && entries[me]?.d?.go !== resultKey(core) && (isHost || now > core.t + T.anyone) && (
            <button type="button" className="gm-btn gm-btn-quiet" onClick={() => room.setMine({ go: resultKey(core), gt: Math.round(room.now()) })}>
              {t(L('تابع دون انتظار', 'Go on without waiting'))}
            </button>
          )}
        </>
      )
      : (
        <button type="button" className="gm-btn is-main is-wide" disabled={now < core.t + T.minReveal} onClick={tap}>
          {t(L('قرأتُ — التالي', 'Read it — next'))} <span className="arrow" aria-hidden>→</span>
        </button>
      )
  } else {
    foot = canGo && !sent
      ? <button type="button" className="gm-btn is-main is-wide" onClick={tap}>
          {t(rolls ? L(`التالي: يرمي ${nextName}`, `Next: ${nextName} rolls`) : L(`التالي: دور ${nextName}`, `Next: ${nextName}’s turn`))} <span className="arrow" aria-hidden>→</span>
        </button>
      : <p className="gm-muted-dark">{t(rolls
        ? L(`يرمي ${nextName} — بعد ${left} ث`, `${nextName} rolls — in ${left}s`)
        : L(`الدور التالي لـ${nextName} — بعد ${left} ث`, `${nextName} is next — in ${left}s`))}</p>
  }

  return (
    <div className="gm-result">
      <div className="gm-sheet-head">
        <KindHead ch={ch} decks={decks} books={books} />
        <button type="button" className="gm-icon-btn is-ink" onClick={onPeek} aria-label={t(L('انظر إلى اللوح', 'Look at the board'))}><Icon name="🗺️" /></button>
      </div>
      <div className="gm-sheet-body">
        {body}
        {/* The turn's card decides its player's roll (engine.js → `reveal`). */}
        {ch.card && (
          <p className={`gm-verdict ${res.x.roll ? 'is-pass' : 'is-fail'}`}>
            <Icon name={res.x.roll ? '🎲' : '✕'} />
            {t(active.id === me
              ? (res.x.roll ? L('أصبتَ، فسترمي النرد.', 'You got it, so you roll the die.') : L('لم تُصب، فلا رمية لك هذه المرّة.', 'You missed, so no roll for you this time.'))
              : (res.x.roll ? L(`أصاب ${active.name}، فسيرمي النرد.`, `${active.name} got it, so they roll the die.`) : L(`لم يُصب ${active.name}، فلا رمية له هذه المرّة.`, `${active.name} missed, so no roll for them this time.`)))}
          </p>
        )}
        {movers.length > 0 && (
          <ul className="gm-awards" aria-label={t(L('الخطوات', 'Steps'))}>
            {movers.map(({ p, i, n }) => (
              <li key={p.id}><Mini player={p} labels={labels} index={i} /><bdi>{p.id === me ? t(L('أنت', 'You')) : p.name}</bdi><Steps n={n} /></li>
            ))}
          </ul>
        )}
        {!['luck', 'dare', 'mini', 'pic'].includes(res.k) && movers.length === 0 && (
          <p className="gm-hint-dark">{t(L('لم يتقدّم أحد هذه المرّة.', 'Nobody moves this time.'))}</p>
        )}
        {why && <div className="gm-why"><Icon name="💡" /><RichText value={why} /></div>}
      </div>
      <div className="gm-sheet-foot">{foot}</div>
    </div>
  )
}

