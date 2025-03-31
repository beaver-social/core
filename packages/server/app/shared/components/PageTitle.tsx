import React from 'react'

type Props = {
    title: string
}

export default function PageTitle({ title }: Props) {
    return (
        <div className="flex items-center justify-between h-full gap-4 px-10 py-5 border sm:rounded-t-md bg-primary-100 dark:bg-primary-950 sm:py-10">
            <div className="w-full text-5xl font-medium text-center sm:text-start sm:text-7xl sm:font-light text-primary-800 dark:text-primary-200">
                {title}
            </div>
        </div>
    )
}