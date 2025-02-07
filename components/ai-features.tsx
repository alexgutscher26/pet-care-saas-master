import { AnalyticsIcon, SyncIcon } from "./icons"

export function AiFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">AI-Powered E-commerce Management</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our advanced AI technology helps you optimize your listings and grow your business across multiple marketplaces
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <AnalyticsIcon size={24} />
            </div>
            <h3 className="text-xl font-bold">Smart Pricing Optimization</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Our AI analyzes market trends and competitor pricing to suggest optimal price points across all your marketplaces,
              helping you maximize profits while staying competitive.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
              <SyncIcon size={24} />
            </div>
            <h3 className="text-xl font-bold">Automated Inventory Sync</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Keep your inventory levels perfectly synchronized across all platforms with our intelligent automation system.
              Prevent overselling and stockouts automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
