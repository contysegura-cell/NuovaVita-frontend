import { useEffect } from 'react'

function setMetaTag(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

/**
 * SEO por página: actualiza el título y los metadatos del <head>
 * cada vez que se monta una página (o cambian sus valores).
 *
 * - title: título descriptivo de la pestaña y de los buscadores.
 * - description: resumen de la página (meta description).
 * - noindex: true para páginas internas que no deben indexarse.
 */
function usePageMeta({ title, description, noindex = false }) {
  useEffect(() => {
    document.title = title
    setMetaTag('description', description)

    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow')
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [title, description, noindex])
}

export default usePageMeta