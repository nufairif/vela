import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function HelpPage({ eyebrow, title, intro, sections, tables, note }) {
  return (
    <PageShell>
      <div className="page help-page">
        <PageHero compact eyebrow={eyebrow} title={title} subtitle={intro} />

        {sections?.map((section, i) => (
          <ScrollReveal key={section.title} delay={i * 0.06}>
            <section className="help-page__section">
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        ))}

        {tables?.map((table, i) => (
          <ScrollReveal key={table.title} delay={i * 0.06}>
            <section className="help-page__section">
              <h2>{table.title}</h2>
              <div className="help-page__table-wrap">
                <table className="help-page__table">
                  <thead>
                    <tr>
                      {table.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr key={row.join('-')}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </ScrollReveal>
        ))}

        {note && (
          <ScrollReveal>
            <p className="help-page__note">{note}</p>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="help-page__cta">
            <p>Still have questions?</p>
            <Link to="/contact" className="btn btn--ghost">Contact us →</Link>
          </div>
        </ScrollReveal>
      </div>
    </PageShell>
  )
}