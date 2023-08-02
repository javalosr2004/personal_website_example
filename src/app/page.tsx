import Carousel from './components/layout/Carousel'

export default function HomePage() {
    return (
        <div className={`flex flex-col`}>
            <h1 className="mt-3 text-2xl md:text-3xl ">
                Hi, my name is <b>Jesus Avalos.</b>
            </h1>
            <h1 className="mt-10 underline underline-offset-1">Experience:</h1>
            <div className="flex flex-1 flex-col items-center">
                {/* <div
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
                </div> */}
                <div className="relative">
                    <Carousel
                        images={[
                            'discussion.png',
                            'select.png',
                            'signup.png',
                            'complete_signup.png',
                            'delete_shift.png',
                        ]}
                        path="/hospice_of_slo"
                    ></Carousel>
                </div>

                <h1 className="mt-5 md:text-xl">Hospice of SLO Website</h1>
            </div>
        </div>
    )
}
