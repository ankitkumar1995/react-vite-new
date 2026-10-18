import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface FeatureData {
  id: number
  title: string
  route: string
  category: string
  description: string
}

const featuresData: FeatureData[] = [
  { id: 1, title: 'Server Components', route: '/features/server-components', category: 'Architecture', description: 'Render components on the server for better performance.' },
  { id: 2, title: 'Server Actions', route: '/features/server-actions', category: 'Data Flow', description: 'Handle form submissions and data mutations directly.' },
  { id: 3, title: 'Streaming', route: '/features/streaming', category: 'Performance', description: 'Progressively render parts of the page as they become ready.' },
  { id: 4, title: 'Asset Loading', route: '/features/asset-loading', category: 'Optimization', description: 'Improved preloading and loading of resources.' },
  { id: 5, title: 'Document Metadata', route: '/features/metadata', category: 'SEO', description: 'Native support for title and meta tags.' },
  { id: 6, title: 'Actions Hook', route: '/react-hooks', category: 'Hooks', description: 'Handle pending states and errors in actions.' },
  { id: 7, title: 'Form Status', route: '/react-hooks', category: 'Hooks', description: 'Access form status information like pending state.' },
  { id: 8, title: 'Optimistic Updates', route: '/react-hooks', category: 'Hooks', description: 'Show optimistic state while waiting for server.' },
  { id: 9, title: 'Improved Hydration', route: '/features/hydration', category: 'Performance', description: 'Reduced hydration mismatch errors and improved speed.' },
  { id: 10, title: 'Use Hook', route: '/react-hooks', category: 'Hooks', description: 'New API to consume promises and context.' },
  { id: 11, title: 'React Compiler', route: '/features/compiler', category: 'Optimization', description: 'Automatic memoization and optimization.' },
  { id: 12, title: 'Directives', route: '/features/directives', category: 'Syntax', description: 'Support for "use client" and "use server".' },
]

const ITEMS_PER_PAGE = 10

const FeaturesTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(featuresData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentData = featuresData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest w-16">S.No</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Feature</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:table-cell">Category</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">View</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {currentData.map((feature, index) => (
              <tr key={feature.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-mono">
                  {(startIndex + index + 1).toString().padStart(2, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{feature.title}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{feature.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {feature.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Link 
                    to={feature.route}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Click Here
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-slate-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, featuresData.length)}</span> of <span className="font-medium">{featuresData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesTable
