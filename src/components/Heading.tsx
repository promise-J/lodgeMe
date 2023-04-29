import React from 'react'

interface HeadingProps {
    title: string;
    subtite?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtite,
    center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
            {subtite}
        </div>
    </div>
  )
}

export default Heading