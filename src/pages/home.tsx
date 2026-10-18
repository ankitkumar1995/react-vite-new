import FeaturesTable from '../components/FeaturesTable'

export default function Home() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">React v19 Roadmap</h1>
        <p className="text-slate-500 text-lg font-medium">Click to learn about the newest features and architectural changes.</p>
      </div>
      <FeaturesTable />
    </div>
  )
}
