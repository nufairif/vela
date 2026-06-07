import { useEffect } from 'react'
import { brand } from '../data/site'

const DEFAULT_DESCRIPTION = brand.description

export function usePageSeo(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${brand.name}` : brand.name
    document.title = fullTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = brand.name
      if (meta) meta.setAttribute('content', DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}