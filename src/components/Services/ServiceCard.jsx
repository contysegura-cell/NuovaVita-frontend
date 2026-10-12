import Card from 'react-bootstrap/Card'

function ServiceIcon({ type }) {
  const commonProps = {
    width: 32,
    height: 32,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    clinicalHistory: (
      <svg {...commonProps}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 3v3h6V3" />
        <path d="M8 11h8M8 15h5" />
      </svg>
    ),
    attendance: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    reports: (
      <svg {...commonProps}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
    security: (
      <svg {...commonProps}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </svg>
    ),
  }

  return icons[type]
}

function ServiceCard({ icon, title, description }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        <div className="text-primary mb-3">
          <ServiceIcon type={icon} />
        </div>
        <Card.Title as="h3" className="h5">
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ServiceCard
