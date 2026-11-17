import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import { books } from '../../data/books.js'
import Icon from '../Icon.jsx'
import RichText from '../RichText.jsx'
import { LIE_MAX, slotOf, optionOrder, picPrize, actingHost } from '../../lib/game/engine.js'
import { L, Token, TOKEN_COLORS, Steps } from './parts.jsx'

/*
 * «خمّن الصورة» — a picture round, while it is played and when it is marked.
 *
 * THE LADDER. A "name" question is answered by typing, which is worth the most
 * (3 steps). Stuck? Ask for a hint, or for the four options — each costs a step
 * off the prize (never below 1). A "book" question is three buttons, worth 2,
 * and a hint costs 1. Every bit of help is written into the player's own entry
 * the moment it is asked for (`rv`), so a refresh cannot wipe it, and the
 * engine prices the answer from that.
 *
 * TYPED ANSWERS ARE JUDGED by lib/game/match.js — forgiving of typos, Arabic
 * letter forms and either language — and when it is still wrong about a near
 * miss, the host accepts it by hand on the result screen.
 */
const bookTitle = (id) => books.find((b) => b.id === id)?.title || L(id, id)
const COST = L('−١', '−1')

export function PicImage({ item }) {
  const view = item.view || {}
  return (
    <div className="gm-pic">
      <img src={item.img} alt="" decoding="async" draggable={false}
        style={{ objectPosition: view.pos, transformOrigin: view.pos, transform: view.zoom ? `scale(${view.zoom})` : undefined }} />
    </div>
  )
}

function Hints({ item, shown }) {
  const { t } = useApp()
  if (!shown) return null
  return (
    <ol className="gm-hints">
      {item.hints.slice(0, shown).map((hint, i) => <li key={i}><Icon name="💡" /><RichText value={hint} /></li>)}
    </ol>
  )
}

export function PicPlay({ core, entries, room, me, decks, mine, submit, Options }) {
  const { t } = useApp()
  const ch = core.ch
  const item = decks.byId[ch.id]
  const slot = slotOf(core)
  const rv = entries[me]?.d?.rv
  const recorded = rv && rv.s === slot ? rv : {}
  const [own, setOwn] = useState({ h: 0, op: 0 })
  const [text, setText] = useState('')
  const h = Math.min(item.hints.length, Math.max(own.h, recorded.h || 0))
  const op = own.op || recorded.op ? 1 : 0
  const prize = picPrize(ch, { h, op })
  const isBook = ch.pk === 'book'

  const help = (patch) => {
    const next = { h, op, ...patch }
    setOwn(next)
    room.setMine({ rv: { s: slot, h: next.h, op: next.op } })
  }

  if (mine) {
    const v = mine.v || {}
    const said = isBook ? t(bookTitle(decks.books[v.b])) : v.o != null ? t(item.opts[v.o]) : v.t
    return (
      <>
        <PicImage item={item} />
        <p className="gm-said">{t(L('إجابتك:', 'Your answer:'))} «<bdi>{said}</bdi>»</p>
      </>
    )
  }

  const tools = (
    <div className="gm-pic-tools">
      {h < item.hints.length && (
        <button type="button" className="gm-btn" onClick={() => help({ h: h + 1 })}>
          <Icon name="💡" /> {t(L('تلميح', 'Hint'))} <b dir="ltr">{t(COST)}</b>
        </button>
      )}
      {!isBook && !op && (
        <button type="button" className="gm-btn" onClick={() => help({ op: 1 })}>
          <Icon name="📋" /> {t(L('أرني الخيارات', 'Show options'))} <b dir="ltr">{t(COST)}</b>
        </button>
      )}
    </div>
  )

  return (
    <>
      <PicImage item={item} />
      <p className="gm-q">{t(item.q || (isBook
        ? L('من أيّ كتابٍ من كتبنا هذه الصورة؟', 'Which of our books is this picture from?')
        : L('من هذا — أو ما هذا؟', 'Who — or what — is this?')))}</p>
      <p className="gm-prize">{t(L(`إن أصبت: ${prize === 1 ? 'خطوةٌ واحدة' : prize === 2 ? 'خطوتان' : `${prize} خطوات`}`, `If you’re right: ${prize} step${prize > 1 ? 's' : ''}`))}</p>
      <Hints item={item} shown={h} />

      {isBook ? (
        <div className="gm-opts">
          {decks.books.map((id, i) => (
            <button key={id} type="button" className="gm-opt" onClick={() => submit({ b: i, h })}>
              <span className="gm-opt-letter"><Icon name={decks.byBook[id].icon} /></span>
              <span className="gm-opt-text">{t(bookTitle(id))}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <form className="gm-pic-form" onSubmit={(e) => { e.preventDefault(); if (text.trim()) submit({ t: text.trim(), h, op }) }}>
            <input className="gm-input" value={text} maxLength={LIE_MAX} onChange={(e) => setText(e.target.value)}
              placeholder={t(L('اكتب الاسم…', 'Type the name…'))} enterKeyHint="send" autoComplete="off" />
            <button type="submit" className="gm-btn is-main" disabled={!text.trim()}>{t(L('أجب', 'Answer'))}</button>
          </form>
          {op ? (
            <Options order={optionOrder(ch, item.opts.length)} onPick={(i) => submit({ o: i, h, op: 1 })} render={(i) => t(item.opts[i])} />
          ) : null}
        </>
      )}
      {tools}
    </>
  )
}

/* The result: the truth, and what everyone said — with the help they used. */
export function PicResult({ core, room, me, decks, labels }) {
  const { t } = useApp()
  const { ch, res } = core
  const item = decks.byId[ch.id]
  const isBook = ch.pk === 'book'
  const isHost = actingHost(core, room.env()) === me
  const acc = room.snapshot().entries[me]?.d?.acc
  const accepted = acc && acc.n === core.n && Array.isArray(acc.p) ? acc.p : []
  const accept = (pid) => room.setMine({ acc: { n: core.n, p: [...accepted, pid] } })

  const rows = core.players.map((p, i) => ({ p, i, a: res.a[p.id] })).filter((r) => r.a)
  return (
    <>
      <PicImage item={item} />
      <p className="gm-truth">{t(isBook ? bookTitle(item.book) : item.name)}</p>
      <ol className="gm-rows is-pic">
        {rows.map(({ p, i, a }) => {
          const v = a[0] || {}
          const c = res.x.c?.[p.id] ?? 0
          const said = isBook ? t(bookTitle(decks.books[v.b])) : v.o != null ? t(item.opts[v.o]) : v.t
          return (
            <li key={p.id} className={c ? 'is-best' : ''}>
              <Token color={TOKEN_COLORS[p.c]} label={labels[i]} className="is-mini" />
              <span className="gm-rows-name">
                <bdi>{p.id === me ? t(L('أنت', 'You')) : p.name}</bdi>
                <small className="gm-said-small">
                  «<bdi>{said}</bdi>»
                  {v.h ? <> · {t(L(`${v.h} تلميح`, `${v.h} hint${v.h > 1 ? 's' : ''}`))}</> : null}
                  {v.op ? <> · {t(L('الخيارات', 'options'))}</> : null}
                  {c === 2 ? <> · {t(L('قبلها المضيف', 'accepted by the host'))}</> : null}
                </small>
              </span>
              <Icon name={c ? '✓' : '✕'} />
              <Steps n={res.aw[p.id] || 0} />
              {isHost && !isBook && c === 0 && v.t && !accepted.includes(p.id) && (
                <button type="button" className="gm-btn gm-accept" onClick={() => accept(p.id)}>{t(L('اقبلها', 'Accept'))}</button>
              )}
            </li>
          )
        })}
      </ol>
      {isHost && !isBook && rows.some(({ p, a }) => (res.x.c?.[p.id] ?? 0) === 0 && a[0]?.t) && (
        <p className="gm-hint-dark">{t(L('أنت المضيف: إن كتب أحدهم الإجابة بطريقةٍ صحيحة لم يفهمها التطبيق، اقبلها.', 'You’re the host: if someone typed a right answer the game didn’t recognise, accept it.'))}</p>
      )}
    </>
  )
}
