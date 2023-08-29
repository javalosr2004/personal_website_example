// 'use client'

// // TODO: Pass in cache from previous page redirect

// import { useState, useEffect } from 'react'
// import Carousel from '@/app/components/layout/Carousel'
// import { Input } from '@/components/ui/input'
// import { store } from '@/store'
// // import { useSelector } from 'react-redux'
// // import { ExperienceState } from '@/store/experienceState'
// import { formatDate } from '@/app/components/helpers/formatDate'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import slugify from 'slugify'
// import { RevalidateCache } from '@/app/components/experience/RevalidateCache'
// import { useRouter } from 'next/navigation'

// type ParamProps = {
//     slug: string
// }

// type Inputs = {
//     title: string
//     description: string
// }

// export default function EditPage({ params }: { params: ParamProps }) {
//     // fetch data from api using client component

//     const experience = store.getState().experience
//     const [valid, setValid] = useState(true)
//     const [loading, setLoading] = useState(true)
//     const {
//         register,
//         handleSubmit,
//         formState: { dirtyFields },
//     } = useForm({
//         defaultValues: {
//             title: experience.title,
//             description: experience.detailed.description,
//         },
//     })

//     useEffect(() => {
//         if (experience.slug !== params.slug) {
//             setValid(false)
//         }

//         setLoading(false)
//     })

//     const router = useRouter()

//     const onSubmit: SubmitHandler<Inputs> = async (data) => {
//         let slug = params.slug
//         if (dirtyFields.title) {
//             slug = slugify(data.title.toLowerCase(), '_')
//             const put_data = {
//                 slug: slug,
//                 title: data.title,
//                 start_date: experience.start_date,
//                 end_date: experience.end_date,
//                 preview_image: experience.preview_image,
//                 detailed: {
//                     description: dirtyFields.description
//                         ? data.description
//                         : experience.detailed.description,
//                     images: experience.detailed.images,
//                     alt: experience.detailed.alt,
//                 },
//             }
//             await fetch(`/api/db/experiences/${params.slug}`, {
//                 body: JSON.stringify(put_data),
//                 method: 'PUT',
//             })
//         } else {
//             await fetch(`/api/db/experiences/${params.slug}`, {
//                 body: JSON.stringify({
//                     detailed: {
//                         description:
//                             dirtyFields.description && data.description,
//                         images: experience.detailed.images,
//                         alt: experience.detailed.alt,
//                     },
//                 }),
//                 method: 'PUT',
//             })
//         }

//         await RevalidateCache(router)
//         router.push(`/experience/${slug}`)
//     }

//     if (loading) {
//         return <div>Loading...</div>
//     } else {
//         if (!valid) {
//             return (
//                 <div>
//                     <h1>Invalid Experience</h1>
//                 </div>
//             )
//         }
//         return (
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="flex flex-1 flex-col items-center justify-center self-center w-full"
//             >
//                 <Input
//                     className="mt-5 md:text-xl font-bold"
//                     {...register('title', { required: true })}
//                 ></Input>
//                 <h3 className="mt-3">
//                     {formatDate(experience.start_date, experience.end_date)}
//                 </h3>
//                 <div className="relative mt-8 w-full h-auto  p-4 ">
//                     <Carousel
//                         images={experience.detailed.images as string[]}
//                         alt={experience.detailed.alt as string[]}
//                     ></Carousel>
//                 </div>
//                 <div className="w-[50%] text-center mt-10">
//                     <Input
//                         className="block"
//                         {...register('description', { required: true })}
//                     ></Input>
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         )
//     }
// }
