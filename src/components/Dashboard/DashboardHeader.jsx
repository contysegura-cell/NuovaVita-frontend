function DashboardHeader({ title, userName = 'Dr. Nombre Apellido' }) {
  return (
    <header className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-5">
      <h1>{title}</h1>
      <span className="badge text-bg-light fs-6 p-3">{userName}</span>
    </header>
  )
}

export default DashboardHeader
