import { AmazonIcon, ShopifyIcon } from "./icons"

export function AiPersonalization() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Personalized Multi-Platform Strategy
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI learns from your sales data to create tailored strategies for each marketplace
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-8 text-sm font-medium dark:bg-gray-800">
                <AmazonIcon size={20} className="mr-2" />
                Amazon
              </div>
              <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-8 text-sm font-medium dark:bg-gray-800">
                <ShopifyIcon size={20} className="mr-2" />
                Shopify
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Platform-Specific Optimization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Each marketplace has its own unique characteristics and customer behaviors. Our AI helps you:
              </p>
              <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                <li>Optimize listings for each platform's search algorithm</li>
                <li>Adjust pricing based on platform-specific competition</li>
                <li>Customize product descriptions for different audience preferences</li>
                <li>Schedule promotions during peak shopping times</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
