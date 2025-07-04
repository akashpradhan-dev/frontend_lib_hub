import { Code } from 'lucide-react'
import React from 'react'

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold">FrontendLib</span>
          </div>

          <div className="text-slate-400 text-center md:text-right">
            <p>&copy; 2025 FrontendLib. Crafted with ❤️ for developers.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
