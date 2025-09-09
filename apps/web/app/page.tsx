import Link from 'next/link'
import { APP_NAME } from '@shared/index'

export default function Home() {
  return (
    <main className="container">
      <h1>{APP_NAME}</h1>
      <p className="small">PWA para fiscalização de transporte coletivo. Arquitetura 100% Render.</p>

      <div className="grid" style={{marginTop: '1rem'}}>
        <section className="card">
          <h3>Saúde do serviço</h3>
          <p>Verifique o status do backend e variáveis.</p>
          <Link href="/api/health" className="btn">Health Check</Link>
        </section>

        <section className="card">
          <h3>Upload de evidências</h3>
          <p>Gere uma URL pré-assinada para subir uma imagem ao MinIO.</p>
          <Link href="/demo-upload" className="btn secondary">Demo de Upload</Link>
        </section>

        <section className="card">
          <h3>Vistorias</h3>
          <p>CRUD básico de vistorias.</p>
          <Link href="/inspections" className="btn">Abrir</Link>
        </section>

        <section className="card">
          <h3>Autos de Infração</h3>
          <p>CRUD e PDF do auto.</p>
          <Link href="/infractions" className="btn secondary">Abrir</Link>
        </section>

        <section className="card">
          <h3>Turnos</h3>
          <p>Check-in/out com geocarimbo e bateria.</p>
          <Link href="/shifts" className="btn">Abrir</Link>
        </section>

        <section className="card">
          <h3>Ocorrências</h3>
          <p>Registro rápido de incidentes em campo.</p>
          <Link href="/incidents" className="btn secondary">Abrir</Link>
        </section>

        <section className="card">
          <h3>Mapa & Heatmap</h3>
          <p>Visualize pontos de ocorrências.</p>
          <Link href="/mapa" className="btn">Abrir</Link>
        </section>

        <section className="card">
          <h3>Relatório OTD</h3>
          <p>Agregações por linha/dia.</p>
          <Link href="/reports/otd" className="btn">Abrir</Link>
        </section>
      </div>
    </main>
  )
}
