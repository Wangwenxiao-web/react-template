import type { JSX } from 'react'
import brandIcon from '@/assets/coffee.png'

function BrandTitle(): JSX.Element {
  return (
    <div className="bg-primary text-primary-foreground flex h-full items-center justify-center px-4 text-lg font-bold">
      <img className="mr-2.5 h-8 w-8" src={brandIcon} alt="Brand Icon" />
      <span>后台管理系统</span>
    </div>
  )
}

export default BrandTitle
