import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-rose-water/30 via-cream-white to-rose-water/30',
        'bg-[length:200%_100%]',
        className
      )}
    />
  )
}

// Pre-built skeleton for product cards
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// Skeleton grid for product loading
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
