import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 align-center">
      <div className="mb-32 flex text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center justify-center">
        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Under Development
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Please wait further update.
          </p>
        </a>
      </div>
    </main>
  )
}
