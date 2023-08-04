import Carousel from './components/layout/Carousel'

export default function HomePage() {
    return (
        <div className={`flex flex-col w-[90vw]`}>
            <h1 className="mt-3 text-2xl md:text-3xl ">
                Hi, my name is <b>Jesus Avalos.</b>
            </h1>
            <h1 className="mt-10 underline underline-offset-1">Experience:</h1>
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="relative mt-8 w-[100%] h-auto md:max-w-[67rem] p-4 ">
                    <Carousel
                        images={[
                            'discussion_1.png',
                            'select_2.png',
                            'signup_1.png',
                            'complete_signup_1.png',
                            'delete_shift_1.png',
                        ]}
                        path="/hospice_of_slo"
                    ></Carousel>
                </div>

                <h1 className="mt-5 md:text-xl">Hospice of SLO Website</h1>
            </div>
        </div>
    )
}
