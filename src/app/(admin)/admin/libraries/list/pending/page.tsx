'use client'

import { usePendingMutation } from '@/services/mutation/pendingAction'
import { usePendingLibrariesQuery } from '@/services/query/pending'
import toast from 'react-hot-toast'

export default function PendingLibrariesPage() {
  const { data, status, error } = usePendingLibrariesQuery()
  const { mutate } = usePendingMutation()

  if (status === 'pending') {
    return (
      <p className="text-center py-10 text-slate-500">
        Loading pending libraries...
      </p>
    )
  }

  if (status === 'error') {
    return (
      <p className="text-center py-10 text-slate-500">
        Something went wrong {error.message}
      </p>
    )
  }

  const libraries = data?.data

  if (libraries?.length === 0) {
    return (
      <p className="text-center py-10 text-slate-500">
        No pending libraries 🎉
      </p>
    )
  }

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    mutate(
      {
        libraryId: id,
        action,
      },
      {
        onSuccess: () => {
          toast.success(`library ${action} sucessfully`)
        },
      },
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Pending Libraries for Review
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                Version
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tags
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">
                Links
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {libraries?.map(lib => (
              <tr
                key={lib._id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
              >
                <td className="px-4 py-3 text-sm font-medium">{lib.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {lib.description}
                </td>
                <td className="px-4 py-3 text-sm">{lib.version}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {lib.tags?.join(', ') || '-'}
                </td>
                <td className="px-4 py-3 text-sm flex flex-col gap-1">
                  <a
                    href={lib.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-500 hover:underline"
                  >
                    Repo
                  </a>
                  {lib.homepageUrl && (
                    <a
                      href={lib.homepageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-500 hover:underline"
                    >
                      Homepage
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-center space-x-2">
                  <button
                    onClick={() => handleAction(lib._id, 'approved')}
                    className="px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(lib._id, 'rejected')}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
