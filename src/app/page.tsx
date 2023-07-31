import Image from 'next/image'
import style from './homepage.module.css'

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <h1 className="mt-3 text-2xl md:text-3xl ">
                Hi, my name is <b>Jesus Avalos.</b>
            </h1>
            <h2 className="mt-10 underline underline-offset-1">
                Some things I like to do:
            </h2>
            <div className="flex flex-1 flex-col items-center">
                <div
                    className={`${style.fadeIn} drag border-black w-[200px] md:w-[300px] h-[300px] md:h-[400px] border-2 mt-10 relative`}
                >
                    <Image
                        src="/hiking.avif"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        className=""
                        alt="Picture of hiking."
                        draggable={false}
                    ></Image>
                </div>
                <h1 className="mt-5 md:text-xl">Hike</h1>
            </div>
        </div>
    )
}
